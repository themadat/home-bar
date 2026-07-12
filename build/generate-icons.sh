#!/usr/bin/env bash
#
# generate-icons.sh
# -----------------
# Wrapper for generate-icons.py — regenerates every favicon / PWA / Apple
# touch icon asset from build/icon-sources/source-material/app_icon.png.
#
# Usage: ./build/generate-icons.sh
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

exec python3 "$SCRIPT_DIR/generate-icons.py"
