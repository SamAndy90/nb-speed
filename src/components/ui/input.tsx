import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type={type}
                    className={cn(
                        'focus-disabled:cursor-not-allowed peer flex h-[58px] w-full rounded-xs bg-background px-4 py-2 text-sm font-semibold text-neutral-700 outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:opacity-50 md:text-base',
                        'relative z-[1] border-none',
                        'group-data-[state=filled]:bg-beige',
                        'focus:bg-beige',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div
                    className={cn(
                        'absolute inset-[-1px] rounded-xs transition-all duration-150',
                        'z-0 bg-input',
                        'group-data-[state=error]:bg-error-500',
                        'group-data-[state=valid]:bg-success-600',
                        'group-data-[state=filled]:bg-neutral-600',
                        'peer-focus:bg-nude-tone'
                    )}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
