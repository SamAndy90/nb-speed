import { Separator } from '@/components/ui/separator';
import { useCreateCart } from './InnerCartSheet';
import { RewardsProgressBar } from '../RewardsProgressBar';
import { CartItem } from '../CartItem';
import CartDiscountCodeInput from './CartDiscountCodeInput';
import { FreeShippingBar } from '../FreeShippingBar';
import CartSubtotal from './CartSubtotal';
import CheckoutButton from './CheckoutButton';

/**
 * Cart contents displayed in the main cart page.
 */
export function InnerCart() {
    const { cart, addCode, removeCode } = useCreateCart();

    return (
        <div className="flex h-full w-full max-w-screen-md flex-col gap-8 px-0 text-center font-bold">
            <header className="space-y-2 px-8">
                <h1 className="text-center font-medium">Your Cart</h1>
                <Separator />
                <p>Free Shipping when you spend over £40 now</p>
                <Separator />
            </header>
            <RewardsProgressBar />

            <ul className="flex flex-col gap-4 overflow-y-scroll px-0 pb-40">
                {cart?.lines.map((line, i) => (
                    <li key={`${line.id}-${i}`} className="px-8 pb-8">
                        <CartItem
                            lineItem={line}
                            showRecommendation={i === 0}
                            showSubscription={i === 0}
                        />
                    </li>
                ))}
                <CartDiscountCodeInput
                    codes={cart?.discountCodes ?? []}
                    addCode={addCode}
                />
                <FreeShippingBar className="md:rounded-full" />
            </ul>

            <footer
                className="fixed inset-x-0 bottom-0 z-10 flex w-full flex-col items-center justify-center gap-3.5 bg-base-50 px-page-mobile pb-5 pt-4 md:px-page-desktop"
                style={{
                    boxShadow: '0px -3px 25.1px 0px rgba(118, 118, 118, 0.25)',
                }}>
                <CartSubtotal
                    amount={cart?.cost.subtotalAmount.amount}
                    quantity={cart?.totalQuantity}
                />

                <CheckoutButton href={cart?.checkoutUrl ?? ''} />
            </footer>
        </div>
    );
}
