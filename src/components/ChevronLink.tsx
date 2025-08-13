import ChevronRight from '@/assets/icons/chevron-right.svg';
import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export function ChevronLink({
    className,
    children,
    ...props
}: LinkProps & PropsWithChildren & PropsWithClassName) {
    return (
        <Link
            {...props}
            className={cn(
                'flex w-fit items-center justify-center gap-1 font-bold',
                className
            )}>
            {children} <ChevronRight className="mt-[0.23em] size-4" />
        </Link>
    );
}
