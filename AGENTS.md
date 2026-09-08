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

## Agent Continuity Protocol

Agent work must be resumable across sessions.

### `continue`

When the user sends only:

```text
continue
```

resume the current task.

1. Read `AGENT_STATUS.md`.
2. Inspect:
   - `git status`
   - the current diff
   - recent relevant commits
   - relevant changed files
3. Verify `AGENT_STATUS.md` against the actual repository state.
4. Determine the current phase:
   - `PLANNING`
   - `IMPLEMENTING`
   - `TESTING`
   - `VERIFYING`
   - `COMPLETE`
   - `BLOCKED`
5. Continue with the next unfinished work.
6. Do not redo completed work unless repository inspection or verification shows it is necessary.
7. Keep `AGENT_STATUS.md` updated as work progresses.

If `AGENT_STATUS.md` does not exist, infer the current state from the repository, current task
context, git history, and working tree, then create it.

### Persistent Status

Maintain `AGENT_STATUS.md` in the repository root for any active agent task.

Keep it concise.

Use this structure:

```markdown
# Goal
Current task.
# Status
PLANNING | IMPLEMENTING | TESTING | VERIFYING | COMPLETE | BLOCKED
# Checkpoint
Current agent checkpoint version and commit, if one exists.
# Completed
- Completed work
# Remaining
- Remaining work
# Verification
- Build: PASS | FAIL | NOT RUN
- Tests: PASS | FAIL | NOT RUN
- Lint: PASS | FAIL | NOT RUN
- Review: PASS | FAIL | NOT RUN
# Next
Exact next action.
# Decisions
- Important implementation decisions or assumptions
```

Update this file after meaningful milestones and before stopping whenever possible.

Do not use it as a verbose work log. It should describe the current resumable state.

### Agent Checkpoints

A `+X` build suffix represents an agent checkpoint, not a release and not specifically a
usage-limit event.

Examples:

```text
1.4.0
1.4.0+1
1.4.0+2
1.4.0+3
```

For long-running tasks, create checkpoints at useful stable boundaries so another agent can
resume without losing significant work.

Good checkpoint boundaries include:

- a meaningful implementation unit is complete;
- implementation is complete and testing is beginning;
- testing is complete and verification is beginning;
- substantial progress has been made before beginning another large unit of work;
- available agent usage/context appears to be getting low;
- the agent otherwise expects the session may stop soon.

Do not depend on being able to predict exactly when usage or context will run out.

#### Creating a checkpoint

When creating an agent checkpoint:

1. Reach a coherent stopping point.
2. Update `AGENT_STATUS.md`.
3. Find the project's existing canonical version source.
4. Preserve the normal version and increment only the build metadata. For example:

   ```text
   1.4.0 -> 1.4.0+1
   1.4.0+1 -> 1.4.0+2
   ```

   Do not invent a second versioning system if the repository already has one.

   If the project's version format cannot support `+X`, preserve its existing versioning
   conventions and record the checkpoint number only in `AGENT_STATUS.md`.
5. Run reasonable validation for the state being checkpointed.
6. Update the `# Checkpoint` entry in `AGENT_STATUS.md`.
7. Commit the checkpoint with:

   ```text
   checkpoint: <version> - <short description>
   ```

   Example:

   ```text
   checkpoint: 1.4.0+2 - inventory tag editor implemented
   ```

After committing, ensure `AGENT_STATUS.md` records both the checkpoint version and commit hash.
For example:

```text
Checkpoint: 1.4.0+2 (a1b2c3d)
```

#### Do not checkpoint when

Do not automatically create a checkpoint commit if:

- unrelated user changes would be included;
- secrets or generated files that should not be committed are present;
- the repository is knowingly broken to the point that the commit would not be a useful resume
  state;
- the user has instructed you not to commit.

Never discard, reset, overwrite, or clean unrelated user changes in order to create a checkpoint.

### Usage / Context Awareness

If the environment exposes remaining usage, context, or session limits, check them periodically
during long-running work.

If remaining capacity appears low:

1. Stop starting new large implementation units.
2. Finish the smallest coherent unit currently in progress.
3. Run the most relevant available verification.
4. Update `AGENT_STATUS.md`.
5. Create an agent checkpoint if it is safe to do so.
6. Leave `# Next` with a precise instruction for the next agent.

If remaining usage cannot be determined, rely on regular milestone checkpoints instead.

### Completion Standard

Do not mark a task `COMPLETE` merely because coding is finished.

`COMPLETE` means:

- requested functionality is implemented;
- relevant tests pass;
- build/typecheck passes where applicable;
- lint passes where applicable;
- implementation has been reviewed against the original request;
- no known required work remains.

The expected progression is generally:

```text
IMPLEMENTING -> TESTING -> VERIFYING -> COMPLETE
```

If implementation is finished but testing has not been completed, use `TESTING`.

If tests pass but the task still needs final review against the request, use `VERIFYING`.

When the task is truly complete:

- set `AGENT_STATUS.md` to `COMPLETE`;
- clearly record final verification results;
- do not create another `+X` checkpoint solely because the task completed unless the repository's
  normal release/versioning process requires it.

### Initial Setup

After adding this protocol:

1. Inspect the repository's current versioning mechanism.
2. Do not change the current application version merely to install this protocol.
3. Create `AGENT_STATUS.md` only if there is currently an active unfinished task; otherwise wait
   until agent work begins.
4. Briefly report:
   - where the canonical project version is stored;
   - whether `+X` build metadata is supported by the current version format;
   - whether any existing `AGENTS.md` instructions were preserved or merged.
