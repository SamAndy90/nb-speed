import { graphql } from '@/gql/storefront';

export const getCartQuery = graphql(`
    query getCart($cartId: ID!) {
        cart(id: $cartId) {
            ...Cart
        }
    }
`);
