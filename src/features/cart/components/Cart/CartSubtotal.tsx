import { currencyFormatter } from '@/lib/utils';

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

export default CartSubtotal;
