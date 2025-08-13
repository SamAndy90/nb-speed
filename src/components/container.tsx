import { cn } from '@/lib/utils';
import { AsProps } from '@/types';
import React, { forwardRef, ReactNode } from 'react';

const Container = forwardRef(
    (
        {
            children,
            className,
            as,
            id,
        }: {
            children: ReactNode;
            className?: string;
            as?: AsProps;
            id?: string;
        },
        ref
    ) => {
        const Component = as || 'div';
        return (
            <Component
                id={id}
                ref={ref}
                className={cn(
                    'relative mx-auto w-full max-w-[1200px] px-5',
                    className
                )}>
                {children}
            </Component>
        );
    }
);

export default Container;
Container.displayName = 'Container';
