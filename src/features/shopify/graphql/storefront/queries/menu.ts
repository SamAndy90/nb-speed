import { graphql } from '@/gql/storefront';

export const getMenuQuery = graphql(`
    query getMenu($handle: String!) {
        menu(handle: $handle) {
            items {
                ...MenuItem
            }
        }
    }
`);
