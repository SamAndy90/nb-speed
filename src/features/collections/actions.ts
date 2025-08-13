'use server';
import { getFragmentData } from '@/gql/storefront';

import { ActionResult } from '@/types';
import {
    CollectionFragment,
    ProductFilter,
    ProductFragment,
} from '@/gql/storefront/graphql';
import { productFragment } from '../shopify/graphql/storefront/fragments/product';

import { sortKeyMap } from '@/features/collections/consts';
import { collectionFragment } from '../shopify/graphql/storefront/fragments/collection';
import {
    collectionSortKeyToProductSortKey,
    createProductMetafieldFilter,
    extractSortKeyAndDirection,
    filterProducts,
    filterProductsByCollections,
} from './utils/utils';
import { Product } from '../product/types';
import { parseProduct } from '../product/utils';
import {
    getCollectionByHandle,
    getCollectionProductsByHandle,
} from '../shopify/api/collection';
import { getProducts } from '../shopify/api/product';
import { BEST_SELLING_PRODUCTS } from '@/consts';

type CollectionProductsActionResult = ActionResult<Product[]>;

export async function getCollectionProductsByHandleAction(
    handle: string,
    sortKey?: string,
    benefitFilters: string[] = [],
    allBenefits: string[] = [],
    collectionFilters: string[] = [],
    allCollections: string[] = []
): Promise<CollectionProductsActionResult> {
    const [sortType, sortDirection] = extractSortKeyAndDirection(sortKey ?? '');
    const sortKeyVariable = sortKeyMap[sortType];
    const reverse = sortDirection === 'desc';

    const benefitMetafieldFilters: ProductFilter[] = benefitFilters.includes(
        'all'
    )
        ? []
        : allBenefits.every((b) => benefitFilters.includes(b))
          ? []
          : benefitFilters.map((benefit) =>
                createProductMetafieldFilter(benefit)
            );

    try {
        if (handle === 'all-products') {
            const productSortKey =
                collectionSortKeyToProductSortKey(sortKeyVariable);
            const productsData = await getProducts(productSortKey, reverse);

            return {
                success: true,
                data: filterProducts({
                    products: productsData,
                    collections: collectionFilters,
                    benefits: benefitFilters,
                    allCollections,
                    allBenefits,
                }),
            };
        }

        if (handle === 'best_sellers') {
            const productSortKey =
                collectionSortKeyToProductSortKey(sortKeyVariable);
            const productsData = await getProducts(productSortKey, reverse);

            function filterByBestSellers(array: Product[]) {
                return array.filter((p: Product) =>
                    BEST_SELLING_PRODUCTS.includes(p.handle)
                );
            }

            return {
                success: true,
                data: filterProducts({
                    products: filterByBestSellers(productsData),
                    collections: collectionFilters,
                    benefits: benefitFilters,
                    allCollections,
                    allBenefits,
                }),
            };
        }

        const collectionsData = await getCollectionProductsByHandle(
            handle,
            sortKeyVariable,
            reverse,
            benefitMetafieldFilters
        ).then((res) => {
            if (!res?.edges) return [];
            return res.edges.map((e) =>
                parseProduct(getFragmentData(productFragment, e.node))
            );
        });
        //TODO: Can we do this on the GraphQL side?
        return {
            success: true,
            data: filterProductsByCollections(
                collectionsData,
                collectionFilters
            ),
        };
    } catch (e) {
        return { success: false, error: 'Fetching collection failed' };
    }
}

export async function getCollectionByHandleAction(
    handle: string
): Promise<ActionResult<CollectionFragment>> {
    try {
        const res = await getCollectionByHandle(handle);
        const data = getFragmentData(collectionFragment, res);
        if (data) return { success: true, data };
    } catch (e) {
        console.error('Failed to fetch collection:', e);
        return { success: false, error: e as string };
    }
    return { success: false, error: 'An unknown error occured' };
}
