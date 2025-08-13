'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import Check from '@/assets/icons/check.svg';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            'group peer relative h-4 w-4 shrink-0 rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-theme data-[state=checked]:text-primary',
            className
        )}
        {...props}>
        <div className="absolute inset-0 flex size-full items-center justify-center rounded-full bg-gradient-to-br from-gradient-3-from via-gradient-3-via to-gradient-3-to p-px">
            <div className="size-full rounded-full bg-primary opacity-100 transition-all group-data-[state=checked]:opacity-0" />
        </div>
        <CheckboxPrimitive.Indicator
            className={cn(
                'relative z-10 flex items-center justify-center text-current'
            )}>
            <Check className="h-2 w-2" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
