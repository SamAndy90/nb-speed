import ChevronRight from '@/assets/icons/chevron-right.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import Link from 'next/link';

export function RewardsPointCard({
    points,
    variant = 'rewards',
    className,
}: {
    points: number;
    variant?: 'overview' | 'rewards';
} & PropsWithClassName) {
    const suffix =
        variant === 'overview'
            ? 'available to redeem on products and subscriptions. '
            : 'available to claim for rewards';
    return (
        <div
            className={cn(
                'relative flex grow flex-col items-start border-neutral-200 px-5 text-sm font-semibold md:rounded-[calc(var(--radius)-6px)] md:border-r md:px-8',
                className,
                variant == 'overview' && 'font-normal'
            )}>
            You have
            <p className="bg-gradient-to-br from-gradient-3-from via-gradient-3-via to-gradient-3-to bg-clip-text py-3 font-heading text-[32px] font-medium leading-[1] text-transparent md:text-[50px] md:leading-[1]">
                {points} Nutripoints
            </p>
            {suffix}
            {variant == 'overview' && (
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bottom-7 right-8 mt-6 flex items-center justify-center gap-1.5 pl-3 pr-2 text-xs font-bold md:absolute">
                    <Link href="/account/rewards">
                        Claim now
                        <ChevronRight className="size-4" />
                    </Link>
                </Button>
            )}
        </div>
    );
}
