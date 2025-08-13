'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useCart } from '../cart/context/cart';
import { OrderFragment } from '@/gql/admin/graphql';
import { addItemsToCart } from '../cart/actions';
import { toast } from 'sonner';
import { ORDER_ADDED_SUCCESS_TOAST_MESSAGE } from './const';

const OrderHeaderActions = ({ order }: { order: OrderFragment }) => {
    const { setIsOpen } = useCart();
    const [isReordering, setIsReordering] = useState<boolean>(false);
    const [isTracking, setIsTracking] = useState<boolean>(false);

    const {
        lineItems: { edges },
    } = order;

    const handleReorder = async () => {
        if (isReordering) return;

        try {
            setIsReordering(true);
            const cartItems = edges.reduce(
                (
                    acc: { merchandiseId: string; quantity: number }[],
                    { node: { product, quantity } }
                ) => {
                    const variant = product?.variants.edges[0]?.node;
                    if (variant) {
                        acc.push({ merchandiseId: variant.id, quantity });
                    }
                    return acc;
                },
                []
            );
            await addItemsToCart(cartItems);
            toast.success(ORDER_ADDED_SUCCESS_TOAST_MESSAGE);
        } catch (error) {
            toast.error('Failed to reorder items. Please try again.');
        } finally {
            setIsReordering(false);
            setIsOpen(true);
        }
    };

    const handleTrackParcel = async () => {
        setIsTracking(true);
        // Add your tracking logic here
        setTimeout(() => setIsTracking(false), 1000); // Remove this when implementing actual tracking
    };

    return (
        <div className="flex gap-3.5 max-sm:hidden">
            <Button
                variant="outline"
                size="sm"
                className="md:text-xs"
                disabled={isTracking}
                onClick={handleTrackParcel}>
                {isTracking ? 'Tracking...' : 'Track parcel'}
            </Button>
            <Button
                variant="outline"
                onClick={handleReorder}
                size="sm"
                disabled={isReordering}
                className="md:text-xs">
                {isReordering ? 'Loading...' : 'Reorder'}
            </Button>
        </div>
    );
};

export default OrderHeaderActions;
