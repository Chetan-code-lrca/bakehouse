# Nandhu’s Bakehouse — digital menu

A small, responsive digital menu built with plain HTML, CSS, and JavaScript. Visitors can browse menu categories, add or remove items, see the calculated total, optionally enter a name, and open a pre-filled order message in WhatsApp.

There is no framework, package manager, backend, database, or payment gateway. The browser builds the order message; the customer reviews and sends it through WhatsApp.

## Run locally

You only need a modern web browser. To serve the files locally, use Python 3:

```bash
git clone https://github.com/Chetan-code-lrca/bakehouse.git
cd bakehouse
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

You can also open `index.html` directly in a browser. A local server is recommended for testing in an environment closer to static hosting.

## Customize the shop

Open `script.js`. The first section contains the two configuration objects intended for editing.

### Shop details

Update the `SHOP` object:

| Field | Meaning |
| --- | --- |
| `name` | Shop name shown in the WhatsApp message |
| `whatsapp` | WhatsApp number with country code, digits only (no `+`, spaces, or punctuation) |
| `phoneDisplay` | Human-readable contact number shown on the page |
| `address` | Shop location shown in the footer |
| `openHour` / `closeHour` | Opening and closing hour in 24-hour local time |
| `hoursText` | Opening-hours text displayed to visitors |

The current WhatsApp number in the source is a placeholder. Replace it with a number that the shop is authorized to publish before deployment. The open/closed indicator uses the visitor’s device clock; it is not connected to a live store schedule.

### Menu items

Edit the `MENU` array. Each item has this shape:

```js
{
  id: "unique-item-id",
  cat: "Breads",
  name: "Butter croissant",
  desc: "Flaky and buttery",
  price: 60
}
```

Use a unique `id` for every item. `cat` controls the category filter, and `price` is a numeric amount displayed with the rupee symbol. Update names, descriptions, categories, and prices to match the real menu.

## How ordering works

1. A visitor filters the menu and adds items to the order.
2. The page updates quantities and calculates the total in the browser.
3. The visitor may enter an optional name.
4. **Send order on WhatsApp** opens WhatsApp with the item list, total, and optional name filled in. The visitor must review and send the message.

This is an order-message builder, not an online checkout. It does not charge customers, confirm stock, store orders on a server, or send messages automatically.

## Project files

```text
bakehouse/
├── index.html   # Menu page and accessible page structure
├── style.css    # Layout, colors, and responsive styling
├── script.js    # Shop configuration, menu, cart, and WhatsApp message
└── README.md
```

## Deploy

The repository is configured for a static-site workflow and can be hosted by Azure Static Web Apps or another static web host. For Azure Static Web Apps:

1. Push the repository to GitHub on the `main` branch.
2. Create a Static Web App in the Azure portal and connect this repository.
3. Choose the Custom build preset.
4. Set the app location to `/` and leave the output location empty because the site is served directly from the repository root.
5. Complete deployment and verify the generated site URL on both desktop and mobile.

If the hosting provider generates a workflow file, keep one deployment workflow for this site and remove any duplicate workflow only after checking which one is active.

## Before publishing

- Replace the placeholder WhatsApp number and confirm the contact details with the shop owner.
- Verify all item names, descriptions, prices, opening hours, and address.
- Place a test order and confirm the generated WhatsApp message is correct.
- Check the page on a mobile device as well as a desktop browser.
- Do not add private customer information, credentials, or payment details to the repository.

## External resources

The page loads Google Fonts from Google Fonts. The WhatsApp order link opens WhatsApp in a new tab or app when a visitor chooses to send an order.
