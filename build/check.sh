#!/usr/bin/env bash
# Parse loaded scripts and check asset paths, load order, and release versions.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 "$SCRIPT_DIR/check.py"
python3 "$SCRIPT_DIR/release.py" --check
