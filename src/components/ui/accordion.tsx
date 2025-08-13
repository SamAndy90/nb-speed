'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import Star from '@/assets/icons/nutriburst-star.svg';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const Accordion = React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> &
        VariantProps<typeof accordionVariants>
>(({ variant, children, ...props }, ref) => (
    <AccordionPrimitive.Root ref={ref} {...props}>
        <AccordionContext.Provider value={{ variant }}>
            {children}
        </AccordionContext.Provider>
    </AccordionPrimitive.Root>
));
Accordion.displayName = AccordionPrimitive.Root.displayName;

const accordionVariants = cva('', {
    variants: {
        variant: {
            default: '',
            filter: 'flex w-full flex-col gap-0 md:gap-4',
            'landing-lg': '',
            'landing-sm': '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
const AccordionContext = React.createContext<
    VariantProps<typeof accordionVariants>
>({
    variant: 'default',
});

const accordionItemVariants = cva('flex flex-col border-b', {
    variants: {
        variant: {
            default: '',
            filter: 'gap-0 border-b-0 md:gap-4',
            'landing-lg': 'last:border-b-0',
            'landing-sm': '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
    const cva = React.useContext(AccordionContext);
    return (
        <AccordionPrimitive.Item
            ref={ref}
            className={cn(accordionItemVariants(cva), className)}
            {...props}
        />
    );
});
AccordionItem.displayName = 'AccordionItem';

const accordionTriggerVariants = cva(
    'flex min-h-14 flex-1 items-center justify-between gap-8 text-start font-sans text-sm font-bold transition-all md:h-auto [&[data-state=open]>svg]:rotate-180',
    {
        variants: {
            variant: {
                default: 'md:py-6 md:text-desktop-h7',
                filter: 'h-6 font-sans text-sm md:font-bold',
                'landing-lg':
                    'py-4 text-lg font-bold md:py-6 md:text-2xl [&>p]:max-md:max-w-56 [&_svg]:ml-20',
                'landing-sm':
                    'gap-4 py-2 text-sm font-bold max-sm:h-14 md:py-[18px] md:text-xl max-sm:[&_svg]:size-3',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
        icon?: 'chevron' | 'star';
    } & VariantProps<typeof accordionTriggerVariants>
>(({ className, children, variant, icon = 'chevron', ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    const triggerIcon =
        icon === 'chevron' ? (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        ) : (
            <Star className="size-5 shrink-0 transition-transform duration-200" />
        );
    const cva = { ...context, ...(variant ? { variant } : {}) };
    return (
        <AccordionPrimitive.Header className="flex w-full">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(accordionTriggerVariants(cva), className)}
                {...props}>
                <p className="md:contents">{children}</p>
                {triggerIcon}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const accordionContentVariants = cva(
    'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    {
        variants: {
            variant: {
                default: '',
                filter: '',
                'landing-lg': 'text-base max-sm:[&_a]:text-sm',
                'landing-sm': '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);
const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
        innerClassName?: string;
    }
>(({ className, children, innerClassName, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    const resolvedClassName = cn(
        accordionContentVariants({ className, ...context })
    );
    return (
        <AccordionPrimitive.Content
            ref={ref}
            className={resolvedClassName}
            {...props}>
            <div className={cn('relative pb-4 pt-0', innerClassName)}>
                {children}
            </div>
        </AccordionPrimitive.Content>
    );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
