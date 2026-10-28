# Nandhu’s Bakehouse: digital menu

Plain HTML, CSS and JavaScript. No build step.

## Edit your shop
Open `script.js` and change the block at the top:
- `SHOP`: WhatsApp number, phone, address, opening hours.
- `MENU`: items, prices and categories.

## Deploy to Azure Static Web Apps
1. Push this folder to GitHub (branch `main`).
2. Azure portal > Create a resource > Static Web App.
3. Source: GitHub. Choose your repo and `main`.
4. Build preset: Custom. App location: `/`. Output location: empty.
5. Create. Every push to `main` now redeploys the site.

If Azure creates its own workflow file, keep only one in `.github/workflows`.
