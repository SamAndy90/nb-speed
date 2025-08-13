This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Environment Variables
|Key|Description|
|---|---|
|`SHOPIFY_STOREFRONT_ACCESS_TOKEN`|Access token used for Storefront API GraphQL endpoints|
|`SHOPIFY_ADMIN_ACCESS_TOKEN`|Access token used for Admin API GraphQL endpoints|
|`SHOPIFY_STORE_DOMAIN`|Domain used for Storefront and Admin API endpoints|
|`SHOPIFY_STOREFRONT_API_VERSION`|Shopify API version to use for both Storefront and Admin|
All required variables documented in the [example env file](./.env.example).

# TODOs
[ ] Auth redirect flow, e.g. where to redirect after sign-in/sign out
    - Where to redirect when accessing a protected route when signed out
[ ] Nicer error names, e.g. "Unidentified Customer" -> Incorrect password
[ ] Dashboard route names
    - Translating all the tabs we have so far to slugs works fine, apart from maybe /account/account
[ ] SEO Fields


# Shopify Order Fulfilment Statuses
- These are all the possible statuses for order fulfilment
FULFILLED
Displayed as Fulfilled. All the items in the order have been fulfilled.

IN_PROGRESS
Displayed as In progress. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service.

ON_HOLD
Displayed as On hold. All of the unfulfilled items in this order are on hold.

OPEN
Displayed as Open. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status.

PARTIALLY_FULFILLED
Displayed as Partially fulfilled. Some of the items in the order have been fulfilled.

PENDING_FULFILLMENT
Displayed as Pending fulfillment. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by the "IN_PROGRESS" status.

RESTOCKED
Displayed as Restocked. All the items in the order have been restocked. Replaced by the "UNFULFILLED" status.

SCHEDULED
Displayed as Scheduled. All of the unfulfilled items in this order are scheduled for fulfillment at later time.

UNFULFILLED
Displayed as Unfulfilled. None of the items in the order have been fulfilled.
test
