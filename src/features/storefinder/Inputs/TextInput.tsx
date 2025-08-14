import { cn } from '@/lib/utils';
import { forwardRef, useId, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

type BaseProps = {
    className?: {
        inputWrapper?: string;
        input?: string;
    };
    startIcon?: React.ReactNode;
};

export type TextInputProps = BaseProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const TextInput = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    TextInputProps
>((props, ref) => {
    const { className, startIcon, ...inputProps } = props;
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();

    return (
        <div
            className={cn(
                'group flex h-11 flex-nowrap items-center gap-x-2 overflow-hidden rounded-full border border-[#1E1E1E]/70 px-3 transition-colors',
                {
                    'hover:border-[#1E1E1E]': !isFocused,
                    'border-grad-cooper': isFocused,
                },
                className?.inputWrapper
            )}>
            <div>
                <IoIosSearch
                    className={
                        'size-5 text-[#1E1E1E]/70 group-focus-within:text-[#1E1E1E]'
                    }
                />
            </div>

            <input
                id={id}
                className={cn(
                    'mr-1.5 block flex-1 text-[#1E1E1E] outline-none placeholder:line-clamp-1 placeholder:text-paragraph-4 placeholder:font-bold placeholder:text-[#1E1E1E]/70 focus:placeholder:text-[#1E1E1E]',
                    className?.input
                )}
                // @ts-expect-error ref discrimination error
                ref={ref}
                type={inputProps.type ?? 'text'}
                {...{
                    ...inputProps,
                    onFocus: (e) => {
                        inputProps?.onFocus?.(e);
                        setIsFocused(true);
                    },
                    onBlur: (e) => {
                        inputProps?.onBlur?.(e);
                        setIsFocused(false);
                    },
                }}
            />
        </div>
    );
});

TextInput.displayName = 'TextInput';
