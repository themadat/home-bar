# Agent instructions

## Keep context small
- Use the source map in README.md to locate code. Search explicit files with `rg -n --max-columns 200 --max-columns-preview`; read only relevant functions or records.
- Never dump whole large files, datasets, SVG payloads, exports, or full diffs. Start with `git diff --stat`; bound further output. `.rgignore` excludes bulk content from default searches; pass its path explicitly when needed.
- Batch related edits; run focused validation once after the final change (`bash build/check.sh`). Check the browser when loading, layout, or interaction changes.
- Keep reports concise. Avoid unrelated refactoring, new tracking files, and additional agents unless requested or necessary.

## Release a batch
- Keep BUILD_VERSION and CURRENT_RELEASE in index.html; the updater reads the version from HTML.
- For app changes, run `python3 build/release.py --title "..." --summary "..." --change "..."` (repeat --change as needed). It bumps BUILD once relative to HEAD, reuses that version for uncommitted refinements, and synchronizes asset URLs and the workflow name.
- Notes must accurately describe the completed batch. No bump for docs/instructions/tooling alone. Change MAJOR/MINOR/PATCH only when explicitly requested.

## Finish
- After changes, provide one copy-paste-ready bash command staging changed files, committing with the current version and a short specific summary, and pushing to origin on the current branch. Never run it yourself.
- On `continue`, inspect Git status, recent changes, and any existing handoff/plan, then resume unfinished work. Do not create replacement tracking files.
