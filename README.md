# Purposeful Solutions Web Design

Source for [purposefulsolutionswebdesign.com](https://purposefulsolutionswebdesign.com). The site is
built with [Eleventy](https://www.11ty.dev/) and published to GitHub Pages by GitHub Actions.

## Quick start

Requires [Node.js](https://nodejs.org/) 20 or newer.

```
npm install      # first time only
npm start        # preview at http://localhost:8080, reloads as you edit
npm run build    # build the finished site into _site/
npm run check    # formatting and HTML checks (run after a build)
```

## Where things live

```
src/
  _data/site.json         business name, email, phone, menu and footer links
  _includes/
    layouts/base.njk      the page shell: <head>, header, footer, scripts
    partials/             header, footer, closing call to action, logo,
                          share-preview tags, business details for Google
  index.html              page content only; title and description at the top
  services.html
  pricing.html
  contact.html
  404.html
  sitemap.njk             builds sitemap.xml from the pages automatically
  assets/
    css/styles.css        all styles, organized in numbered sections
    js/nav.js             compact menu on small screens (every page)
    js/contact-form.js    contact form (contact page)
    img/                  every image, plus favicon and social share image
  CNAME, robots.txt, google139b1757fc4b402e.html (Search Console), service-worker.js
  New_PSWD/assets/images/ legacy paths used by email signatures; remove later (see Pending)
eleventy.config.js        build settings
.github/workflows/        check.yml runs checks on every branch; deploy.yml publishes main
```

`_site/` and `node_modules/` are generated and not committed.

## Common changes

- **Phone, email, menu or footer links:** edit `src/_data/site.json`. Every page updates.
- **Header or footer layout:** edit the file in `src/_includes/partials/`.
- **A page's text:** edit that page in `src/`. The block between the `---` lines sets its title and
  description, and options like `closer: false` (hide the closing call to action).
- **A new page:** copy `src/services.html`, change the content and the title and description, then
  add it to `nav` in `site.json` if it belongs in the menu. The sitemap updates itself.

## Code conventions

- **HTML:** semantic elements (`header`, `main`, `section`, `footer`), one `h1` per page, headings in
  order. Every image has `alt`, `width` and `height`; images below the fold use `loading="lazy"`.
  Links and images use root paths (`/assets/...`, `/pricing.html`).
- **CSS:** one file, organized in the numbered sections listed at its top. Colors, fonts and sizes
  are CSS variables in section 1. Class names are descriptive, and variants use a double dash
  (`.btn--ghost`, `.section--tight`, `.tier--featured`).
- **JavaScript:** small, dependency-free scripts loaded with `defer`. The page works without
  JavaScript; the menu links stay visible.
- **Formatting:** Prettier (`.prettierrc`) and EditorConfig. The build also formats the finished
  HTML. `npm run check` must pass; GitHub runs it on every push.

## Branches and publishing

1. Branch from `main` for each change: `git switch -c feature/short-name`.
2. Push the branch. GitHub runs the checks (Actions tab).
3. Open a pull request and merge into `main`. GitHub builds and publishes the site.

**One-time setup:** in GitHub, **Settings → Pages → Build and deployment → Source** must be set to
**GitHub Actions**. Until then, GitHub publishes the repository files as they are, which no longer
works because the pages are in `src/` and need a build.

## Pending

- Contact form submits directly (currently it opens the visitor's email app).
- Point email signatures at `/assets/img/ps-logo-icon.png` and `/assets/img/ps-logo-wordmark.png`,
  then delete `src/New_PSWD/` and its line in `eleventy.config.js`.
- Delete `src/service-worker.js` (and its line in `eleventy.config.js`) around mid-2027, after the
  old site's cached service worker has been cleared for returning visitors.
