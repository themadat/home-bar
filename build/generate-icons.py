#!/usr/bin/env python3
"""
generate-icons.py
------------------
Generate every favicon / PWA / Apple touch icon asset Cocktail List needs
from a single source PNG: build/icon-sources/source-material/app_icon.png

The source is a square, full-bleed dark navy image with a gold coupe-glass
mark. Every generated asset is flattened to RGB so icons contain no white
padding or transparent pixels; each platform applies its own icon mask.

Requires: Pillow (pip3 install --user pillow)

Usage: ./build/generate-icons.py
"""

from collections import Counter
from pathlib import Path

from PIL import Image

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE = REPO_ROOT / "build" / "icon-sources" / "source-material" / "app_icon.png"
DEST_DIR = REPO_ROOT / "assets" / "icons"

# (filename, size, flattened?)
ANY_SIZES = [("icon-192.png", 192), ("icon-512.png", 512)]
MASKABLE_SIZES = [("icon-192-maskable.png", 192), ("icon-512-maskable.png", 512)]
APPLE_TOUCH_SIZES = [
    ("apple-touch-icon.png", 180),
    ("apple-touch-icon-152.png", 152),
    ("apple-touch-icon-167.png", 167),
]
FAVICON_SIZES = [("favicon-16.png", 16), ("favicon-32.png", 32), ("favicon-48.png", 48)]
ICO_SIZES = [(16, 16), (32, 32), (48, 48)]


def dominant_opaque_color(im: Image.Image) -> tuple[int, int, int]:
    counter: Counter[tuple[int, int, int]] = Counter()
    for r, g, b, a in im.getdata():
        if a == 255:
            counter[(r, g, b)] += 1
    if not counter:
        raise SystemExit("Error: source icon has no fully-opaque pixels to sample a background color from.")
    return counter.most_common(1)[0][0]


def flatten(im: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    flat = Image.new("RGBA", im.size, bg + (255,))
    flat.alpha_composite(im)
    return flat.convert("RGB")


def resized(im: Image.Image, size: int) -> Image.Image:
    return im.resize((size, size), Image.LANCZOS)


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Error: missing source icon: {SOURCE}")

    DEST_DIR.mkdir(parents=True, exist_ok=True)

    src = Image.open(SOURCE).convert("RGBA")
    if src.width != src.height:
        print(f"  warning: source is {src.width}x{src.height}, not square")

    bg = dominant_opaque_color(src)
    print(f"Source: {SOURCE.relative_to(REPO_ROOT)} ({src.width}x{src.height})")
    print(f"Sampled background color: rgb{bg} / #{bg[0]:02x}{bg[1]:02x}{bg[2]:02x}")
    print(f"Output: {DEST_DIR.relative_to(REPO_ROOT)}/\n")

    flat_src = flatten(src, bg)

    print("Opaque (any-purpose):")
    for name, size in ANY_SIZES + FAVICON_SIZES:
        resized(flat_src, size).save(DEST_DIR / name)
        print(f"  {name:<28} {size}x{size}")

    print("\nFlattened (maskable / apple-touch, full-bleed on sampled background):")
    for name, size in MASKABLE_SIZES + APPLE_TOUCH_SIZES:
        resized(flat_src, size).save(DEST_DIR / name)
        print(f"  {name:<28} {size}x{size}")

    ico_path = DEST_DIR / "favicon.ico"
    resized(flat_src, 48).save(ico_path, format="ICO", sizes=ICO_SIZES)
    print(f"\nfavicon.ico                  {', '.join(f'{w}x{h}' for w, h in ICO_SIZES)}")

    print(f"\nDone. {len(ANY_SIZES) + len(FAVICON_SIZES) + len(MASKABLE_SIZES) + len(APPLE_TOUCH_SIZES) + 1} files written.")


if __name__ == "__main__":
    main()
