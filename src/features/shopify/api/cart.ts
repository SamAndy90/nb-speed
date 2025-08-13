import 'server-only';
import { TAGS } from '../consts';
import { getCartQuery } from '../graphql/storefront/queries/cart';
import { shopifyFetch } from './fetch';
import {
    addToCartMutation,
    createCartMutation,
    editCartItemsMutation,
    removeFromCartMutation,
    updateCartDiscountCodesMutation,
} from '../graphql/storefront/mutations/cart';
import { AttributeInput, InputMaybe } from '@/gql/storefront/graphql';
import { cache } from 'react';
import { data } from 'tailwindcss/defaultTheme';
import {
    Cart,
    ShopifyRemoveFromCartOperation,
    ShopifyUpdateCartOperation,
} from '../types';

export async function getCart(cartId: string | undefined) {
    if (!cartId) {
        return undefined;
    }

    const res = await shopifyFetch({
        query: getCartQuery,
        variables: { cartId },
        tags: [TAGS.cart],
    });

    // Old carts becomes `null` when you checkout.

    return res.body;
}

export async function createCart() {
    const { body } = await shopifyFetch({
        query: createCartMutation,
        tags: [TAGS.cart],
    });
    if (!body.cartCreate) {
        throw new Error('Failed to create cart');
    }
    return body.cartCreate;
}

export async function addLinesToCart(
    cartId: string,
    lines: {
        merchandiseId: string;
        quantity: number;
        sellingPlanId?: string;
        attributes?: InputMaybe<Array<AttributeInput>>;
    }[]
) {
    const { body } = await shopifyFetch({
        query: addToCartMutation,
        variables: { cartId, lines },
        cache: 'no-store',
    });
    if (!body.cartLinesAdd) {
        throw new Error('Failed to add lines to cart');
    }
    return body.cartLinesAdd;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
    const res = await shopifyFetch({
        query: removeFromCartMutation,
        variables: {
            cartId,
            lineIds,
        },
        cache: 'no-store',
    });

    return res.body.cartLinesRemove;
}

export async function updateCart(
    cartId: string,
    lines: {
        id: string;
        merchandiseId: string;
        quantity: number;
        sellingPlanId?: string | null;
    }[]
) {
    const res = await shopifyFetch({
        query: editCartItemsMutation,
        variables: {
            cartId,
            lines,
        },
        cache: 'no-store',
    });

    return res.body.cartLinesUpdate;
}

export async function updateCartDiscountCodes(
    cartId: string,
    discountCodes: string[]
) {
    const res = await shopifyFetch({
        query: updateCartDiscountCodesMutation,
        variables: {
            cartId,
            discountCodes,
        },
        cache: 'no-store',
    });

    return res.body.cartDiscountCodesUpdate;
}
