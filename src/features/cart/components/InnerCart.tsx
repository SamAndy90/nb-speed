'use client';
import { Button } from '@/components/ui/button';
import {
    SheetContent,
    SheetClose,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet';
import { cn, currencyFormatter } from '@/lib/utils';

import { ComponentProps, useEffect } from 'react';
import { createCartAction } from '../actions';
import { useCart } from '../context/cart';
import { CartItem } from './CartItem';
import { DiscountCodeBadge } from './DiscountCodeBadge';
import { DiscountCodeForm } from './DiscountCodeForm';
import { FreeShippingBar } from './FreeShippingBar';
import { RewardsProgressBar } from './RewardsProgressBar';

import Lock from '@/assets/icons/lock.svg';
import Close from '@/assets/icons/close.svg';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { PrimaryButton } from '@/components/PrimaryButton';

/**
 * Wrapper around the Cart context that creates a cart if one doesn't exist.
 */
function useCreateCart() {
    const context = useCart();
    useEffect(() => {
        if (!context.cart) {
            createCartAction().then((res) => console.log('Cart created:', res));
        }
    }, [context.cart]);
    return context;
}

/**
 * Displays the subtotal of the cart, including the total quantity of items and total price.
 */
function CartSubtotal({
    amount,
    quantity = 0,
}: {
    amount: any;
    quantity?: number;
}) {
    const subtotal = currencyFormatter.format(amount ?? 0);
    return (
        <div className="flex w-full flex-row justify-between px-6 text-sm">
            <div>Subtotal ({quantity})</div>
            <div>{subtotal}</div>
        </div>
    );
}

/**
 * Displays a discount code input form, and a list of valid discount codes.
 */
function CartDiscountCodeInput({
    codes,
    addCode,
}: {
    codes: { code: string; applicable: boolean }[];
    addCode: (code: string) => void;
}) {
    const validDiscountCodes =
        codes.filter(({ applicable }) => applicable) ?? [];

    return (
        <div className="space-y-4 px-5">
            <DiscountCodeForm optimisticUpdate={addCode} />
            {validDiscountCodes && validDiscountCodes.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                    {validDiscountCodes.map(({ code }, i) => (
                        <DiscountCodeBadge key={`discount-code-badge-${i}`} code={code} />
                    ))}
                </ul>
            )}
        </div>
    );
}

/**
 * Button that links to the checkout page.
 */
function CheckoutButton({ href }: ComponentProps<typeof Link>) {
    return (
        <PrimaryButton
            type="submit"
            className="relative h-[46px] w-full flex-row items-center justify-center"
            as={Link}
            href={href}>
            <Lock /> Checkout
        </PrimaryButton>
    );
}

/**
 * Cart contents displayed in the sheet when clicking the shopping cart icon in the header.
 * Includes some spacing differences, and uses Sheet components such as SheetContent and SheetClose.
 */
export function InnerSheetCart() {
    const { cart, addCode } = useCreateCart();

    return (
        <SheetContent
            className="z-50 flex flex-col px-0 pb-0 pt-[65px] font-bold outline-none md:pt-[60px]"
            overlay>
            <div className="absolute top-6 flex w-full justify-end px-5">
                <SheetClose asChild>
                    <Button
                        className="size-6 flex-row items-center justify-center p-0 px-0"
                        size="inline"
                        variant="ghost">
                        <Close className="size-4" />
                    </Button>
                </SheetClose>
            </div>

            <SheetHeader className="space-y-5 px-5">
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                    Free Shipping when you spend over £40 now
                </SheetDescription>
            </SheetHeader>

            <RewardsProgressBar />

            <div className="-mb-8 h-full gap-8 flex flex-col justify-between overflow-auto pb-8">
                <div className="space-y-8">
                    <div className="px-5">
                        <Separator />
                    </div>
                    {cart?.lines && cart.lines.length > 0 && (
                        <>
                            <ul className="flex flex-col gap-4">
                                {cart?.lines.map((line, i) => (
                                    <li
                                        key={line.id}
                                        className={cn('px-5 pb-8', {
                                            'pb-0': i + 1 === cart.lines.length,
                                        })}>
                                        <CartItem
                                            lineItem={line}
                                            showSubscription
                                            showRecommendation={
                                                i + 1 === cart.lines.length
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                <div className="space-y-8">
                    <CartDiscountCodeInput
                        codes={cart?.discountCodes ?? []}
                        addCode={addCode}
                    />
                    <FreeShippingBar />
                </div>
            </div>

            <SheetFooter
                className="inset-x-0 bottom-0 z-10 flex w-full flex-col items-center justify-center gap-3.5 bg-base-50 px-5 pb-5 pt-4"
                style={{
                    boxShadow: '0px -3px 25.1px 0px rgba(118, 118, 118, 0.25)',
                }}>
                <CartSubtotal
                    amount={cart?.cost.subtotalAmount.amount}
                    quantity={cart?.totalQuantity}
                />
                <CheckoutButton href={cart?.checkoutUrl ?? ''} />
            </SheetFooter>
        </SheetContent>
    );
}

/**
 * Cart contents displayed in the main cart page.
 */
export function InnerCart() {
    const { cart, addCode, removeCode } = useCreateCart();

    return (
        <div className="flex h-full w-full max-w-screen-md flex-col gap-8 px-0 text-center font-bold">
            <header className="space-y-2 px-8">
                <h1 className="text-center font-medium">Your Cart</h1>
                <Separator />
                <p>Free Shipping when you spend over £40 now</p>
                <Separator />
            </header>
            <RewardsProgressBar />

            <ul className="flex flex-col gap-4 overflow-y-scroll px-0 pb-40">
                {cart?.lines.map((line, i) => (
                    <li key={line.id} className="px-8 pb-8">
                        <CartItem
                            lineItem={line}
                            showRecommendation={i === 0}
                            showSubscription={i === 0}
                        />
                    </li>
                ))}
                <CartDiscountCodeInput
                    codes={cart?.discountCodes ?? []}
                    addCode={addCode}
                />
                <FreeShippingBar className="md:rounded-full" />
            </ul>

            <footer
                className="fixed inset-x-0 bottom-0 z-10 flex w-full flex-col items-center justify-center gap-3.5 bg-base-50 px-page-mobile pb-5 pt-4 md:px-page-desktop"
                style={{
                    boxShadow: '0px -3px 25.1px 0px rgba(118, 118, 118, 0.25)',
                }}>
                <CartSubtotal
                    amount={cart?.cost.subtotalAmount.amount}
                    quantity={cart?.totalQuantity}
                />

                <CheckoutButton href={cart?.checkoutUrl ?? ''} />
            </footer>
        </div>
    );
}
