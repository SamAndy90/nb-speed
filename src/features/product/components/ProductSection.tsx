import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import { ComponentProps, PropsWithChildren } from 'react';

import { forwardRef } from 'react';

export const ProductSection = forwardRef<
    HTMLElement,
    ComponentProps<'section'>
>(({ className, children, ...props }, ref) => {
    return (
        <section
            ref={ref}
            className={cn(
                'w-full px-page-mobile py-12 md:px-page-desktop md:py-30',
                className
            )}
            {...props}>
            {children}
        </section>
    );
});

ProductSection.displayName = 'ProductSection';
