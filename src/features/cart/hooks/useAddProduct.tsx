import { useCallback } from 'react';
import { toast } from 'sonner';
import { addItemToCartAction } from '../actions';
import { ITEM_ADDED_TO_CART_TOAST_MESSAGE } from '../consts';
import { useCart } from '../context/cart';
import { Product } from '@/features/product/types';

export function useAddProduct(
    product: Product,
    options?: {
        isHydration?: boolean;
        variantId?: string;
    }
) {
    const { cart, addCartItem } = useCart();
    const { variants } = product;
    const variant = options?.isHydration
        ? variants.find((v) => v.id === options.variantId)!
        : variants[0];

    const addCartItemAction = useCallback(async () => {
        addCartItem(variant, product);
        toast.success(ITEM_ADDED_TO_CART_TOAST_MESSAGE, {
            className: 'top-8',
        });

        const response = await addItemToCartAction(variant.id);
        if (!response.success) {
            toast.error(response.error);
        }
    }, [addCartItem, variant, cart, product]);

    const addCartItemActionInsideTheCart = useCallback(async () => {
        addCartItem(variant, product);

        const response = await addItemToCartAction(variant.id);
        if (!response.success) {
            toast.error(response.error);
        }
    }, [addCartItem, variant, cart, product]);

    const addSubscriptionCartItemAction = useCallback(
        async (sellingPlanId: string) => {
            addCartItem(variant, product, sellingPlanId);
            toast.success(ITEM_ADDED_TO_CART_TOAST_MESSAGE, {
                className: 'top-8',
            });

            const response = await addItemToCartAction(
                variant.id,
                sellingPlanId
            );
            if (!response.success) {
                toast.error(response.error);
            }
        },
        [variant, cart, product]
    );

    return {
        addSubscriptionCartItemAction,
        addCartItemAction,
        addCartItemActionInsideTheCart,
    };
}

/*export function useAddProducts(
    productsQuantities: { product: Product[]; quantity: number }[]
) {
    const { addCartItem } = useCart();
    const [message, formAction] = useFormState(addItemToCartAction, null);
    const { variants, availableForSale } = product;
    const variant = variants[0];
    const actionWithVariant = formAction.bind(null, variant.id);
    const addCartItemAction = useCallback(async () => {
        addCartItem(variant, product);
        await actionWithVariant();
        toast.success(ITEM_ADDED_TO_CART_TOAST_MESSAGE);
    }, [addCartItem, variant, product, actionWithVariant]);
    return { message, addCartItemAction };
}*/
