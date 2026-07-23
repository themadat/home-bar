#!/usr/bin/env python3
"""
generate-icons.py
------------------
Generate every favicon / PWA / Apple touch icon asset Cocktail List needs
from a single source PNG: build/icon-sources/source-material/app_icon.png

The source is a square, full-bleed dark navy image with a gold coupe-glass
mark. App and touch icons are flattened to RGB so each platform can apply its
own mask. Browser favicons isolate the brass artwork on transparency so Safari
does not add a white contrast frame around the dark navy square. The ICO is
also written at the site root as a legacy browser fallback.

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
MASKABLE_SIZES = [
    ("icon-192-maskable.png", 192),
    ("icon-512-maskable.png", 512),
    ("icon-1024-maskable.png", 1024),
]
APPLE_TOUCH_SIZES = [
    ("apple-touch-icon.png", 180),
    ("apple-touch-icon-152.png", 152),
    ("apple-touch-icon-167.png", 167),
]
FAVICON_SIZES = [
    ("favicon-brass-16.png", 16),
    ("favicon-brass-32.png", 32),
    ("favicon-brass-48.png", 48),
]
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


def transparent_favicon(im: Image.Image) -> Image.Image:
    crop_size = round(min(im.size) * 0.925)
    left = (im.width - crop_size) // 2
    top = (im.height - crop_size) // 2
    cropped = im.crop((left, top, left + crop_size, top + crop_size))
    brass_shadow = (194, 154, 82)
    brass_highlight = (255, 232, 162)
    pixels: list[tuple[int, int, int, int]] = []

    for red, green, blue, source_alpha in cropped.getdata():
        warmth = (red - blue) * 6 + (green - blue) * 3 - 20
        alpha = max(0, min(source_alpha, round(warmth))) if max(red, green, blue) >= 38 else 0
        highlight = max(0, min(1, (max(red, green, blue) - 45) / 210))
        color = tuple(
            round(shadow + (bright - shadow) * highlight)
            for shadow, bright in zip(brass_shadow, brass_highlight)
        )
        pixels.append((*color, alpha))

    favicon = Image.new("RGBA", cropped.size)
    favicon.putdata(pixels)
    return favicon


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
    for name, size in ANY_SIZES:
        resized(flat_src, size).save(DEST_DIR / name)
        print(f"  {name:<28} {size}x{size}")

    favicon_src = transparent_favicon(src)
    print("\nTransparent brass browser favicons:")
    for name, size in FAVICON_SIZES:
        resized(favicon_src, size).save(DEST_DIR / name)
        print(f"  {name:<28} {size}x{size}")

    print("\nFlattened (maskable / apple-touch, full-bleed on sampled background):")
    for name, size in MASKABLE_SIZES + APPLE_TOUCH_SIZES:
        resized(flat_src, size).save(DEST_DIR / name)
        print(f"  {name:<28} {size}x{size}")

    ico_path = DEST_DIR / "favicon-brass.ico"
    resized(favicon_src, 48).save(ico_path, format="ICO", sizes=ICO_SIZES)
    print(f"\nfavicon-brass.ico            {', '.join(f'{w}x{h}' for w, h in ICO_SIZES)}")

    root_ico_path = REPO_ROOT / "favicon.ico"
    resized(favicon_src, 48).save(root_ico_path, format="ICO", sizes=ICO_SIZES)
    print(f"favicon.ico                  {', '.join(f'{w}x{h}' for w, h in ICO_SIZES)}")

    print(f"\nDone. {len(ANY_SIZES) + len(FAVICON_SIZES) + len(MASKABLE_SIZES) + len(APPLE_TOUCH_SIZES) + 2} files written.")


if __name__ == "__main__":
    main()
