import { updateCartDiscountCodesAction } from '../actions';

import { useFormState } from 'react-dom';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import Check from '@/assets/icons/check.svg';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useTransition } from 'react';
import { useCart } from '../context/cart';
import { cn } from '@/lib/utils';

/**
 * Input form for discount code
 */
function DiscountCodeInput({
    status,
}: {
    status: 'pending' | 'success' | 'error' | null;
}) {
    const isSuccess = status === 'success';
    return (
        <div className="group relative flex items-center overflow-clip rounded-full p-px *:duration-700">
            <Button
                className={cn(
                    'absolute left-[-20%] z-20 aspect-square rounded-full bg-gradient-2 transition-all',
                    !isSuccess && 'group-hover:left-1'
                )}
                size="icon">
                <ChevronRight className="h-4 w-4" />
            </Button>
            <input
                placeholder="Apply Discount Code"
                className={cn(
                    'peer/input z-10 h-12 w-full rounded-full pl-4 outline-none transition-all placeholder:font-semibold placeholder:text-neutral-400 focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
                    isSuccess ? '' : 'focus:bg-theme-50 group-hover:pl-[15%]'
                )}
                required
                name="discountCode"
            />
            <Button
                className={cn(
                    'absolute right-1 z-20 aspect-square rounded-full transition-all',
                    isSuccess
                        ? 'bg-transparent text-success-600'
                        : 'bg-gradient-2 group-hover:right-[-20%]'
                )}
                size="icon">
                {isSuccess ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </Button>
            <div
                key={status}
                className={cn(
                    'absolute inset-0 size-full rounded-full bg-border transition-all animate-in fade-in',
                    isSuccess
                        ? 'bg-success-600'
                        : 'bg-border peer-focus/input:bg-gradient-3'
                )}
            />
        </div>
    );
}

const DISCOUNT_FORM_SUCCESS_TIMEOUT = 1000;

/**
 * Form for discount code, including discount code input as well as status messages
 */
export function DiscountCodeForm({
    optimisticUpdate,
}: {
    optimisticUpdate: (code: string) => void;
}) {
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(
        updateCartDiscountCodesAction,
        null
    );
    const formRef = useRef<HTMLFormElement>(null);
    const { cart } = useCart();
    const status =
        state === null
            ? null
            : pending
              ? 'pending'
              : state.success
                ? 'success'
                : 'error';
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (state?.success) {
            timeoutId = setTimeout(() => {
                formRef.current?.reset();
                formAction(null);
            }, DISCOUNT_FORM_SUCCESS_TIMEOUT);
        }
        return () => clearTimeout(timeoutId);
    }, [status]);
    return (
        <form
            action={async (formData) => {
                const newCode = formData.get('discountCode') as string;

                const codes = [
                    ...(cart?.discountCodes.map((c) => c.code) ?? []),
                    newCode,
                ];

                startTransition(() => optimisticUpdate(newCode));

                return formAction(codes);
            }}
            ref={formRef}>
            <DiscountCodeInput status={status} />
            {state && !state.success && (
                <p aria-live="polite" className="sr-only" role="status">
                    {state.error}
                </p>
            )}
        </form>
    );
}
