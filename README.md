# Home Bar

A searchable cocktail collection with recipes, ratings, notes, bar inventory,
drinkware tracking, and optional GitHub Sync.

[Production](https://themadat.github.io/home-bar/) ·
[Beta](https://themadat.github.io/home-bar/beta/) ·
[Alpha](https://themadat.github.io/home-bar/alpha/)

## Run and check

Run `python3 -m http.server 8990`, then open `http://localhost:8990/`.
No package installation or build step is required. Run `bash build/check.sh`
for JavaScript syntax, local asset paths, startup order, and release consistency.
The checker uses Node.js, or JavaScriptCore on macOS.

## Source map

Read only the files relevant to the change. All paths below are repository-relative.

| File | Responsibility |
| --- | --- |
| `index.html` | Page structure, dialogs, current version/release, ordered script tags |
| `assets/css/app.css` | Styles and responsive layout |
| `assets/js/app.js` | Shared state, configuration, event registration, startup |
| `assets/js/ingredients.js` | Ingredient normalization, measurements, raw recipe parsing |
| `assets/js/ratings.js` | Ratings, bookmarks, photos, source notes |
| `assets/js/availability.js` | Bar matching, substitutions, filtering, sorting |
| `assets/js/render.js` | Table rows, recipe detail, comparison, popovers |
| `assets/js/dialogs.js` | Settings, notes, gallery, drinkware, ingredient checklist |
| `assets/js/bar.js` | Bottles, shopping, recommendations, neat pours |
| `assets/js/cocktail-editor.js` | Recipe editor and export |
| `assets/js/sync.js` | GitHub Sync, import, snapshot validation |
| `assets/js/interface.js` | Filters, keyboard shortcuts, responsive table sizing |
| `assets/js/icons.js` | Bulk static SVG strings; inspect only for icon changes |
| `data/cocktails.js` | Base cocktail records, formatted for targeted reads by id |
| `data/classic-recipes.js` | Classic recipe variants and new drinks from the supplied collection |
| `letters-liquor-*.js`, `diffords-data.js` | Supplemental datasets |
| `tools/import-diffords.mjs` | Difford's data importer |

Feature scripts contain function declarations sharing the original global scope;
load them before `app.js`. Keep initialization in `app.js` in its existing order.
Do not add async/defer or module wrappers without reviewing these dependencies.
Keep BUILD_VERSION in the HTML: existing installations extract it to detect updates.

Default `rg` searches skip bulk datasets, icons, and exports via `.rgignore`.
Search an explicit path to include them, e.g.:

```bash
rg -n --max-columns 200 --max-columns-preview '"id": "alexander"' data/cocktails.js
```

## Release and deploy

Prepare one version per uncommitted batch (repeat with revised notes while refining):

```bash
python3 build/release.py --title "Release title" --summary "What changed" --change "Specific improvement"
bash build/check.sh
```

The release helper increments only BUILD relative to HEAD, then synchronizes the
workflow name and all local JS/CSS cache versions. Commit the batch before starting
the next release. Instructions/docs/tooling-only changes do not require a bump.

Push to `main`, `beta`, or `alpha` to deploy to the corresponding `gh-pages` folder.
GitHub Pages must serve `gh-pages` at `/ (root)`. Relative asset paths work in all
three locations. Keep existing browser-storage keys for user-data compatibility.
