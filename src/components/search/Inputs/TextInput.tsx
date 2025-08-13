import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { forwardRef, useId, useState } from 'react';

type BaseProps = {
    label?: string;
    className?: {
        label?: string;
        inputWrapper?: string;
        input?: string;
        container?: string;
    };
    helperText?: string;
    error?: boolean;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    variants?: 'primary';
};

export type TextInputProps = {
    multiline?: false;
} & BaseProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const TextInput = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    TextInputProps
>((props, ref) => {
    const {
        label,
        className,
        helperText,
        error,
        startAdornment,
        endAdornment,
        multiline = false,
        variants = 'primary',
        ...inputProps
    } = props;
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();

    return (
        <div
            className={cn(
                'flex flex-nowrap items-center gap-x-3 overflow-hidden rounded-full bg-white text-neutral-700',

                className?.inputWrapper
            )}>
            {startAdornment && <div>{startAdornment}</div>}

            <input
                id={id}
                className={cn(
                    'block flex-1 bg-transparent text-2xl text-neutral-500 caret-neutral-500 outline-none placeholder:font-bold placeholder:text-neutral-400',
                    className?.input
                )}
                // @ts-expect-error ref discrimination error
                ref={ref}
                type={'text'}
                {...{
                    ...inputProps,
                    onFocus: (e) => inputProps?.onFocus?.(e),
                    onBlur: (e) => inputProps?.onBlur?.(e),
                }}
            />
            {endAdornment && <div>{endAdornment}</div>}
        </div>
    );
});

TextInput.displayName = 'TextInput';
