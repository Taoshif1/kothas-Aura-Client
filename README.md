# Kotha's Aura Client

React 19/Vite storefront and operations console for Kotha's Aura. The interface uses React Router, Tailwind CSS 4, DaisyUI 5, Axios, Firebase Authentication, React Hook Form, Helmet, and toast feedback.

## Architecture

- `src/api`: shared credentialed API client and domain helpers
- `src/components`: storefront, account, Admin, and reusable UI
- `src/pages`: public, customer-dashboard, and Admin routes
- `src/providers`: authentication, cart, wishlist, and store settings
- `src/routes`: public/private/Admin routing with route-level lazy loading

The browser authenticates with Firebase, sends the Firebase ID token to the server once, and then uses the server's HttpOnly session cookie. MongoDB—not browser state or Firebase custom claims—is authoritative for the application role.

## Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and supply the API URL and Firebase public web configuration. Never place Firebase Admin credentials, MongoDB credentials, or JWT secrets in client variables.

## Routes and flows

Public routes cover Home, Shop/search/filtering, Product Details/reviews, About, Contact, Cart, Wishlist, Checkout, order success, and public tracking. Authenticated customers receive Dashboard, Profile, Orders, order details, and Addresses. Admin routes cover Overview, Products, Categories, Orders, Customers, Reviews, Coupons, Messages, Subscribers, and Store Settings.

Store Settings are fetched once through `StoreSettingsProvider` and drive announcement, hero, contact, social, delivery, payment, maintenance, and SEO fallback content.

Payments in V1 are COD plus manually verified bKash/Nagad. The client never decides authoritative price, stock, discount, payment status, review approval, role, or order ownership.

## Quality commands

```bash
npm run lint
npm run build
npm run preview
```

No browser unit-test stack is added. Before release, manually verify public search/shop/product/contact flows, customer profile/address/checkout/order flows, and every Admin operational section at mobile and desktop widths.

## Deployment (Vercel)

1. Configure all `VITE_*` variables in Vercel.
2. Set `VITE_API_URL` to the HTTPS server URL ending in `/api`.
3. Add the production domain to Firebase Authentication authorized domains.
4. Ensure the server allowlist includes the exact Vercel origin.
5. Build with `npm run build`; publish `dist` using SPA fallback routing.

The API must use HTTPS because production authentication uses a Secure, HttpOnly, `SameSite=None` cookie across origins.
