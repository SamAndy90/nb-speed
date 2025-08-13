'use client';
import { Button } from '@/components/ui/button';
import { cn, FREE_SHIPPING_PRICE } from '@/lib/utils';

import { useEffect } from 'react';
import { createCartAction } from '../../actions';
import { useCart } from '../../context/cart';
import { CartItem } from '../CartItem';
import { FreeShippingBar } from '../FreeShippingBar';
import { RewardsProgressBar } from '../RewardsProgressBar';

import Close from '@/assets/icons/close.svg';
import { Separator } from '@/components/ui/separator';
import CheckoutButton from './CheckoutButton';
import CartSubtotal from './CartSubtotal';
import CartDiscountCodeInput from './CartDiscountCodeInput';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Wrapper around the Cart context that creates a cart if one doesn't exist.
 */
export function useCreateCart() {
    const context = useCart();
    useEffect(() => {
        if (!context.cart) {
            createCartAction().then((res) => console.log('Cart created:', res));
        }
    }, [context.cart]);
    return context;
}

/**
 * Cart contents displayed in the sheet when clicking the shopping cart icon in the header.
 * Includes some spacing differences, and uses Sheet components such as SheetContent and SheetClose.
 */
export function InnerSheetCart({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const { cart, addCode } = useCreateCart();
    const desktop = useMediaQuery('lg');

    return (
        <>
            <AnimatePresence mode="wait">
                {open && (
                    <motion.div
                        initial={{
                            height: desktop ? '100vh' : 0,
                            transform: desktop ? 'translateX(100%)' : 'none',
                        }}
                        animate={{
                            height: '100vh',
                            transform: desktop ? 'translateX(0)' : 'none',
                        }}
                        exit={{
                            height: desktop ? '100vh' : 0,
                            transform: desktop ? 'translateX(100%)' : 'none',
                        }}
                        transition={{
                            height: {
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1],
                            },
                        }}
                        className="fixed right-0 top-0 z-50 w-full max-w-[500px] bg-primary-white">
                        <motion.div
                            initial={{
                                opacity: desktop ? 1 : 0,
                                y: desktop ? 0 : 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.3,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.2,
                                },
                            }}
                            exit={{
                                opacity: desktop ? 1 : 0,
                                transform: desktop
                                    ? 'translateX(100%)'
                                    : 'none',
                                y: desktop ? 0 : -5,
                                transition: {
                                    duration: 0.3,
                                    ease: 'easeIn',
                                },
                            }}
                            className="flex h-[100dvh] flex-col gap-8 px-0 pb-0 pt-[65px] font-bold outline-none md:pt-[60px]">
                            <div className="absolute top-6 flex w-full justify-end px-5">
                                <Button
                                    className="size-6 flex-row p-0 px-0"
                                    size="inline"
                                    variant="ghost"
                                    onClick={onClose}>
                                    <Close className="size-4" />
                                </Button>
                            </div>

                            <div className="space-y-5 px-5">
                                <div className="text-center text-paragraph-2 font-bold lg:text-paragraph-0 lg:font-bold">
                                    Your Cart
                                </div>
                                <div className="space-y-2">
                                    <Separator />
                                    <p className="text-center text-paragraph-5 font-bold lg:text-paragraph-4 lg:font-bold">
                                        {`Free Shipping when you spend over £${FREE_SHIPPING_PRICE}
                                        now`}
                                    </p>
                                    <Separator />
                                </div>
                            </div>

                            <RewardsProgressBar />

                            <div className="-mb-8 flex h-full flex-col justify-between gap-8 overflow-auto pb-8">
                                <div className="space-y-8">
                                    <div className="px-5">
                                        <Separator />
                                    </div>
                                    {cart?.lines && cart.lines.length > 0 && (
                                        <>
                                            <ul className="flex flex-col gap-4">
                                                {cart?.lines.map((line, i) => (
                                                    <li
                                                        key={`${line.id}-${i}`}
                                                        className={cn(
                                                            'px-5 pb-8',
                                                            {
                                                                'pb-0':
                                                                    i + 1 ===
                                                                    cart.lines
                                                                        .length,
                                                            }
                                                        )}>
                                                        <CartItem
                                                            lineItem={line}
                                                            showSubscription
                                                            showRecommendation={
                                                                i + 1 ===
                                                                cart.lines
                                                                    .length
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

                            <div
                                className="inset-x-0 bottom-0 z-10 flex w-full flex-col items-center justify-center gap-3.5 bg-base-50 px-5 pb-5 pt-4"
                                style={{
                                    boxShadow:
                                        '0px -3px 25.1px 0px rgba(118, 118, 118, 0.25)',
                                }}>
                                <CartSubtotal
                                    amount={cart?.cost.subtotalAmount.amount}
                                    quantity={cart?.totalQuantity}
                                />
                                <CheckoutButton
                                    href={cart?.checkoutUrl ?? ''}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Background overlay */}
            <motion.div
                className={cn('invisible fixed left-0 top-0 z-[-1] w-full', {
                    'visible z-40': open,
                })}
                onClick={onClose}
                initial={{
                    height: desktop ? '100vh' : 0,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(0px)',
                }}
                animate={{
                    height: '100vh',
                    backgroundColor: open
                        ? 'hsla(240,6%,90%,.4)'
                        : 'rgba(255, 255, 255, 0)',
                    backdropFilter: open ? 'blur(20px)' : 'blur(0px)',
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                }}
            />
        </>
    );
}
