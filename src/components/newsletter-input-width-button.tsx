'use client';

import React, { MouseEvent, ReactNode, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormStatus, useFormState } from 'react-dom';
import { subscribeToNewsletter } from '@/actions/klaviyo';
import { toast } from 'sonner';


export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startAddon?: ReactNode;
    onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const initialState = {
    success: false,
    error: null,
    message: null,
};

const NewsletterInputWithButton = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type = 'email', startAddon, onButtonClick, className, ...props }, ref) => {
        // @ts-ignore
        const [state, formAction] = useFormState(subscribeToNewsletter, initialState);
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (state.success) {
                toast.success('Success 🎉', {
                    description: 'Please head to your email and confirm your subscription.',
                    duration: 3000,
                });
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            } else if (state.error) {
                toast.error('Error', {
                    description: state.error,
                    duration: 3000,
                });
            }
        }, [state]);

        const isSuccess = state.success;

        return (
            <div className="relative space-y-2">
                <form action={formAction}>
                    <div className={cn(
                        "group relative flex w-full max-w-[304px] items-center overflow-clip rounded-full border border-border bg-primary-white p-px *:duration-700",
                        className
                    )}>
                        {/* Left Button - Hidden by default, appears on hover */}
                        <Button
                            className={cn(
                                'absolute left-[-100%] z-20 size-[calc(3.5rem-8px)] rounded-full bg-gradient-2 transition-all',
                                !isSuccess && 'group-hover:left-1'
                            )}
                            size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        {/* Input */}
                        {startAddon && (
                            <span className="absolute left-4 z-10 text-neutral-400 pointer-events-none">{startAddon}</span>
                        )}
                        <input
                            className={cn(
                                'peer/input z-10 h-14 w-full rounded-full pl-4 pr-[calc(3.5rem+4px)] outline-none text-paragraph-4 placeholder:text-neutral-400 md:text-paragraph-3 transition-all',
                                isSuccess ? '' : 'group-hover:pl-[calc(3.5rem+8px)]', // Adjusted padding to match image
                                startAddon && 'pl-10'
                            )}
                            ref={inputRef}
                            type={type}
                            name="email"
                            placeholder="Your best email"
                            required
                            {...props}
                        />

                        {/* Submit Button */}
                        <SubmitButton
                            onClick={onButtonClick}
                            isSuccess={isSuccess}
                        />

                        {/* Background layer */}
                        <div
                            className={cn(
                                'absolute inset-0 size-full rounded-full transition-all animate-in fade-in',
                                isSuccess
                                    ? 'bg-success-600'
                                    : 'bg-primary-white peer-focus/input:bg-gradient-3'
                            )}
                        />
                    </div>
                </form>
            </div>
        );
    }
);

function SubmitButton({
                          onClick,
                          isSuccess
                      }: {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    isSuccess?: boolean;
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            variant="icon"
            size="inline"
            type="submit"
            disabled={pending}
            className={cn(
                'absolute right-1 z-20 size-[calc(3.5rem-8px)] rounded-full transition-all',
                isSuccess
                    ? 'bg-transparent text-success-600'
                    : 'bg-gradient-2 group-hover:right-[-100%]'
            )}
            onClick={onClick}>
            { pending ? (
                <span className="animate-spin">⌀</span>
            ) : isSuccess ? (
                <Check className="h-4 w-4" />
            ) : (
                <ChevronRight className="h-4 w-4" />
            )}
        </Button>
    );
}

NewsletterInputWithButton.displayName = 'NewsletterInputWithButton';
export default NewsletterInputWithButton;