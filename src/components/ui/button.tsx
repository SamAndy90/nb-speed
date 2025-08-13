import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-theme text-primary-foreground hover:bg-theme/90',
                cooper_gradient:
                    'bg-cooper-gradient text-primary-foreground hover:opacity-90',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-primary-foreground bg-transparent hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-theme-50 hover:text-accent-foreground',
                icon: 'border-0 bg-transparent hover:text-accent-foreground',

                link: 'font-normal text-theme underline underline-offset-2 transition-all hover:underline-offset-4',
                linkMuted:
                    'font-normal underline underline-offset-2 transition-all hover:underline-offset-4',
                primary: 'bg-gradient-1 text-base font-bold',
                dark: 'bg-base-100 text-base-50 hover:bg-base-100/90',
            },
            size: {
                default: 'h-10 px-5',
                checkout: 'p-6',
                inline: 'h-auto text-[1em]',
                sm: 'h-8 px-[18px] text-xs',
                md: 'h-11 px-5 text-sm',
                lg: 'h-11 px-6 text-base',
                icon: 'h-10 w-10',
                mini: 'size-4',
            },
            sizeDesktop: {
                sm: 'md:h-8 md:px-[18px] md:text-xs',
                md: 'md:h-11 md:px-5 md:text-sm',
                lg: 'md:h-11 md:px-6 md:text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, sizeDesktop, asChild = false, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, sizeDesktop, className })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button };
