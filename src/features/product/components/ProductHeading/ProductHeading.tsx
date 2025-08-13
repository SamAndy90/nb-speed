import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export function ProductSectionHeading({
    className,
    ...props
}: ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                'flex flex-col gap-4 text-start md:gap-2 md:text-center',
                className
            )}
        />
    );
}

export function ProductSectionTitle({
    className,
    ...props
}: ComponentProps<'h2'>) {
    return <h2 {...props} className={cn('', className)} />;
}

export function ProductSectionSubtitle({
    className,
    ...props
}: ComponentProps<'p'>) {
    return <p {...props} className={cn('', className)} />;
}
