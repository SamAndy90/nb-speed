'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { cn, currencyFormatter } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

import { AnimatePresence } from 'framer-motion';
import * as motion from 'framer-motion/client';
import CloseCircle from '@/assets/icons/close-circle.svg';
import React from 'react';
import { FadeInVariants } from '@/features/motion/variants';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { useAddProduct } from '@/features/cart/hooks/useAddProduct';
import { Product } from '../types';
import { MotionButton } from '@/features/motion/components';
import { PURCHASE_OPTIONS } from './PurchaseOptions';
import { getDiscountPercentage, getFirstSubscriptionPlan } from '../utils';
import { usePathname } from 'next/navigation';
import { useVariantProduct } from '../VariantProductProvider';

function PurchaseOptionRadioGroupItem({
    popular = false,
    value,
    price,
    id,
    children,
    onClick,
}: {
    value: string;
    price: string;
    id: string;
    popular?: boolean;
    onClick: (value: string) => void;
} & PropsWithChildren) {
    return (
        <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
                e.preventDefault();
                onClick(value);
            }}
            className={cn(
                'group relative flex w-full items-center justify-start gap-4 rounded-sm px-5 py-[18px] md:py-7',
                popular
                    ? 'bg-gradient-3 px-px py-px md:py-px'
                    : 'border border-border'
            )}
            data-popular={popular}>
            {popular && (
                <Badge className="height-5 absolute -top-2.5 right-4 rounded-xxs border-none bg-gradient-to-br from-gradient-3-from from-10% via-gradient-3-via via-30% to-gradient-3-to to-95%">
                    Popular
                </Badge>
            )}
            <div
                className={cn(
                    'contents h-full w-full rounded-[calc(var(--radius)_-_5px)] bg-primary',
                    popular &&
                        'flex items-center gap-4 bg-theme-50 px-5 py-[18px] md:py-7'
                )}>
                <RadioGroupItem
                    title={''}
                    className={cn('border-border', popular && ' ')}
                    value={value}
                    // onClick={() => onClick(value)}
                    id={id}
                />

                <Label
                    htmlFor={id}
                    className="flex grow items-center justify-between">
                    <div className="space-y-1">{children}</div>
                    <div className="text-base">{price}</div>
                </Label>
            </div>
        </motion.li>
    );
}

PurchaseOptionRadioGroupItem.Title =
    function PurchaseOptionRadioGroupItemTitle({
        children,
    }: PropsWithChildren) {
        return <div className="text-sm font-bold md:text-lg">{children}</div>;
    };
PurchaseOptionRadioGroupItem.Description =
    function PurchaseOptionRadioGroupItemDescription({
        children,
        hideOnMobile = false,
    }: PropsWithChildren & { hideOnMobile?: boolean }) {
        return (
            <p
                className={cn(
                    'text-sm font-normal',
                    hideOnMobile && 'hidden md:block'
                )}>
                {children}
            </p>
        );
    };

const MotionRadioGroup = motion.create(RadioGroup);

const PurchaseOptions = React.forwardRef<
    HTMLDivElement,
    {
        product: Product;
        selectedPlan: string;
        onSelectOption: (value: string) => void;
    }
>(({ product, selectedPlan, onSelectOption }, ref) => {
    const pathname = usePathname();
    const { variant } = useVariantProduct();
    // Subscription plan details
    const subscriptionPlan = getFirstSubscriptionPlan(product);
    const hasSubscription = Boolean(subscriptionPlan);
    const discountPercentage = getDiscountPercentage(product);

    const price = pathname.includes('hydration')
        ? variant.price.amount
        : product.priceRange.maxVariantPrice.amount;

    // Calculate discounted price based on the actual discount percentage
    const discountedPrice = currencyFormatter.format(
        price * (1 - discountPercentage / 100)
    );

    // Get subscription details
    const subscriptionName = hasSubscription ? subscriptionPlan.name : '';

    return (
        <motion.div
            ref={ref}
            className="w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
                duration: 0.2,
                ease: 'easeOut',
            }}>
            <MotionRadioGroup
                className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
                    'md:grid-cols-1': !hasSubscription,
                })}>
                {hasSubscription && (
                    <PurchaseOptionRadioGroupItem
                        value={PURCHASE_OPTIONS.SUBSCRIBE}
                        id={PURCHASE_OPTIONS.SUBSCRIBE}
                        price={discountedPrice}
                        popular
                        onClick={onSelectOption}>
                        <PurchaseOptionRadioGroupItem.Title>
                            Subscribe and Save
                        </PurchaseOptionRadioGroupItem.Title>
                        <PurchaseOptionRadioGroupItem.Description hideOnMobile>
                            {subscriptionName}
                        </PurchaseOptionRadioGroupItem.Description>
                    </PurchaseOptionRadioGroupItem>
                )}
                <PurchaseOptionRadioGroupItem
                    value={PURCHASE_OPTIONS.ONE_OFF}
                    id={PURCHASE_OPTIONS.ONE_OFF}
                    price={currencyFormatter.format(price)}
                    onClick={onSelectOption}>
                    <PurchaseOptionRadioGroupItem.Title>
                        Once-off purchase
                    </PurchaseOptionRadioGroupItem.Title>
                </PurchaseOptionRadioGroupItem>
            </MotionRadioGroup>
        </motion.div>
    );
});
PurchaseOptions.displayName = 'PurchaseOptions';

export function QuickAddBar({ product }: { product: Product }) {
    // State management
    const [radioOpen, setRadioOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedPlan, setPlan] = useState<string>(PURCHASE_OPTIONS.ONE_OFF);

    // Refs
    const formRef = useRef<HTMLFormElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const { variant } = useVariantProduct();

    // Custom hooks
    const { addCartItemAction, addSubscriptionCartItemAction } = useAddProduct(
        product,
        { isHydration: pathname.includes('hydration'), variantId: variant.id }
    );

    // Subscription plan details
    const subscriptionPlan = getFirstSubscriptionPlan(product);
    const hasSubscription = Boolean(subscriptionPlan);

    // Animation controls
    const openRadio = () => {
        if (isAnimating || radioOpen) return;
        setIsAnimating(true);
        setRadioOpen(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const closeRadio = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setRadioOpen(false);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleChangeOption = useCallback(
        (value: string) => {
            setPlan(value);

            // First trigger the closing animation
            closeRadio();

            // Then perform the action after animation completes
            setTimeout(() => {
                if (value === PURCHASE_OPTIONS.SUBSCRIBE) {
                    if (!subscriptionPlan) return;
                    addSubscriptionCartItemAction(subscriptionPlan.id);
                } else {
                    addCartItemAction();
                }
            }, 300);
        },
        [addCartItemAction, addSubscriptionCartItemAction, subscriptionPlan]
    );

    // Handle escape key to close the radio
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && radioOpen) {
                closeRadio();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [radioOpen]);

    return (
        <motion.section
            className="fixed inset-x-0 bottom-6 z-30 flex w-screen items-center justify-center overflow-hidden px-page-mobile md:bottom-12 md:px-page-desktop"
            variants={FadeInVariants}
            initial="hide"
            animate="show"
            exit="exit">
            <motion.div
                ref={containerRef}
                onClick={openRadio}
                className="flex w-full max-w-[1160px] flex-col items-center justify-between shadow-lg backdrop-blur-lg"
                animate={{
                    borderRadius: radioOpen ? '20px' : '40px',
                    backgroundColor: radioOpen
                        ? 'hsl(var(--primary-white))'
                        : 'rgba(var(--primary-white-rgb), 0.5)',
                    paddingTop: radioOpen ? 20 : 20,
                    paddingBottom: radioOpen ? 20 : 20,
                    paddingLeft: radioOpen ? 20 : 20,
                    paddingRight: radioOpen ? 20 : 20,
                }}
                transition={{
                    duration: 0.25,
                    ease: [0.4, 0.0, 0.2, 1], // Material Design easing
                }}
                title="Quick Add">
                <div className="flex w-full flex-row items-center justify-between gap-2">
                    <motion.h3 className="font-sans text-xs font-bold md:text-lg">
                        {product.title}
                    </motion.h3>

                    <AnimatePresence mode="wait">
                        {!radioOpen && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="hidden md:block">
                                {hasSubscription
                                    ? 'Subscription or Once-Off Purchase'
                                    : 'Once-Off Purchase'}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <MotionButton
                        className="gap-4 bg-transparent p-0 font-bold uppercase hover:bg-transparent"
                        variant="ghost">
                        {radioOpen ? (
                            <CloseCircle
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeRadio();
                                }}
                                className="size-8"
                            />
                        ) : (
                            <>
                                Quick Add
                                <div className="flex aspect-square size-9 items-center justify-center rounded-full bg-gradient-2 transition-all">
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </>
                        )}
                    </MotionButton>
                </div>

                <form
                    ref={formRef}
                    className="contents w-full"
                    action={addCartItemAction}>
                    <motion.div
                        className="w-full"
                        animate={{
                            height: radioOpen ? 'auto' : '0px',
                            marginTop: radioOpen ? '32px' : '0px',
                            opacity: radioOpen ? 1 : 0,
                        }}
                        transition={{
                            height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                            marginTop: {
                                duration: 0.3,
                                ease: [0.4, 0.0, 0.2, 1],
                            },
                            opacity: {
                                duration: radioOpen ? 0.2 : 0.1,
                                delay: radioOpen ? 0.1 : 0,
                            },
                        }}>
                        {/* Always render but animate visibility with the parent container */}
                        <PurchaseOptions
                            key="purchase-options"
                            selectedPlan={selectedPlan}
                            product={product}
                            onSelectOption={handleChangeOption}
                        />
                    </motion.div>
                </form>
            </motion.div>
        </motion.section>
    );
}
