import { graphql } from '@/gql/storefront';
import { productFragment } from '../fragments/product';

export const getProductQuery = graphql(`
    query getProduct($handle: String!) {
        product(handle: $handle) {
            ...Product
        }
    }
`);

export const getProductsQuery = graphql(`
    query getProducts(
        $sortKey: ProductSortKeys
        $reverse: Boolean
        $query: String
    ) {
        products(
            sortKey: $sortKey
            reverse: $reverse
            query: $query
            first: 100
        ) {
            edges {
                node {
                    ...Product
                }
            }
        }
    }
`);

export const getProductRecommendationsQuery = graphql(`
    query getProductRecommendations($productId: ID!) {
        productRecommendations(productId: $productId) {
            ...Product
        }
    }
`);

export const getProductByIdQuery = graphql(`
    query getProductById($id: ID!) {
        product(id: $id) {
            ...Product
        }
    }
`);
