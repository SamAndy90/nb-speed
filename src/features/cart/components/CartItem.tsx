import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { productFragment } from '@/features/shopify/graphql/storefront/fragments/product';
import { getFragmentData } from '@/gql/storefront';

import { cn, currencyFormatter } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { startTransition, useCallback, useMemo, useState } from 'react';
import { useCart } from '../context/cart';
import { EditItemQuantityButton } from './EditItemQuantityButton';
import { UpgradeToSubscriptionButton } from './UpgradeToSubscriptionButton';
import { Cart } from '@/features/shopify/types';
import { CartItemImage } from './CartItemImage';
import { CartProductRecommendation } from './CartProductRecommendation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
    getDiscountPercentage,
    getFirstSubscriptionPlan,
    parseProduct,
} from '@/features/product/utils';
import { Product } from '@/features/product/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PURCHASE_OPTIONS } from '@/features/product/components/PurchaseOptions';
import { updateCartItemPlan, updateItemQuantity } from '../actions';
import { useFormState } from 'react-dom';

const CART_UPDATE_MESSAGE_TIMEOUT = 2000; //How long the cart updated message will be displayed

/**
 * Displays a single item in the cart, with the ability to change item quantity, and delete the item.
 * Also includes optional item recommendations, and an "Upgrade to subscription" button.
 */
export function CartItem({
    lineItem,
    showSubscription = false,
    showRecommendation = false,
}: {
    lineItem: Cart['lines'][number];
    showSubscription?: boolean;
    showRecommendation?: boolean;
}) {
    const product = getFragmentData(
        productFragment,
        lineItem.merchandise.product
    );
    const image = getFragmentData(imageFragment, product.featuredImage);
    const images = product.images.edges.map((image) =>
        getFragmentData(imageFragment, image.node)
    );
    const price = useMemo(
        () =>
            currencyFormatter.format(Number(lineItem.cost.totalAmount.amount)),
        [lineItem.cost.totalAmount.amount]
    );

    const {
        updateCartItem,
        setIsOpen,
        updateCartItemPlan: updateCartLineItemPlan,
        upgradeToSubscription,
    } = useCart();
    const [_, formSubscriptionAction] = useFormState(updateCartItemPlan, null);

    const [showCartUpdated, setShowCartUpdated] = useState(false);
    // const deliveryName = lineItem.sellingPlanAllocation?.sellingPlan?.name;

    const sellingPlanId = lineItem.sellingPlanAllocation?.sellingPlan?.id;
    const firstSubscriptionPlan = getFirstSubscriptionPlan(
        product as unknown as Product
    );
    const subscriptionPlanOptions = product.sellingPlanGroups.nodes
        .map((plan) => plan.sellingPlans.edges[0]?.node)
        .filter((plan) => Boolean(plan))
        .sort((a, b) => a.name.localeCompare(b.name));

    const [selectedSellingPlanId, setSelectedSellingPlanId] =
        useState(sellingPlanId);
    const hasSubscription = Boolean(firstSubscriptionPlan);
    const discountPercentage = useMemo(
        () => getDiscountPercentage(product as unknown as Product),
        [product]
    );

    const onOptimisticUpdate: typeof updateCartItem = useCallback(
        (merchandiseId, updateType, sellingPlanId) => {
            setShowCartUpdated(true);
            setTimeout(
                () => setShowCartUpdated(false),
                CART_UPDATE_MESSAGE_TIMEOUT
            );
            startTransition(() => {
                updateCartItem(merchandiseId, updateType, sellingPlanId);
            });
        },
        [updateCartItem]
    );

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleOneOff = () => {
        const payload = {
            id: lineItem.id,
            merchandiseId: lineItem.merchandise.id,
            quantity: lineItem.quantity,
            sellingPlanId: null,
        };
        const action = formSubscriptionAction.bind(null, payload);
        action();
        startTransition(() => {
            updateCartLineItemPlan(
                lineItem.merchandise.id,
                parseProduct(product),
                selectedSellingPlanId,
                null
            );
        });
    };

    const handleSubscriptionOptionChange = (value: string) => {
        setSelectedSellingPlanId(value);
        if (!firstSubscriptionPlan) return;

        if (value === PURCHASE_OPTIONS.ONE_OFF) {
            handleOneOff();
            return;
        }

        const selectedSellingPlan = subscriptionPlanOptions.find(
            (plan) => plan?.id === value
        );

        if (!selectedSellingPlan) return;

        const payload = {
            id: lineItem.id,
            merchandiseId: lineItem.merchandise.id,
            quantity: lineItem.quantity,
            sellingPlanId: selectedSellingPlan.id,
        };
        const action = formSubscriptionAction.bind(null, payload);
        action();
        startTransition(() => {
            updateCartLineItemPlan(
                lineItem.merchandise.id,
                parseProduct(product),
                selectedSellingPlanId,
                selectedSellingPlan.id
            );
        });
    };

    const handleUpgradeToSubscription = useCallback(() => {
        const payload = {
            id: lineItem.id,
            merchandiseId: lineItem.merchandise.id,
            quantity: lineItem.quantity,
            sellingPlanId: firstSubscriptionPlan.id,
        };
        const action = formSubscriptionAction.bind(null, payload);
        action();
        setSelectedSellingPlanId(firstSubscriptionPlan.id);
        startTransition(() => {
            upgradeToSubscription(
                lineItem.merchandise.id,
                parseProduct(product),
                firstSubscriptionPlan.id
            );
        });
    }, [lineItem, firstSubscriptionPlan]);

    const isHydrationProduct = product.handle === 'hydration';
    const variant = product.variants.edges.find(
        (v) => v.node.id === lineItem.merchandise.id
    );
    const variantTitle = variant?.node.title ?? '';
    const variantType =
        variant?.node.selectedOptions.find((o) => o.name === 'type')?.value ??
        '';
    const variantImage =
        images.find((i) =>
            i.altText?.toLowerCase().includes(variantType.toLowerCase())
        ) ?? image;

    return (
        <>
            <div
                className={cn(
                    'flex flex-col gap-6',
                    showSubscription ? 'mb-6' : 'mb-8'
                )}>
                <div
                    className={cn(
                        'flex min-h-20 cursor-pointer items-center gap-3 text-sm font-bold sm:text-base'
                    )}>
                    {!isHydrationProduct && image && (
                        <CartItemImage image={image} />
                    )}
                    {isHydrationProduct && variantImage && (
                        <CartItemImage image={variantImage} />
                    )}
                    <div className="flex grow flex-col justify-between gap-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <Link
                                    href={`/products/${product.handle}`}
                                    className="hover:underline"
                                    onClick={handleLinkClick}>
                                    <p className="font-bold">
                                        {isHydrationProduct
                                            ? variantTitle
                                            : product.title}
                                    </p>
                                </Link>
                                {/* {deliveryName && (
                                    <p className="text-paragraph-5 font-normal">
                                        {deliveryName}
                                    </p>
                                )} */}
                            </div>
                            <p className="text-sm font-semibold">{price}</p>
                        </div>
                        <div className="flex">
                            <div className="flex h-9 w-fit items-center justify-center rounded-sm border">
                                <EditItemQuantityButton
                                    item={lineItem}
                                    type="minus"
                                    optimisticUpdate={onOptimisticUpdate}
                                />
                                <p className="flex h-full w-6 items-center justify-center border-x bg-theme-50 px-5 text-center text-base">
                                    {lineItem.quantity}
                                </p>
                                <EditItemQuantityButton
                                    item={lineItem}
                                    type="plus"
                                    optimisticUpdate={onOptimisticUpdate}
                                />
                            </div>
                            <EditItemQuantityButton
                                item={lineItem}
                                type="delete"
                                optimisticUpdate={onOptimisticUpdate}
                            />
                            <AnimatePresence>
                                {showCartUpdated && (
                                    <motion.div
                                        className="flex grow items-center justify-end text-sm font-normal text-success-500"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}>
                                        Cart updated!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {sellingPlanId && subscriptionPlanOptions.length > 0 && (
                    <div className="flex items-center justify-between gap-4 pl-4">
                        <p className="whitespace-nowrap text-paragraph-5 font-bold">
                            Your Subscription ships
                        </p>

                        <Select
                            value={selectedSellingPlanId}
                            onValueChange={handleSubscriptionOptionChange}>
                            <SelectTrigger className="h-9 overflow-hidden max-md:text-xs [&_p]:px-4">
                                <SelectValue placeholder={''} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    key={PURCHASE_OPTIONS.ONE_OFF}
                                    value={PURCHASE_OPTIONS.ONE_OFF}>
                                    One-time only
                                </SelectItem>

                                {subscriptionPlanOptions.map((plan) => (
                                    <SelectItem key={plan?.id} value={plan?.id}>
                                        {plan?.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {showSubscription && Boolean(!sellingPlanId) && hasSubscription && (
                <UpgradeToSubscriptionButton
                    discountPercentage={discountPercentage}
                    item={lineItem}
                    onClick={handleUpgradeToSubscription}
                />
            )}

            {showRecommendation && (
                <>
                    <Separator />
                    <CartProductRecommendation productId={product.id} />
                </>
            )}
            <Separator />
        </>
    );
}
