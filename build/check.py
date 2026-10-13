#!/usr/bin/env python3
"""Check the HTML entry point and focused startup regressions."""
import re
import shutil
import subprocess
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent


class EntryPoint(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.inline = None

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'script':
            if attrs.get('src'):
                self.scripts.append((attrs['src'], None))
            else:
                self.inline = ''
        elif tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.require_asset(attrs['href'])

    def handle_data(self, data):
        if self.inline is not None:
            self.inline += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.inline is not None:
            self.scripts.append(('index.html inline', self.inline))
            self.inline = None

    @staticmethod
    def require_asset(url):
        parts = urlsplit(url)
        if parts.scheme or parts.netloc:
            raise ValueError(f'Unexpected external application asset: {url}')
        path = ROOT / parts.path
        if not path.is_file():
            raise ValueError(f'Missing asset: {path.relative_to(ROOT)}')
        return path


def main():
    entry = EntryPoint()
    entry.feed((ROOT / 'index.html').read_text())
    scripts = [(name, code if code is not None else entry.require_asset(name).read_text())
               for name, code in entry.scripts]
    assert scripts and urlsplit(scripts[-1][0]).path == 'assets/js/app.js', 'Startup must load last'
    node = shutil.which('node')
    jsc = Path('/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc')
    if not node and not jsc.is_file():
        raise SystemExit('Install Node.js or use macOS JavaScriptCore to check syntax.')
    with tempfile.TemporaryDirectory(prefix='home-bar-check-') as directory:
        target = Path(directory) / 'check.js'
        # Combined parsing also catches duplicate global lexical declarations.
        for name, code in scripts + [('combined script scope', '\n;\n'.join(code for _, code in scripts))]:
            target.write_text(code if node else 'function __parseOnly__() {\n' + code + '\n}\n')
            result = subprocess.run([node, '--check', str(target)] if node else [str(jsc), str(target)],
                                    capture_output=True, text=True)
            if result.returncode:
                # Never echo an offending source line: it may be an entire dataset.
                diagnostic = re.search(r'(?:SyntaxError|ReferenceError):[^\n]+', result.stderr + result.stdout)
                raise SystemExit(f'PARSE FAIL {name}: {diagnostic[0] if diagnostic else "parser rejected script"}')
        # Legacy saved nut bottles migrate before app.js initializes norm.
        # Keep that initialization order here so a late-helper dependency fails.
        target.write_text((ROOT / 'assets/js/ingredients.js').read_text() + '''
for (const legacy of ['Nuts liqueurs', 'Nut Liqueur', 'Nut']) {
    for (const [name, expected] of [
        ['Amaretto', 'Nut, Almond'], ['Frangelico', 'Nut, Hazelnut'],
        ['Pistachio Liqueur', 'Nut, Pistachio'],
        ['Peanut-Butter Liqueur', 'Nut, Peanut Butter'], ['Walnut', 'Nut, Other']
    ]) {
        if (canonicalLiqueurSubtype(name, legacy) !== expected)
            throw new Error('Saved nut liqueur migration failed: ' + name);
    }
}
const norm = () => { throw new Error('Migration must not depend on late startup helpers'); };
''')
        result = subprocess.run([node or str(jsc), str(target)], capture_output=True, text=True)
        if result.returncode:
            raise SystemExit('STARTUP FAIL: saved nut liqueur migration before shared helpers initialize')
    print(f'PARSE OK {len(scripts)} scripts and combined scope; local assets exist')
    print('STARTUP OK legacy nut liqueur migrations before shared helper initialization')


if __name__ == '__main__':
    main()
