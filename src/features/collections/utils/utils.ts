import {
    ProductCollectionSortKeys,
    ProductFragment,
    ProductSortKeys,
} from '@/gql/storefront/graphql';

import {
    ProductCollectionSortDirection,
    ProductCollectionSortKey,
    ProductCollectionSortKeySchema,
    ProductCollectionSortType,
} from '../types';
import { Product } from '@/features/product/types';
import { getFragmentData } from '@/gql/storefront';
import { collectionFragment } from '@/features/shopify/graphql/storefront/fragments/collection';

export function createProductMetafieldFilter(
    value: string,
    key = 'benefits',
    namespace = 'product'
) {
    return {
        productMetafield: {
            namespace,
            key,
            value,
        },
    };
}

type FilterProductsType = {
    products: Product[];
    collections: string[];
    benefits: string[];
    allCollections: string[];
    allBenefits: string[];
};

export function filterProducts({
    products,
    collections,
    benefits,
    allCollections,
    allBenefits,
}: FilterProductsType) {
    return products.filter((product) => {
        const matchesCollection =
            allCollections.length === collections.length
                ? true
                : collections.length === 0 ||
                  collections.includes('all') ||
                  product.collections.nodes.some((collection) =>
                      collections.includes(collection.title.trim())
                  );

        const matchesBenefits =
            allBenefits.length === benefits.length
                ? true
                : benefits.length === 0 ||
                  benefits.includes('all') ||
                  benefits.some((benefit) =>
                      product.benefits.includes(benefit.trim())
                  );

        return matchesCollection && matchesBenefits;
    });
}

export function filterProductsByCollections(
    products: Product[],
    collections: string[]
) {
    if (collections.length === 0) return products;
    if (collections.includes('all')) return products;
    return products.filter((product) =>
        product.collections.nodes.some((collection) => {
            return collections.includes(collection.title);
        })
    );
}
export function extractSortKeyAndDirection(
    value: string
): [ProductCollectionSortType, ProductCollectionSortDirection] {
    try {
        const sortKey = ProductCollectionSortKeySchema.parse(value);
        const [key, direction] = sortKey.split('-');
        return [
            key as ProductCollectionSortType,
            direction as ProductCollectionSortDirection,
        ];
    } catch (e) {
        return ['title', 'asc'];
    }
}

export function collectionSortKeyToProductSortKey(
    sortKey?: ProductCollectionSortKeys
): ProductSortKeys | undefined {
    if (sortKey === 'COLLECTION_DEFAULT') return undefined;
    if (sortKey === 'CREATED') return 'CREATED_AT';
    if (sortKey === 'MANUAL') return undefined;
    return sortKey;
}

export function sortProducts(
    products: Product[],
    sortKey: ProductCollectionSortKey
) {
    const [sortType, sortDirection] = sortKey.split('-') as [
        ProductCollectionSortType,
        ProductCollectionSortDirection,
    ];
    switch (sortType) {
        case 'popular':
            return products;
        case 'price':
            return products.sort((a, b) => {
                const priceA = a.priceRange.maxVariantPrice.amount;
                const priceB = b.priceRange.maxVariantPrice.amount;
                return sortDirection === 'asc'
                    ? priceA - priceB
                    : priceB - priceA;
            });
        case 'title':
            return products.sort((a, b) => {
                const titleA = a.title;
                const titleB = b.title;
                return sortDirection === 'asc'
                    ? titleA.localeCompare(titleB)
                    : titleB.localeCompare(titleA);
            });
        default:
            return products;
    }
}

/**
 * Handles updating a tag list, with support for the 'all' tag
 * @param allTags Holds all the tags that are available in the collection
 * @param oldTags
 * @param newTags
 * @returns
 */
export function updateTags(
    allTags: string[],
    oldTags: string[],
    newTags: string[] | 'all'
) {
    const allTagsSelected = oldTags.length === allTags.length;
    if (newTags === 'all' || newTags.length === 0) return [...allTags]; // Return all tags if we get all, or if no tags are selected

    const newValueWithoutAll = newTags.filter((v) => v !== 'all');

    if (allTagsSelected && newValueWithoutAll.length < allTags.length)
        newValueWithoutAll;

    if (!allTagsSelected && newTags.includes('all')) return allTags;

    return newValueWithoutAll;
}
