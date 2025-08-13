'use client';

import { cn, currencyFormatter } from '@/lib/utils';

import { QuickAddBar } from './QuickAddBar';
import { MotionRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    AnimatePresence,
    useInView,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Product } from '../types';
import { PrimaryAddToCartButton } from '@/features/cart/components/AddToCart';
import { getDiscountPercentage, getFirstSubscriptionPlan } from '../utils';
import { usePathname } from 'next/navigation';
import { useVariantProduct } from '../VariantProductProvider';

export const PURCHASE_OPTIONS = {
    ONE_OFF: 'one-off',
    SUBSCRIBE: 'subscribe',
} as const;

export function PurchaseOptions({ product }: { product: Product }) {
    const { variant } = useVariantProduct();
    const pathname = usePathname();
    const isHydrationProduct = pathname.includes('hydration');

    const price = isHydrationProduct
        ? variant.price.amount
        : product.priceRange.maxVariantPrice.amount;
    const formattedPrice = currencyFormatter.format(price);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    const { scrollYProgress } = useScroll();
    const [isAtEnd, setIsAtEnd] = useState(false);
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setIsAtEnd(v >= 0.9);
    });
    const scrollY = window.scrollY;
    const offsetTop = ref.current?.offsetTop || 0;
    const hideQuickAddBar = scrollY > offsetTop && !isInView && !isAtEnd;
    const [selectedPlan, setPlan] = useState<string>(PURCHASE_OPTIONS.ONE_OFF);

    // Subscription plan details
    const subscriptionPlan = getFirstSubscriptionPlan(product);
    const hasSubscription = Boolean(subscriptionPlan);
    const discountPercentage = getDiscountPercentage(product);

    // Calculate discounted price based on the actual discount percentage
    const discountedPrice = currencyFormatter.format(
        price * (1 - discountPercentage / 100)
    );

    // Get subscription details
    const subscriptionName = hasSubscription ? subscriptionPlan.name : '';

    const sellingPlanId = useMemo(() => {
        if (selectedPlan === PURCHASE_OPTIONS.SUBSCRIBE) {
            return subscriptionPlan.id;
        }
        return undefined;
    }, [hasSubscription, selectedPlan, subscriptionPlan]);

    return (
        <>
            <AnimatePresence>
                {hideQuickAddBar && <QuickAddBar product={product} />}
            </AnimatePresence>
            <MotionRadioGroup
                className="gap-4 font-bold"
                defaultValue={selectedPlan}
                onValueChange={setPlan}
                ref={ref}>
                {hasSubscription && (
                    <div
                        className={cn(
                            'border-theme-300 flex items-center gap-2 rounded-sm border px-5 py-4',
                            {
                                'border-accent-beige bg-[#F8F0E5]':
                                    selectedPlan === PURCHASE_OPTIONS.SUBSCRIBE,
                            }
                        )}>
                        <div className="flex-row items-start justify-start gap-2">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem
                                    value={PURCHASE_OPTIONS.SUBSCRIBE}
                                    id="subscribe"
                                />
                                <Label
                                    htmlFor="subscribe"
                                    className="text-base font-bold">
                                    Subscribe and Save
                                </Label>
                            </div>
                            <div className="m-1 mb-3 ml-6">
                                <div className="flex items-center justify-start gap-2">
                                    <span className="text-2xl">
                                        {discountedPrice}
                                    </span>
                                    <span className="text-sm text-error-900 line-through decoration-2">
                                        {formattedPrice}
                                    </span>
                                </div>
                            </div>
                            <ul className="ml-6 list-inside list-disc list-image-check space-y-1 text-sm font-normal md:text-base">
                                <li>Save {discountPercentage}%</li>
                                <li>{subscriptionName}</li>
                                <li>Cancel anytime</li>
                            </ul>
                        </div>
                    </div>
                )}
                <div
                    className={cn(
                        'flex items-center space-x-2 rounded-sm border border-neutral-300 px-5 py-4',
                        {
                            'border-accent-beige bg-[#F8F0E5]':
                                selectedPlan === PURCHASE_OPTIONS.ONE_OFF,
                        }
                    )}>
                    <RadioGroupItem
                        value={PURCHASE_OPTIONS.ONE_OFF}
                        id="one-off"
                    />
                    <Label
                        htmlFor={PURCHASE_OPTIONS.ONE_OFF}
                        className="flex w-full flex-row justify-between text-base font-bold">
                        <span className="text-paragraph-4">
                            Once-off Purchases
                        </span>
                        <span>{formattedPrice}</span>
                    </Label>
                </div>
            </MotionRadioGroup>

            <div className="mt-8 [&_button]:p-0">
                <PrimaryAddToCartButton
                    product={product}
                    sellingPlanId={sellingPlanId}
                />
            </div>
        </>
    );
}

export default PurchaseOptions;
