'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Check from '@/assets/icons/check.svg';
const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn('grid gap-2', className)}
            {...props}
            ref={ref}
        />
    );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
        variant?: 'default' | 'gradient';
    }
>(({ className, variant = 'default', ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                'relative flex aspect-square h-[18px] w-[18px] items-center justify-center rounded-full border border-primary-foreground text-primary-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                variant === 'gradient' &&
                    'bg-gradient size-4 border-none bg-gradient-to-br from-gradient-3-from via-gradient-3-via to-gradient-3-to focus-visible:ring-0',

                className
            )}
            {...props}>
            {variant === 'gradient' && (
                <div className="absolute size-[calc(100%-2px)] rounded-full bg-primary" />
            )}
            <RadioGroupPrimitive.Indicator
                className={cn(
                    'relative z-10 flex size-full items-center justify-center',
                    variant === 'gradient' && 'size-full'
                )}>
                {variant === 'default' ? (
                    <Circle className="h-3 w-3 fill-current text-current" />
                ) : (
                    <div className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-gradient-3-from via-gradient-3-via to-gradient-3-to">
                        <Check className="size-2 text-primary" />
                    </div>
                )}
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const MotionRadioGroup = motion.create(RadioGroup);

export { RadioGroup, RadioGroupItem, MotionRadioGroup };
