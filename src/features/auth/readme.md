# Auth

Auth is done through the Shopify Storefront API.
Something to note is that Shopify has two account systems, classic and new customer accounts. Classic accounts are created with a password and email, whereas new customer accounts are passwordless.
One of the downsides of the classic account system is that they do not support email verification (from what I can see)

See https://www.shopify.com/uk/partners/blog/introducing-customer-account-api-for-headless-stores

## Flow


### Login
- User logs in
- Server Action reuqests customer token from Shopify API
- Customer token stored in cookies
- User redirected to dashboard

### Register
- User submits email and password
- Server action submits request to create customer
- Server action returns the newly created customer, but we can make a request to the login endpoint to get back a token
- Redirect to dashboard afterwards?

### Forgot Password
- User requests password recovery (customerRecover endpoint)
- Email gets sent with token
- customerReset endpoint accepts token and password

## Notes
Order history with classic accounts uses the Admin API. [https://shopify.dev/docs/api/admin-graphql#authentication](Authentication) with this uses an access token. Will need to find a way to ensure that this is secure.