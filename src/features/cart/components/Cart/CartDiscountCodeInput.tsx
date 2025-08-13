import { DiscountCodeBadge } from '../DiscountCodeBadge';
import { DiscountCodeForm } from '../DiscountCodeForm';

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

export default CartDiscountCodeInput;
