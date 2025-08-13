import { useTransition } from 'react';
import { updateCartDiscountCodesAction } from '../actions';
import { useCart } from '../context/cart';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import Close from '@/assets/icons/close.svg';
import Label from '@/assets/icons/label.svg';

/**
 * Discount code badge. Also handles deleting the discount code.
 */
export function DiscountCodeBadge({ code }: { code: string }) {
    const { removeCode, cart } = useCart();
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(
        updateCartDiscountCodesAction,
        null
    );
    const discountCodesWithoutCode =
        cart?.discountCodes
            .filter(({ code: c }) => c !== code)
            .map((c) => c.code) ?? [];
    const actionWithCodes = formAction.bind(null, discountCodesWithoutCode);
    return (
        <li>
            <form
                className="flex items-center justify-center gap-1 rounded-full border border-success-600 bg-success-50 py-1 pl-2 pr-1 text-xs font-semibold uppercase"
                action={async () => {
                    startTransition(() => {
                        removeCode(code);
                    });
                    await actionWithCodes();
                }}>
                <Label />
                {code}
                <Button
                    variant="ghost"
                    size="inline"
                    className="size-fit p-1 hover:bg-success-50">
                    <Close className="size-2" />
                </Button>
            </form>
        </li>
    );
}
