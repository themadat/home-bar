#!/usr/bin/env python3
"""Prepare one release per uncommitted batch; synchronize local asset URLs."""
import argparse
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VERSION = re.compile(r"const BUILD_VERSION = '(\d+\.\d+\.\d+\.\d+)';")
RELEASE = re.compile(r"const CURRENT_RELEASE = \{.*?\n    \};", re.S)
ASSET = re.compile(r'(?P<prefix>\b(?:src|href)=")(?P<path>[^"?#]+\.(?:js|css))(?:\?[^"#]*)?(?P<end>")')


def local_asset(match):
    path = match['path']
    return not (':' in path or path.startswith('//'))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--title')
    parser.add_argument('--summary')
    parser.add_argument('--change', action='append')
    args = parser.parse_args()
    html_path = ROOT / 'index.html'
    workflow_path = ROOT / '.github/workflows/deploy.yml'
    html = html_path.read_text()
    workflow = workflow_path.read_text()
    version = VERSION.search(html).group(1)
    if args.check:
        errors = []
        if workflow.splitlines()[0] != f'name: Deploy Home Bar v{version}':
            errors.append('deployment workflow version differs from BUILD_VERSION')
        for match in ASSET.finditer(html):
            if local_asset(match) and match[0] != f'{match["prefix"]}{match["path"]}?v={version}{match["end"]}':
                errors.append(f'asset version differs: {match["path"]}')
        if errors:
            parser.exit(1, '\n'.join(errors) + '\n')
        print(f'RELEASE OK v{version}')
        return
    if not all((args.title, args.summary, args.change)):
        parser.error('--title, --summary, and at least one --change are required')
    # Refuse to guess a release baseline if Git cannot read HEAD.
    head = subprocess.run(['git', 'show', 'HEAD:index.html'], cwd=ROOT,
                          check=True, capture_output=True, text=True).stdout
    baseline = VERSION.search(head).group(1)
    current_parts = list(map(int, version.split('.')))
    baseline_parts = list(map(int, baseline.split('.')))
    if current_parts == baseline_parts:
        current_parts[-1] += 1
    elif current_parts < baseline_parts:
        parser.error('working version is older than HEAD')
    version = '.'.join(map(str, current_parts))
    notes = json.dumps({'title': args.title, 'summary': args.summary,
                       'changes': args.change}, ensure_ascii=False, indent=2)
    notes = notes.replace('<', '\\u003c')
    replacement = 'const CURRENT_RELEASE = ' + notes.replace('\n', '\n    ') + ';'
    html, count = RELEASE.subn(lambda _: replacement, html, count=1)
    if count != 1:
        parser.error('CURRENT_RELEASE block not found')
    html = VERSION.sub(lambda _: f"const BUILD_VERSION = '{version}';", html, count=1)
    html = ASSET.sub(lambda m: f'{m["prefix"]}{m["path"]}?v={version}{m["end"]}'
                    if local_asset(m) else m[0], html)
    workflow, count = re.subn(r'^name: Deploy Home Bar v[^\n]+',
                             f'name: Deploy Home Bar v{version}', workflow, count=1)
    if count != 1:
        parser.error('versioned deployment workflow name not found')
    html_path.write_text(html)
    workflow_path.write_text(workflow)
    print(f'Prepared v{version}; repeated runs reuse this uncommitted build.')


if __name__ == '__main__':
    main()
