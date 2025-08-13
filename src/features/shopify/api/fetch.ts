import 'server-only';
/*
    There are two Shopify APIs, Storefront and Admin
    The storefront API's token can be used on the client side (but isn't so far),
    and any sensitive queries require the customer's token
    The admin API's token should not be leaked to the client side
    So for now all fetches are performed server-side, which is preferable for security reasons
*/

import {
    HIDDEN_PRODUCT_TAG,
    SHOPIFY_ADMIN_GRAPHQL_API_ENDPOINT,
    SHOPIFY_GRAPHQL_API_ENDPOINT,
    SHOPIFY_MENU_MOCK_RESPONSES,
    TAGS,
} from '../consts';
import { isShopifyError } from '@/type-guards';
import { ensureStartsWith } from '@/lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
    Collection,
    Connection,
    Image,
    ShopifyCollection,
    ShopifyProduct,
} from '../types';
import {
    customerAccessTokenCreateMutation,
    customerAccessTokenDeleteMutation,
    customerAccessTokenRenewMutation,
    customerAddressCreate,
    customerAddressDelete,
    customerAddressUpdate,
    customerDefaultAddressUpdate,
    customerRecoverMutation,
    customerResetByUrlMutation,
    customerResetMutation,
    customerUpdateMutation,
} from '../graphql/storefront/mutations/customer';
import { customerCreateMutation } from '../graphql/storefront/mutations/customer';
import {
    customerAddressesQuery,
    customerQuery,
} from '../graphql/storefront/queries/customer';
import {
    CustomerUpdateInput,
    MailingAddressInput,
    MenuItemFragment,
    ProductCollectionSortKeys,
    ProductFilter,
    TypedDocumentString as StorefrontDocumentString,
} from '@/gql/storefront/graphql';
import { TypedDocumentString as AdminDocumentString } from '@/gql/admin/graphql';
import {
    customerOrdersQuery,
    orderQuery,
} from '../graphql/admin/queries/order';
import {
    getCollectionProductsQuery,
    getCollectionQuery,
    getCollectionsQuery,
} from '../graphql/storefront/queries/collection';
import { getMenuQuery } from '../graphql/storefront/queries/menu';

/**
 * Helper functions for fetching data from Shopify's API.
 * TODO: Pros + cons of this VS Apollo VS grql
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
    : '';
const SHOPIFY_STOREFRONT_ENDPOINT = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const SHOPIFY_ADMIN_ENDPOINT = `${domain}${SHOPIFY_ADMIN_GRAPHQL_API_ENDPOINT}`;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
    ? T['variables']
    : never;

type DocumentString<
    Result,
    Variables,
    Admin extends boolean | undefined,
> = Admin extends true
    ? AdminDocumentString<Result, Variables>
    : StorefrontDocumentString<Result, Variables>;

export async function shopifyFetch<
    Result,
    Variables,
    Admin extends boolean | undefined,
>({
    cache = 'force-cache',
    headers,
    endpoint,
    query,
    tags,
    variables,
    admin = false,
    log = false,
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    endpoint?: string;
    query: DocumentString<Result, Variables, Admin>;
    tags?: string[];
    variables?: Variables;
    admin?: Admin;
    log?: boolean;
}): Promise<{ status: number; body: Result } | never> {
    try {
        if (log) {
            console.log("admin???", admin);
            console.log('shopify fetch query', query);
            console.log('shopify fetch variables', variables);
        }
        const result = await fetch(
            endpoint || (admin ? SHOPIFY_ADMIN_ENDPOINT : SHOPIFY_STOREFRONT_ENDPOINT),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    /*NB: Shopify says to use "no-store" for the cache-control header over "no-cache"
                        https://shopify.dev/docs/storefronts/headless/hydrogen/caching#caching-strategies
                        But this is for Oxygen, not the storefront API. There's no caching documentation for the Storefront API, so unclear which will work
                    */
                    'Cache-Control': 'no-cache',
                    ...(admin
                        ? {
                              'X-Shopify-Access-Token':
                                  SHOPIFY_ADMIN_ACCESS_TOKEN,
                          }
                        : {
                              'X-Shopify-Storefront-Access-Token':
                                  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                          }),
                    ...headers,
                },
                body: JSON.stringify({
                    ...(query && { query }),
                    ...(variables && { variables }),
                }),
                cache,
                ...(tags && { next: { tags } }),
            }
        );

        if (log) console.log('shopify fetch request', result);

        const body = await result.json();

        if (log) console.warn('shopify fetch response', body);

        if (body.errors) {
            throw body.errors[0];
        }
        // console.log('Fetch:', variables);
        // console.log('Fetch response:');
        // console.dir(body.data, { depth: null });
        return {
            status: result.status,
            body: body.data,
        };
    } catch (e) {
        console.log({ e });

        if (isShopifyError(e)) {
            throw {
                cause: e.cause?.toString() || 'unknown',
                status: e.status || 500,
                message: e.message,
                // query,
            };
        }

        throw {
            error: e,
            // query,
        };
    }
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
    return array.edges.map((edge) => edge?.node);
};

/*export const reshapeCart = (cart: CartFragment): Cart => {
    if (!cart.cost?.totalTaxAmount) {
        cart.cost.totalTaxAmount = {
            amount: '0.0',
            currencyCode: CurrencyCode.Usd,
        };
    }

    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines),
    };
};*/

const reshapeCollection = (
    collection: ShopifyCollection
): Collection | undefined => {
    if (!collection) {
        return undefined;
    }

    return {
        ...collection,
        path: `/search/${collection.handle}`,
    };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
    const reshapedCollections = [];

    for (const collection of collections) {
        if (collection) {
            const reshapedCollection = reshapeCollection(collection);

            if (reshapedCollection) {
                reshapedCollections.push(reshapedCollection);
            }
        }
    }

    return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
    const flattened = removeEdgesAndNodes(images);

    return flattened.map((image) => {
        const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
        return {
            ...image,
            altText: image.altText || `${productTitle} - ${filename}`,
        };
    });
};

const reshapeProduct = (
    product: ShopifyProduct,
    filterHiddenProducts: boolean = true
) => {
    if (
        !product ||
        (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
    ) {
        return undefined;
    }

    const { images, variants, ...rest } = product;

    return {
        ...rest,
        images: reshapeImages(images, product.title),
        variants: removeEdgesAndNodes(variants),
    };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
    const reshapedProducts = [];

    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product);

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }

    return reshapedProducts;
};
/*
export async function createCart(): Promise<Cart> {
    const res = await shopifyFetch({
        query: createCartMutation,
        cache: 'no-store',
    });

    return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyAddToCartOperation>({
        query: addToCartMutation,
        variables: {
            cartId,
            lines,
        },
        cache: 'no-store',
    });
    return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
    cartId: string,
    lineIds: string[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
        query: removeFromCartMutation,
        variables: {
            cartId,
            lineIds,
        },
        cache: 'no-store',
    });

    return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyUpdateCartOperation>({
        query: editCartItemsMutation,
        variables: {
            cartId,
            lines,
        },
        cache: 'no-store',
    });

    return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(
    cartId: string | undefined
): Promise<Cart | undefined> {
    if (!cartId) {
        return undefined;
    }

    const res = await shopifyFetch<ShopifyCartOperation>({
        query: getCartQuery,
        variables: { cartId },
        tags: [TAGS.cart],
    });

    // Old carts becomes `null` when you checkout.
    if (!res.body.data.cart) {
        return undefined;
    }

    return reshapeCart(res.body.data.cart);
}

export async function getCollection(
    handle: string
): Promise<Collection | undefined> {
    const res = await shopifyFetch<ShopifyCollectionOperation>({
        query: getCollectionQuery,
        tags: [TAGS.collections],
        variables: {
            handle,
        },
    });

    return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
    collection,
    reverse,
    sortKey,
}: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
        query: getCollectionProductsQuery,
        tags: [TAGS.collections, TAGS.products],
        variables: {
            handle: collection,
            reverse,
            sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
        },
    });

    if (!res.body.data.collection) {
        console.log(`No collection found for \`${collection}\``);
        return [];
    }

    return reshapeProducts(
        removeEdgesAndNodes(res.body.data.collection.products)
    );
}

export async function getCollections(): Promise<Collection[]> {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
        query: getCollectionsQuery,
        tags: [TAGS.collections],
    });
    const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
    const collections = [
        {
            handle: '',
            title: 'All',
            description: 'All products',
            seo: {
                title: 'All',
                description: 'All products',
            },
            path: '/search',
            updatedAt: new Date().toISOString(),
        },
        // Filter out the `hidden` collections.
        // Collections that start with `hidden-*` need to be hidden on the search page.
        ...reshapeCollections(shopifyCollections).filter(
            (collection) => !collection.handle.startsWith('hidden')
        ),
    ];

    return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
    const res = await shopifyFetch<ShopifyMenuOperation>({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle,
        },
    });

    return (
        res.body?.data?.menu?.items.map(
            (item: { title: string; url: string }) => ({
                title: item.title,
                path: item.url
                    .replace(domain, '')
                    .replace('/collections', '/search')
                    .replace('/pages', ''),
            })
        ) || []
    );
}

export async function getPage(handle: string): Promise<Page> {
    const res = await shopifyFetch<ShopifyPageOperation>({
        query: getPageQuery,
        cache: 'no-store',
        variables: { handle },
    });

    return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
    const res = await shopifyFetch<ShopifyPagesOperation>({
        query: getPagesQuery,
        cache: 'no-store',
    });

    return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
    const res = await shopifyFetch<ShopifyProductOperation>({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            handle,
        },
    });

    return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
    productId: string
): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
        query: getProductRecommendationsQuery,
        tags: [TAGS.products],
        variables: {
            productId,
        },
    });

    return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
    query,
    reverse,
    sortKey,
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductsOperation>({
        query: getProductsQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey,
        },
    });

    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}*/

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
    // We always need to respond with a 200 status code to Shopify,
    // otherwise it will continue to retry the request.
    const collectionWebhooks = [
        'collections/create',
        'collections/delete',
        'collections/update',
    ];
    const productWebhooks = [
        'products/create',
        'products/delete',
        'products/update',
    ];
    const topic = (await headers()).get('x-shopify-topic') || 'unknown';
    const secret = req.nextUrl.searchParams.get('secret');
    const isCollectionUpdate = collectionWebhooks.includes(topic);
    const isProductUpdate = productWebhooks.includes(topic);

    if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
        console.error('Invalid revalidation secret.');
        return NextResponse.json({ status: 200 });
    }

    if (!isCollectionUpdate && !isProductUpdate) {
        // We don't need to revalidate anything for any other topics.
        return NextResponse.json({ status: 200 });
    }

    if (isCollectionUpdate) {
        revalidateTag(TAGS.collections);
    }

    if (isProductUpdate) {
        revalidateTag(TAGS.products);
    }

    return NextResponse.json({
        status: 200,
        revalidated: true,
        now: Date.now(),
    });
}

export async function createCustomerAccessToken(
    email: string,
    password: string
) {
    const res = await shopifyFetch({
        query: customerAccessTokenCreateMutation,
        variables: {
            email,
            password,
        },
        cache: 'no-store',
    });

    return res.body;
}

export async function renewCustomerAccessToken(customerAccessToken: string) {
    const res = await shopifyFetch({
        query: customerAccessTokenRenewMutation,
        variables: {
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return res;
}

export async function createCustomer(
    firstName: string,
    lastName: string,
    email: string,
    password: string
) {
    const res = await shopifyFetch({
        query: customerCreateMutation,
        variables: {
            input: {
                firstName,
                lastName,
                password,
                email,
            },
        },
        cache: 'no-store',
    });

    return res;
}

export async function fetchCustomer(customerAccessToken: string) {
    const res = await shopifyFetch({
        query: customerQuery,
        variables: {
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return res;
}

/**
 * Requests that a customer be sent a password recovery email.
 * @param email
 * @returns
 */
export async function recoverCustomer(email: string) {
    const res = await shopifyFetch({
        query: customerRecoverMutation,
        variables: {
            email,
        },
        cache: 'no-store',
    });

    return res.body;
}

/**
 * Resets the user password using the reset token sent to their email.
 * @param password The new password
 * @param resetToken The token sent to the customer's email
 * @returns
 */
export async function resetCustomerPassword(
    password: string,
    customerId: string,
    resetToken: string
) {
    const res = await shopifyFetch({
        query: customerResetMutation,
        variables: {
            id: customerId,
            input: {
                password,
                resetToken,
            },
        },
        cache: 'no-store',
    });

    return res;
}

export async function deleteCustomerAccessToken(customerAccessToken: string) {
    const res = await shopifyFetch({
        query: customerAccessTokenDeleteMutation,
        variables: {
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return res;
}
/**
 * Resets the user password using the reset token sent to their email.
 * @param password The new password
 * @param resetUrl The token sent to the customer's email
 * @returns
 */
export async function resetCustomerPasswordByUrl(
    password: string,
    resetUrl: string
) {
    const res = await shopifyFetch({
        query: customerResetByUrlMutation,
        variables: {
            password,
            resetUrl,
        },
        cache: 'no-store',
    });

    return res.body;
}
export async function getOrder(orderId: string) {
    const res = await shopifyFetch({
        query: orderQuery,
        variables: {
            orderId,
        },
        cache: 'no-store',
        admin: true,
    });
    if (!res.body.order) return null;
    return res.body.order;
}
export async function getCustomerOrders(customerId: string) {
    const res = await shopifyFetch({
        query: customerOrdersQuery,
        variables: {
            customerId,
        },
        cache: 'no-store',
        admin: true,
    });
    if (!res.body.customer) return null;
    return removeEdgesAndNodes(res.body.customer.orders);
}

export async function updateCustomer(
    customer: CustomerUpdateInput,
    customerAccessToken: string
) {
    const { status, body } = await shopifyFetch({
        query: customerUpdateMutation,
        variables: {
            customer,
            customerAccessToken,
        },
    });

    return body.customerUpdate;
}

export async function getCustomerAddresses(customerAccessToken: string) {
    const { status, body } = await shopifyFetch({
        query: customerAddressesQuery,
        variables: {
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return body.customer;
}

export async function updateCustomerAddress(
    addressId: string,
    address: CustomerUpdateInput,
    customerAccessToken: string
) {
    const { status, body } = await shopifyFetch({
        query: customerAddressUpdate,
        variables: {
            id: addressId,
            address,
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return body.customerAddressUpdate;
}
export async function updateCustomerDefaultAddress(
    addressId: string,
    customerAccessToken: string
) {
    const { status, body } = await shopifyFetch({
        query: customerDefaultAddressUpdate,
        variables: {
            addressId,
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return body.customerDefaultAddressUpdate;
}

export async function deleteCustomerAddress(
    addressId: string,
    customerAccessToken: string
) {
    const { status, body } = await shopifyFetch({
        query: customerAddressDelete,
        variables: {
            addressId,
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return body.customerAddressDelete;
}

export async function createCustomerAddress(
    address: MailingAddressInput,
    customerAccessToken: string
) {
    const { status, body } = await shopifyFetch({
        query: customerAddressCreate,
        variables: {
            address,
            customerAccessToken,
        },
        cache: 'no-store',
    });

    return body.customerAddressCreate;
}

/**
 * Retrieves a menu from the Shopify API.
 * These currently aren't defined in Shopify, so now for now just return a mock response
 * @param handle The menu to retrieve
 * @returns
 */
export async function getMenu(
    handle: string
): Promise<MenuItemFragment[] | null | undefined> {
    const NODE_ENV = process.env.NODE_ENV ?? 'development';
    if (NODE_ENV === 'development' || true)
        //Always true for now
        return SHOPIFY_MENU_MOCK_RESPONSES[
            handle as keyof typeof SHOPIFY_MENU_MOCK_RESPONSES
        ];
    const { status, body } = await shopifyFetch({
        query: getMenuQuery,
        variables: { handle },
    });

    // @ts-expect-error Since we're just returning a mock menu
    return body.menu;
}
