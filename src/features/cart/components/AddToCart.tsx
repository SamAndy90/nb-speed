'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import React from 'react';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { useAddProduct } from '../hooks/useAddProduct';
import { Product } from '@/features/product/types';
import { PrimaryButton } from '@/components/v2/PrimaryButton';
import { usePathname } from 'next/navigation';
import { useVariantProduct } from '@/features/product/VariantProductProvider';

/**
 * Submit button that adds a product to the cart.
 */
export const AddToCartButton = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & { product: Product }
>(({ product, ...props }, ref) => {
    const { addCartItemAction } = useAddProduct(product);
    return (
        <form action={addCartItemAction}>
            <Button ref={ref} {...props}>
                Add to Cart
            </Button>
        </form>
    );
});

AddToCartButton.displayName = 'AddToCartButton';

export const InnerAddToCartButton = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & { product: Product }
>(({ product, ...props }, ref) => {
    const { addCartItemActionInsideTheCart } = useAddProduct(product);
    return (
        <form action={addCartItemActionInsideTheCart}>
            <Button ref={ref} {...props}>
                Add to Cart
            </Button>
        </form>
    );
});

AddToCartButton.displayName = 'InnerAddToCartButton';

/**
 * Submit button that adds a product to the cart.
 */
export const ReorderButton = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & { product: Product }
>(({ product, ...props }, ref) => {
    const { addCartItemAction } = useAddProduct(product);
    return (
        <form action={addCartItemAction}>
            <Button ref={ref} {...props}>
                Reorder
            </Button>
        </form>
    );
});
ReorderButton.displayName = 'ReorderButton';

export const PrimaryAddToCartButton = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & { product: Product; sellingPlanId?: string }
>(({ product, sellingPlanId, ...props }, ref) => {
    const pathname = usePathname();
    const { variant } = useVariantProduct();
    const { addCartItemAction, addSubscriptionCartItemAction } = useAddProduct(
        product,
        { isHydration: pathname.includes('hydration'), variantId: variant.id }
    );

    const handleAction = () => {
        try {
            if (sellingPlanId) {
                addSubscriptionCartItemAction(sellingPlanId);
            } else {
                addCartItemAction();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form action={handleAction}>
            <PrimaryButton
                className="relative h-[42px] w-full flex-row items-center justify-center p-6"
                ref={ref}>
                <div className="flex w-full items-center justify-center">
                    Add to Cart
                </div>
            </PrimaryButton>
        </form>
    );
});

PrimaryAddToCartButton.displayName = 'PrimaryAddToCartButton';

export const QuickAddToCartButton = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & { product: Product }
>(({ product, ...props }, ref) => {
    const { addCartItemAction } = useAddProduct(product);
    return (
        <form action={addCartItemAction}>
            <Button
                className="relative w-full flex-row items-center justify-center p-6"
                ref={ref}>
                Quick Add
                <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-gradient-2 transition-all">
                    <ChevronRight className="h-4 w-4" />
                </div>
            </Button>
        </form>
    );
});

QuickAddToCartButton.displayName = 'QuickAddToCartButton';
