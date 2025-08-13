import { PageTemplate } from '@/components/PageTemplate';
import { InnerCart } from '@/features/cart/components/InnerCart';
export default function CartPage() {
    return (
        <main className="flex w-full grow flex-col overflow-x-hidden md:px-28">
            <div className="relative flex h-full w-full grow flex-col items-center justify-center pt-12">
                <InnerCart />
            </div>
        </main>
    );
}
