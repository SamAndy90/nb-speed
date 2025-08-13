import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';

/**
 * A bar that displays the amount needed to reach free shipping.
 */
export function FreeShippingBar({ className }: PropsWithClassName) {
    return (
        <div
            className={cn(
                'flex min-h-11 items-center justify-center bg-theme-50 py-2 text-center -mb-4 text-sm',
                className
            )}>
            You are £8 away from Free Shipping
        </div>
    );
}
