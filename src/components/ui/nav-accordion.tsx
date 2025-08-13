import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { ComponentProps } from 'react';
import { Button } from './button';
import ChevronRight from '@/assets/icons/chevron-right.svg';

//TODO: Migrate to @apply or stick to shadcn style?
const accordionTriggerClassName =
    'flex items-center justify-between gap-2 py-0 font-sans text-lg font-bold transition-all hover:underline [&>svg]:rotate-90 [&[data-state=open]>svg]:-rotate-90';
export const PrimaryAccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(accordionTriggerClassName, className)}
            {...props}>
            {children}
            <ChevronRight className="size-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));

export function PrimaryAccordionLink({
    className,
    ...props
}: ComponentProps<typeof Link>) {
    return (
        <Button
            asChild
            className={cn(
                'w-fit py-1 text-sm font-normal no-underline hover:underline',
                className
            )}
            size="inline"
            variant="linkMuted">
            <Link {...props} />
        </Button>
    );
}
PrimaryAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
