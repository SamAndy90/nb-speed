import {
    ProductCollectionSortKeys,
    ProductFilter,
} from '@/gql/storefront/graphql';
import { shopifyFetch } from './fetch';
import {
    getCollectionsQuery,
    getCollectionQuery,
    getCollectionProductsQuery,
} from '../graphql/storefront/queries/collection';
import { getProductsQuery } from '../graphql/storefront/queries/product';

/**
 * Retrieves all collections from the Shopify store.
 * @returns
 */
export async function getCollections() {
    const { status, body } = await shopifyFetch({
        query: getCollectionsQuery,
        variables: {},
        cache: 'no-cache',
    });
    
    return body.collections;
}

/**
 * Retrieves a collection by its handle.
 * @param handle The handle of the collection to retrieve
 * @returns
 */
export async function getCollectionByHandle(handle: string) {
    const { status, body } = await shopifyFetch({
        query: getCollectionQuery,
        variables: { handle },
        cache: 'no-cache',
    });

    return body.collection;
}

/**
 * Retrieves all products in a collection by its handle.
 * @param handle The handle of the collection to retrieve products from
 * @returns
 */
export async function getCollectionProductsByHandle(
    handle: string,
    sortKey?: ProductCollectionSortKeys,
    reverse: boolean = false,
    filters: ProductFilter[] = []
) {
    const { status, body } = await shopifyFetch({
        query: getCollectionProductsQuery,
        variables: { handle, sortKey, reverse, filters },
        cache: 'no-cache',
    });

    return body.collection?.products;
}
