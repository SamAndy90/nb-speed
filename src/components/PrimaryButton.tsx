import Link, { LinkProps } from 'next/link';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { motion } from 'framer-motion';

import { ComponentProps } from 'react';
import { AsProps } from '@/types';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type PrimaryButtonProps<T extends React.ElementType> = AsProps<T> & {
    align?: 'left' | 'right' | 'center';
    innerClassName?: string;
    animateText?: boolean;
};
const primaryButtonVariants = cva('', {
    variants: {
        variant: {
            default:
                'relative inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        },
        size: {
            default: '',
        },
        align: {
            left: '',
            right: '',
            center: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        align: 'center',
    },
});
const primaryButtonContainerVariants = cva(
    'flex w-full flex-row items-center justify-center gap-1 p-6 px-4 py-2',
    {
        variants: {
            align: {
                left: '-ml-[15%] group-hover:ml-0',
                right: '',
                center: '',
            },
        },
        defaultVariants: { align: 'center' },
    }
);
export function PrimaryButton<T extends React.ElementType>({
    className,
    as = 'button',
    variant,
    size,
    align,
    animateText = false,
    children,
    innerClassName,
    ...props
}: PrimaryButtonProps<T>) {
    const Comp = as;
    const Chevron = 'div';
    return (
        <Comp
            className={cn(
                primaryButtonVariants({ variant, size, align, className })
            )}
            //ref={ref}
            {...props}>
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="absolute size-[calc(100%+0.75rem)] animate-glow rounded-full bg-theme-400" />
                <div
                    className={cn(
                        'group relative flex h-full w-full flex-row items-center justify-center gap-1 overflow-clip rounded-full bg-cooper-gradient font-bold *:duration-700 md:min-h-12',
                        innerClassName
                    )}>
                    <Chevron className="absolute left-[-20%] flex aspect-square h-[calc(100%-0.5rem)] items-center justify-center rounded-full bg-gradient-2 transition-all group-hover:left-1">
                        <ChevronRight className="h-4 w-4" />
                    </Chevron>

                    <div
                        className={cn(
                            primaryButtonContainerVariants({ align }),
                            animateText && 'group-hover:ml-10'
                        )}>
                        {children}
                    </div>
                    <Chevron className="absolute right-1 flex aspect-square h-[calc(100%-0.5rem)] items-center justify-center rounded-full bg-gradient-2 transition-all group-hover:right-[-20%]">
                        <ChevronRight className="h-4 w-4" />
                    </Chevron>
                </div>
            </div>
        </Comp>
    );
}

PrimaryButton.displayName = 'PrimaryButton';
