import clsx from 'clsx';
import { updateItemQuantity } from '../actions';

import { useFormState } from 'react-dom';
import { Minus, Plus } from 'lucide-react';
import { CartItem } from '@/features/shopify/types';
import Trash from '@/assets/icons/trash.svg';
import { useCart } from '../context/cart';

/**
 * Cart item quantity edit button. Handles adding, reducing, and deleting items.
 */
function SubmitButton({ type }: { type: 'plus' | 'minus' | 'delete' }) {
    const { ariaLabel, Icon } = {
        plus: {
            ariaLabel: 'Increase item quantity',
            Icon: Plus,
        },
        minus: {
            ariaLabel: 'Reduce item quantity',
            Icon: Minus,
        },
        delete: {
            ariaLabel: 'Delete item',
            Icon: Trash,
        },
    }[type];
    return (
        <button
            type="submit"
            aria-label={ariaLabel}
            className={clsx(
                'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
                {
                    'ml-auto': type === 'minus',
                }
            )}>
            <Icon className="h-4 w-4" />
        </button>
    );
}

/**
 * Cart item quantity edit button. Handles adding, reducing, and deleting items, contained in a form.
 */
export function EditItemQuantityButton({
    item,
    type,
    optimisticUpdate,
}: {
    item: CartItem;
    type: 'plus' | 'minus' | 'delete';
    optimisticUpdate: ReturnType<typeof useCart>['updateCartItem'];
}) {
    const [state, formAction] = useFormState(updateItemQuantity, null);
    const quantity =
        type === 'delete'
            ? 0
            : type === 'plus'
              ? item.quantity + 1
              : item.quantity - 1;
    const payload = {
        id: item.id,
        merchandiseId: item.merchandise.id,
        quantity,
    };
    const actionWithVariant = formAction.bind(null, payload);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        optimisticUpdate(
            payload.merchandiseId,
            type,
            item.sellingPlanAllocation?.sellingPlan.id
        );
        actionWithVariant();
    };

    return (
        <form onSubmit={handleSubmit}>
            <SubmitButton type={type} />
            {state?.error && (
                <p aria-live="polite" className="sr-only" role="status">
                    {state.error}
                </p>
            )}
        </form>
    );
}
