# Home Bar

A searchable cocktail collection with ratings, notes, recipes, a home bar inventory,
glassware tracking, and optional GitHub Sync. Install it from your browser for
quick access from your home screen.

Use **Home Bar** as the app name and **home-bar** for the repository and local folder.

- Repository: [themadat/home-bar](https://github.com/themadat/home-bar)
- Website: [Home Bar](https://themadat.github.io/home-bar/)
- Beta: [Home Bar beta](https://themadat.github.io/home-bar/beta/)
- Alpha: [Home Bar alpha](https://themadat.github.io/home-bar/alpha/)

## Run locally

From the repository folder, run `python3 -m http.server 8990` and open
[localhost:8990](http://localhost:8990/). There is no package installation or app
build step. On macOS, run `bash build/check.sh` to check the main JavaScript syntax.

## Deploy

Push to `main`, `beta`, or `alpha` to run the **Deploy Home Bar to GitHub Pages**
workflow. It publishes to the root, `beta/`, or `alpha/` folder of the `gh-pages`
branch. In GitHub **Settings → Pages**, use **Deploy from a branch**, select
`gh-pages`, and choose `/ (root)`.

## Finish the repository and folder rename

The links above use the new name. Complete these steps to move the existing site:

1. Export a current JSON backup from the app on each device with unsynced data.
2. While signed into GitHub as `themadat` (or another repository administrator),
   open the existing repository's **Settings → General**, change **Repository name**
   from `cocktail-list` to `home-bar`, and click **Rename**. In the repository's
   **About** settings, set its website to `https://themadat.github.io/home-bar/`.
3. Point this clone at the renamed repository with
   `git remote set-url origin git@gh-personal:themadat/home-bar.git`. This preserves
   the existing personal SSH host alias. Commit and push the Home Bar changes to
   `main`, then wait for the deployment and GitHub Pages build to finish.
4. After pushing, rename the local `cocktail-list` folder to `home-bar` and reopen
   that folder in Codex and any other editors or Git clients. The saved Codex
   project label can be `home-bar`; its folder path must also point to the new location.
5. Open the new website, confirm your data is present, update bookmarks, and
   recreate home-screen shortcuts or installed web apps from the new URL.

GitHub redirects old repository links, but **does not redirect the old GitHub Pages
project URL**. See [GitHub's repository rename documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository).

Existing `cocktail...` browser storage keys are intentionally retained for data
compatibility. The Pages hostname remains `themadat.github.io`, so local storage
in the same browser profile remains available at the new path. Keep your JSON
backup until you have checked the new site and any installed app. If GitHub Sync
uses this renamed repository, update its repository setting to `home-bar`; a
separate data repository does not need to be renamed.

## Versioning

This rename starts release **2.0.0**. The app stores and displays a fourth build
segment in `BUILD_VERSION`, so this release is **2.0.0.116**, incrementing the
previous build from 115 to 116. Future changes follow `AGENTS.md`.
