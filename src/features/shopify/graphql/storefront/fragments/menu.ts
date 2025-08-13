import { graphql } from '@/gql/storefront';

export const menuItemFragment = graphql(`
    fragment MenuItem on MenuItem {
        title
        url
        items {
            title
            url
            items {
                title
                url
            }
        }
    }
`);
