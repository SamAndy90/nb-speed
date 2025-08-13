import { graphql } from '@/gql/storefront';
import { cartFragment } from '../fragments/cart';

export const addToCartMutation = graphql(`
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...Cart
            }
        }
    }
`);

export const createCartMutation = graphql(`
    mutation createCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
            cart {
                ...Cart
            }
            userErrors {
                code
                field
                message
            }
        }
    }
`);

export const editCartItemsMutation = graphql(`
    mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
                ...Cart
            }
            userErrors {
                code
                field
                message
            }
        }
    }
`);

export const removeFromCartMutation = graphql(`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
                ...Cart
            }
            userErrors {
                code
                field
                message
            }
        }
    }
`);

export const updateCartDiscountCodesMutation = graphql(`
    mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
        cartDiscountCodesUpdate(
            cartId: $cartId
            discountCodes: $discountCodes
        ) {
            cart {
                ...Cart
            }
            userErrors {
                code
                field
                message
            }
            warnings {
                code
                message
                target
            }
        }
    }
`);
