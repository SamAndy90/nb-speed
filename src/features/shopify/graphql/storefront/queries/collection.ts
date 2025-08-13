import { graphql } from '@/gql/storefront';

export const getCollectionQuery = graphql(`
    query getCollection($handle: String!) {
        collection(handle: $handle) {
            ...Collection
        }
    }
`);

export const getCollectionsQuery = graphql(`
    query getCollections {
        collections(first: 100, sortKey: TITLE) {
            edges {
                node {
                    ...Collection
                }
            }
        }
    }
`);

export const getCollectionProductsQuery = graphql(`
    query getCollectionProducts(
        $handle: String!
        $sortKey: ProductCollectionSortKeys
        $reverse: Boolean
        $filters: [ProductFilter!]
    ) {
        collection(handle: $handle) {
            products(
                sortKey: $sortKey
                reverse: $reverse
                first: 100
                filters: $filters
            ) {
                edges {
                    node {
                        ...Product
                    }
                }
            }
        }
    }
`);
