# Purposeful Solutions Web Design

Source for [purposefulsolutionswebdesign.com](https://purposefulsolutionswebdesign.com), served by GitHub Pages from the `main` branch.

## Structure

```
index.html  services.html  pricing.html  contact.html  404.html
assets/
  css/styles.css   all styles (light and dark themes via CSS variables)
  js/main.js       contact form (builds an email for the visitor to send)
  img/             every image the site uses, plus favicon and social share image
CNAME              custom domain for GitHub Pages
sitemap.xml, robots.txt
service-worker.js  retires the old site's cached service worker; delete mid-2027
New_PSWD/assets/images/   legacy paths still used by email signatures; remove once
                          signatures point to assets/img/ (see below)
google139b1757fc4b402e.html  Google Search Console verification, keep
```

## Workflow

1. Branch from `main` for each change (`git switch -c feature/short-name`).
2. Preview locally: `python -m http.server 8000`, then open http://localhost:8000.
3. Push the branch and review. Merging into `main` publishes the site.

## Pending

- Contact form submits directly (currently opens the visitor's email app).
- Point email signatures at `assets/img/ps-logo-icon.png` and `assets/img/ps-logo-wordmark.png`,
  then delete `New_PSWD/`.
