'use client';
import { ProductRating } from '@/features/product/types';
import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import {
    ComponentProps,
    createContext,
    PropsWithChildren,
    useContext,
    useMemo,
} from 'react';
import starImgGold from '@/assets/icons/star-img-gold.png';

const RatingContext = createContext<ProductRating>({ score: 0, count: 0 });
function useRating() {
    const context = useContext(RatingContext);
    if (!context) {
        throw new Error('useRating must be used within a RatingProvider');
    }
    return context;
}
export function Stars({
    score,
    colour = 'amber',
    className,
}: {
    score?: number;
    colour?: 'amber' | 'primary' | 'theme-v2';
} & PropsWithClassName) {
    const { score: contextScore } = useRating();
    const values = useMemo(
        () =>
            [...new Array(5)].map((_, i) =>
                Math.min(1, 5 * (score ?? contextScore) - i)
            ),
        [score]
    );
    const colourVar =
        colour === 'amber'
            ? '--amber-400'
            : colour === 'theme-v2'
              ? '--theme-v2'
              : '--primary-foreground';

    return (
        <div className={cn('flex h-[1em] gap-0.5', className)}>
            {values.map((v, i) => (
                <div
                    key={`star-${i}`}
                    style={{
                        background: `linear-gradient(to right, hsl(17, 35%, 58%), hsl(30, 63%, 80%) ${v * 100}%, hsl(var(--zinc-100)) ${v * 100}%, hsl(var(--zinc-100)))`,
                        // background: `linear-gradient(to right, hsl(var(${colourVar})), hsl(var(${colourVar})) ${v * 100}%,  hsl(var(--zinc-100)) ${v * 100}%, hsl(var(--zinc-100)))`,
                        mask: `url(${starImgGold.src})`,
                        maskSize: '100% 100%',
                    }}
                    className="aspect-square h-full"
                />
            ))}
        </div>
    );
}
export function ReviewCount({
    hideSuffix = false,
    className,
}: { hideSuffix?: boolean } & PropsWithClassName) {
    const { count } = useRating();
    const suffix = hideSuffix ? '' : count === 1 ? ' review' : ' reviews';
    return (
        <span className={cn(className)}>
            ({count}
            {suffix})
        </span>
    );
}

export function ExactScore({ className, ...props }: ComponentProps<'span'>) {
    const { score } = useRating();
    return (
        <span {...props} className={className}>
            {(score * 5).toFixed(1)}
        </span>
    );
}

export function StarRating({
    score,
    reviewCount = 0,
    children,
    className,
}: {
    score: number;
    reviewCount?: number;
} & PropsWithClassName &
    PropsWithChildren) {
    return (
        <RatingContext.Provider value={{ score, count: reviewCount }}>
            <div
                className={cn(
                    'flex items-center gap-1 text-sm font-normal',
                    className
                )}>
                {children}
            </div>
        </RatingContext.Provider>
    );
}
