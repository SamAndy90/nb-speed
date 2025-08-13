'use server';

import { cookies } from 'next/headers';
import {
    addLinesToCart,
    createCart,
    getCart,
    removeFromCart,
    updateCart,
    updateCartDiscountCodes,
} from '../shopify/api/cart';
import { getFragmentData } from '@/gql/storefront';
import { cartFragment } from '../shopify/graphql/storefront/fragments/cart';
import { TAGS } from '@/consts';
import { revalidateTag } from 'next/cache';
import { reshapeCart } from '../shopify/utils';
import { Cart } from '../shopify/types';

import { ActionResult } from '@/types';
import { getProductRecommendations } from '../shopify/api/product';

export async function getCartId() {
    return (await cookies()).get('cartId')?.value;
}

export type CartAction = ActionResult<Cart>;
export async function getCurrentCartAction(): Promise<CartAction> {
    const cartId = await getCartId();
    if (!cartId) return { success: false, error: 'No cart Id found' };
    const resData = await getCart(cartId);
    if (!resData) return { success: false, error: 'No response received' };
    const cart = getFragmentData(cartFragment, resData.cart);
    if (!cart) return { success: false, error: 'No cart received' };
    return { success: true, data: reshapeCart(cart) };
}

export async function createCartAction(): Promise<CartAction> {
    const resData = await createCart();
    if (!resData) return { success: false, error: 'Failed to create cart' };
    const cart = getFragmentData(cartFragment, resData.cart);
    if (!cart) return { success: false, error: 'Failed to create cart' };
    (await cookies()).set('cartId', cart.id);
    return { success: true, data: reshapeCart(cart) };
}

export async function updateCartDiscountCodesAction(
    prevState: unknown,
    discountCodes: string[] | null
): Promise<CartAction | null> {
    if (!discountCodes) return null;
    const cartId = await getCartId();
    if (!cartId) return { success: false, error: 'No cart Id found' };
    try {
        const resData = await updateCartDiscountCodes(cartId, discountCodes);
        if (!resData) return { success: false, error: 'No response received' };
        const cart = getFragmentData(cartFragment, resData.cart);
        if (!cart) return { success: false, error: 'No cart received' };
        revalidateTag(TAGS.cart);

        return { success: true, data: reshapeCart(cart) };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Error adding discount code' };
    }
}

export async function addItemToCartAction(
    selectedVariantId: string | undefined,
    sellingPlanId?: string
): Promise<ActionResult> {
    let cartId = (await cookies()).get('cartId')?.value;

    if (!cartId || !selectedVariantId) {
        return { success: false, error: 'No cart Id or variant Id found' };
    }

    try {
        await addLinesToCart(cartId, [
            { merchandiseId: selectedVariantId, quantity: 1, sellingPlanId },
        ]);
        revalidateTag(TAGS.cart);
        return { success: true };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Error adding item to cart' };
    }
}

export async function addItemsToCart(
    items: { merchandiseId: string; quantity: number }[]
): Promise<ActionResult> {
    let cartId = (await cookies()).get('cartId')?.value;

    if (!cartId) {
        return { success: false, error: 'No cart id found' };
    }

    try {
        await addLinesToCart(cartId, items);
        revalidateTag(TAGS.cart);
        return { success: true };
    } catch (e) {
        return { success: false, error: 'Error adding items to cart' };
    }
}

export async function updateCartItemPlan(
    prevState: unknown,
    payload: {
        id: string;
        merchandiseId: string;
        quantity: number;
        sellingPlanId?: string | null;
    }
) {
    let cartId = (await cookies()).get('cartId')?.value;

    if (!cartId) {
        return { success: false, error: 'No cart Id found' };
    }

    const { id, merchandiseId, quantity, sellingPlanId } = payload;

    try {
        const cart = await getCart(cartId);
        if (!cart) {
            return { success: false, error: 'No cart received' };
        }
        const cartData = getFragmentData(cartFragment, cart.cart);
        if (!cartData) return { success: false, error: 'No cart received' };

        const lineItem = cartData.lines.edges.find(
            (line) => line.node.id === id
        );

        if (!lineItem) return;

        await updateCart(cartId, [
            {
                id: lineItem.node.id,
                merchandiseId,
                quantity,
                sellingPlanId: sellingPlanId,
            },
        ]);

        revalidateTag(TAGS.cart);
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Error updating item quantity' };
    }
}

export async function updateItemQuantity(
    prevState: unknown,
    payload: {
        id: string;
        merchandiseId: string;
        quantity: number;
    }
) {
    let cartId = (await cookies()).get('cartId')?.value;

    if (!cartId) {
        return { success: false, error: 'No cart Id found' };
    }

    const { merchandiseId, quantity, id } = payload;

    try {
        const cart = await getCart(cartId);

        if (!cart) {
            return { success: false, error: 'No cart received' };
        }

        const cartData = getFragmentData(cartFragment, cart.cart);
        if (!cartData) return { success: false, error: 'No cart received' };

        const lineItem = cartData.lines.edges.find((line) => {
            return line.node.id === id;
        });

        if (!lineItem) return;

        if (quantity === 0) {
            await removeFromCart(cartId, [lineItem.node.id]);
        } else {
            await updateCart(cartId, [
                {
                    id: lineItem.node.id,
                    merchandiseId,
                    quantity,
                    ...(lineItem.node.sellingPlanAllocation && {
                        sellingPlanId:
                            lineItem.node.sellingPlanAllocation.sellingPlan.id,
                    }),
                },
            ]);
        }
        revalidateTag(TAGS.cart);
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Error updating item quantity' };
    }
}

export async function getProductRecommendationsAction(productId: string) {
    try {
        const resData = await getProductRecommendations(productId);
        if (!resData) return { success: false, error: 'No response received' };
        return {
            success: true,
            data: resData,
        };
    } catch (e) {
        return {
            success: false,
            error: 'Error fetching product recommendations',
        };
    }
}

// export async function addItemsToCartAction(
//     prevState: unknown,
//     items: { merchandiseId: string; quantity: number }[]
// ): Promise<ActionResult> {
//     let cartId = (await cookies()).get('cartId')?.value;

//     if (!cartId) {
//         return { success: false, error: 'No cart id found' };
//     }

//     try {
//         await addLinesToCart(cartId, items);
//         revalidateTag(TAGS.cart);
//         return { success: true };
//     } catch (e) {
//         return { success: false, error: 'Error adding items to cart' };
//     }
// }
