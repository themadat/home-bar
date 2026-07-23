# Agent instructions

## Build number

`index.html` has a `const BUILD_VERSION = 'MAJOR.MINOR.PATCH.BUILD';` line (search for
`BUILD_VERSION =`). It's shown to the user as the `v...` pill under the app title and in the
version modal.

After every prompt that changes `index.html`, increment the last (BUILD) segment by 1 before
finishing the turn (e.g. `1.0.0.1` -> `1.0.0.2`). Only bump MAJOR/MINOR/PATCH if the user
explicitly asks for that.

## End of turn

After making changes, always give the user a single copy-paste-ready terminal command (in a
` ```bash ` fenced block) that stages `index.html` (and any other changed files), commits with a
short one-line summary of what was done, and pushes to `origin`. Example shape:

```bash
git add index.html && git commit -m "Short summary of what changed" && git push origin main
```

Do not run this command yourself — the user runs it. Do not combine multiple unrelated changes
into one vague summary; describe what actually changed in that turn.
