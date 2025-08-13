import React, { MouseEvent, ReactNode } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startAddon?: ReactNode;
    onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const InputWithButton = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, startAddon, onButtonClick, className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'flex h-14 w-full items-center justify-between gap-2.5 rounded-full border border-border bg-primary-white py-1 pl-4 pr-1 md:max-w-[304px]',
                    className
                )}>
                {startAddon && (
                    <span className="text-neutral-400">{startAddon}</span>
                )}
                <input
                    className="w-full grow text-paragraph-4 outline-none placeholder:text-neutral-400 md:text-paragraph-3"
                    ref={ref}
                    type={type}
                    {...props}
                />
                <Button
                    variant="icon"
                    size="inline"
                    className="aspect-square h-full bg-gradient-2"
                    onClick={onButtonClick}>
                    <ChevronRight />
                </Button>
            </div>
        );
    }
);

InputWithButton.displayName = 'InputWithButton';
export default InputWithButton;
