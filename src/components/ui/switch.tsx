'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

type SwitchSize = 'sm' | 'md' | 'lg';

interface SwitchProps
    extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
    size?: SwitchSize;
}

const thumbSizeClasses = {
    sm: 'data-[state=checked]:translate-x-[7.5px]',
    md: 'data-[state=checked]:translate-x-[17.5px]',
    lg: 'data-[state=checked]:translate-x-[21.5px]',
};

const rootSizeClasses = {
    sm: 'h-3 w-[21px] p-[1px]',
    md: 'h-5 w-[38px] p-0.5',
    lg: 'h-7 w-[48px] p-0.5',
};

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>(({ className, size = 'md', ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            'peer inline-flex cursor-pointer items-center rounded-full border border-neutral-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
            rootSizeClasses[size],
            className
        )}
        {...props}
        ref={ref}>
        <SwitchPrimitives.Thumb
            className={cn(
                'pointer-events-none aspect-[1] h-full w-auto rounded-full bg-neutral-400 ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-neutral-700',
                thumbSizeClasses[size]
            )}
        />
    </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
