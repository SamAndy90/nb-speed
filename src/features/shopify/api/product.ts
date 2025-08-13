import { parseProduct } from '@/features/product/utils';
import { getCollectionsQuery } from '../graphql/storefront/queries/collection';
import {
    getProductByIdQuery,
    getProductQuery,
    getProductRecommendationsQuery,
    getProductsQuery,
} from '../graphql/storefront/queries/product';
import { shopifyFetch } from './fetch';
import { getFragmentData } from '@/gql/storefront';
import { productFragment } from '../graphql/storefront/fragments/product';
import { ProductSortKeys } from '@/gql/storefront/graphql';

export async function getProductByHandle(handle: string, cache?: RequestCache) {
    const { status, body } = await shopifyFetch({
        query: getProductQuery,
        variables: { handle },
        cache,
    });

    const fragmentData = getFragmentData(productFragment, body.product);
    if (!fragmentData) return null;
    return parseProduct(fragmentData);
}

export async function getProducts(
    sortKey?: ProductSortKeys,
    reverse?: boolean
) {
    const { body } = await shopifyFetch({
        query: getProductsQuery,
        variables: { sortKey, reverse },
    });

    return body.products.edges.map((edge) =>
        parseProduct(getFragmentData(productFragment, edge.node))
    );
}

export async function getProductRecommendations(productId: string) {
    const { status, body } = await shopifyFetch({
        query: getProductRecommendationsQuery,
        variables: { productId },
    });
    if (!body.productRecommendations) return null;
    const fragmentData = body.productRecommendations.map((p) =>
        getFragmentData(productFragment, p)
    );

    return fragmentData.map(parseProduct);
}

export async function getProductById(externalProductId: string) {
    const globalId = `gid://shopify/Product/${externalProductId}`;

    const { status, body } = await shopifyFetch({
        query: getProductByIdQuery,
        variables: { id: globalId },
    });

    if (!body?.product) return null;

    const fragmentData = getFragmentData(productFragment, body.product);
    if (!fragmentData) return null;

    return parseProduct(fragmentData);
}
