# CRUMB & CO. storefront

A responsive React 19 + Vite multi-page bakery concept. The original landing page remains at `/`, with a shared header, footer, cart, search, and motion system across the storefront.

## Run and verify

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

Builds include physical HTML entrypoints for 31 routes, plus a static SPA fallback, so shared URLs and reloads work without relying only on client navigation.

## Pages

- `/order`: shipping, pickup and local delivery selection, bakery, ZIP, date, time window
- `/shop`: searchable, sortable catalog with category filters
- `/product/:slug`: 10 product pages with variants, quantities, cake inscriptions, allergens and care
- `/cart`, `/checkout`, `/confirmation/:id`: persistent bag, validation, totals, review and saved order confirmation
- `/locations` and `/locations/:slug`: all bakeries and three location detail pages
- `/story`, `/catering`, `/workshops`, `/careers`, `/press`, `/contact`
- `/account`: local profile, order previews, cancellation and inquiry drafts
- `/faq`: searchable questions with expandable answers
- `/shipping`, `/returns`, `/privacy`, `/terms`, `/community`

Every main navigation and footer item has a destination. Native links support opening in new tabs, browser back/forward, and direct page reloads.

## Current operating mode

The user selected **WooCommerce** as the future store backend and explicitly chose to use the demo catalog now and connect the real store later. No WooCommerce store, credentials, checkout gateway, mail service or customer authentication has been connected.

Shopping and forms work in the browser. Bags, fulfillment preferences, local profiles, order previews and inquiry drafts persist in local storage. Saving checkout does not charge a card, send an order to a bakery, or send a confirmation email. Contact/catering/career forms prepare locally saved inquiries without transmitting them. Workshop booking is a preview only. These outcomes are explained at the relevant completion steps; the marketing pages retain clean branding.

No passwords or payment-card information are requested. Street addresses, checkout email and phone are held only in checkout component state; saved order previews retain the recipient name, purchased items, gift note, fulfillment date, and totals. Profiles and inquiry drafts are stored on this browser until removed or site data is cleared.

Product names, prices, locations, policy text and reviews belong to a fictional brand concept. Product photography is illustrative.

## Commerce behavior

- Quantities persist across navigation and reloads, capped at 99 per line.
- Product variants and cake inscriptions are distinct bag line items.
- Shipping is estimated at $12; local delivery at $8; pickup is free.
- Pudding and breakfast bakes are blocked from nationwide shipping.
- Local delivery ZIP validation accepts prefixes 100 and 112.
- Fulfillment dates must be tomorrow or later.
- Order previews and inquiry drafts can be reviewed from `/account`.
- Native form validation covers required fields and email/address formatting.

## Motion and accessibility

IntersectionObserver provides one-time reveals and staggered card entrances. CSS handles hero transitions, floating panel, subtle photo movement, button feedback, dropdowns, cart and dialogs. Scroll movement uses requestAnimationFrame and cleaned-up listeners. Reduced-motion preferences disable decorative effects. Page changes focus the main content; forms have labels and validation messages; Escape closes overlays.

## Files

- `src/main.jsx`: app shell, landing page, shared bag and search
- `src/Pages.jsx`: storefront and supporting pages
- `src/router.js`: native-history navigation
- `src/storeData.js`: catalog, variants, locations and FAQs
- `src/commerce.js`: delivery eligibility and order totals
- `src/useMotion.js`, `src/motion.css`: shared animations
- `src/pages.css`: page and responsive layouts
- `tests/store.test.mjs`: catalog, restrictions, dates and totals checks
- `scripts/build-routes.mjs`: direct-load route entrypoints and fallback

## Images

Original generated assets use the built-in image generator:
- `public/images/celebration-cool.png`: confetti cake, cupcakes, cookies and a slice on blush linen, powder-blue backdrop, cool neutral light.
- `public/images/custom-cake-real.png`: ivory and blush Lambeth-piped cake against espresso, a blank front oval for inscription. Retained as an asset; the custom-builder home section was removed at the user’s request.
- `public/images/hero.png`: original yellow celebration still life, retained as an unused asset after the user requested cooler photography.

The workshop hero uses the public Magnolia Bakery reference image selected by the user: https://www.magnoliabakery.com/cdn/shop/files/IcingClassesDigitalAssets_Homepage_Module_2048x.jpg?v=1755274281 . Other illustrative photography loads from Unsplash. Typography loads from Google Fonts. The scalloped panel mask is a local project SVG.

## Connecting WooCommerce later

Choose the intended store and connect its product/variation/inventory data, cart, checkout, shipping, tax and payment gateway. Use secure server-side credentials when needed; never place WooCommerce consumer secrets in browser JavaScript. Replace local preview persistence and forms with the authorized store/order and email services, then update policy text and perform live checkout validation before accepting real orders.
