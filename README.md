# CRUMB & CO.

A responsive React 19 + Vite bakery ecommerce concept, inspired by the visual energy of modern American bakeries. All brand content, reviews, prices and locations are fictional.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

## Included

- All 17 content sections from the supplied brief
- Responsive category grids and swipeable product cards on mobile
- Search, product filtering, occasion recommendations
- Persistent shopping bag, quantity controls and totals
- Live cake inscription, size, flavor and frosting color configuration
- Validated newsletter and catering demonstration forms
- Reduced motion support and keyboard-accessible controls

Checkout, account sign-in, email subscriptions and catering submissions are demonstration flows. No payments or requests are transmitted. Newsletter and shopping bag data are stored only in the current browser. Product images use Unsplash; they are illustrative rather than exact product depictions. Google Fonts and stock photography require an internet connection.

## Original hero asset

`public/images/hero.png` was generated with the built-in image generation tool. Brief: photorealistic American neighborhood bakery still life; vanilla confetti celebration cake with ivory buttercream, red piped borders and cherries; cupcakes, cookies and cake slice; cream CRUMB & CO. packaging on a buttery yellow set; natural editorial light and authentic handmade textures.

## Reference hero update

The header and workshop hero follow the user-supplied Magnolia Bakery screenshot, with CRUMB & CO. branding. The workshop background image is sourced from the publicly accessible Magnolia Bakery CDN: https://www.magnoliabakery.com/cdn/shop/files/IcingClassesDigitalAssets_Homepage_Module_2048x.jpg?v=1755274281 . The scalloped panel is a project-authored SVG mask.

## Annotated design refinements

Centered the desktop navigation; removed small eyebrow labels and the locations concept note; rebuilt the category grid with Gift Boxes and Breakfast Bakes; replaced the yellow hero/feature photography; replaced the CSS cake drawing with a realistic photo and live inscription overlay.

New generated assets (built-in image generation):
- `public/images/celebration-cool.png`: confetti cake, cupcakes, cookies and a slice on blush linen with a powder-blue background, cool neutral daylight, no yellow cast.
- `public/images/custom-cake-real.png`: realistic vintage piped ivory-and-blush celebration cake on an espresso backdrop, blank front oval for the live inscription.

## Motion

Lightweight CSS animations and an IntersectionObserver hook provide one-time scroll reveals, staggered card entrances, hero slide transitions, a seamless brand ribbon, dropdown and dialog entrances, cart feedback, and hover interactions. No animation dependency is required. Reduced-motion preferences disable animations and reveal all content immediately; observer cleanup runs when filters change or the component unmounts.

## Page simplification

Removed the custom cake builder, delivery-options section, and community photo grid at the user’s request. The Local Delivery footer link now leads to Locations.

## Enhanced motion

Added slow hero image zoom and scroll drift, a gently floating hero panel, scroll-linked photo parallax, pointer-responsive category card tilt, rotating ribbon accents, subtle photo/stamp rocking, button highlights, and a reading-progress line. Continuous hero motion pauses out of view. Scroll updates are batched with requestAnimationFrame; listeners and observers are cleaned up. Reduced motion disables decorative effects. The header CTA reads ORDER NOW.
