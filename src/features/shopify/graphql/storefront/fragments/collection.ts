import { graphql } from '@/gql/storefront';

export const collectionFragment = graphql(`
    fragment Collection on Collection {
        handle
        title
        description
        descriptionHtml
        seo {
            ...Seo
        }
        image {
            ...Image
        }
        updatedAt
        products(first: 100) {
            edges {
                node {
                    ...Product
                }
            }
        }
    }
`);
