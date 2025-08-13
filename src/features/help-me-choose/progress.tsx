'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            'relative h-2.5 w-full overflow-hidden rounded-full border border-neutral-200 bg-white md:max-w-[293px]',
            className
        )}
        {...props}>
        <ProgressPrimitive.Indicator
            className="bg-ocean-blue-400 h-full w-full flex-1 rounded-full transition-all duration-1000"
            style={{
                transform:
                    value && value >= 100
                        ? `translateX(0%)`
                        : `translateX(-${100 - (value || 0)}%)`,
            }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
