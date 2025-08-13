import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { getProductQuery } from './graphql/storefront/queries/product';
import { ShopifyProduct } from './types';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;

/**
 * Original method using Shopify storefront API
 * Unused in the project currently, will remove in the future
 */
export const client = createClient();
function createClient() {
    if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || !SHOPIFY_STORE_DOMAIN) {
        throw new Error('Missing required environment variables');
    }

    try {
        const client = createStorefrontApiClient({
            storeDomain: SHOPIFY_STORE_DOMAIN,
            apiVersion: '2024-07',
            publicAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        });

        return client;
    } catch (error) {
        console.error('Error initializing Shopify API:', error);
        throw new Error('Failed to initialize Shopify API');
    }
}
