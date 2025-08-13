import { Check } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Spinner } from './Spinner';
import { Button, ButtonProps } from './ui/button';
import { FormStatus } from '@/types';
import { PrimaryButton } from './PrimaryButton';
import { cn } from '@/lib/utils';

type FormSubmitButtonProps = {
    disabled?: boolean;
    hasError?: boolean;
    submitSuccessful?: boolean;
    pending?: boolean;
} & PropsWithChildren;

/**
 * Button that submits a form, and shows dynamic content (e.g. a spinner) based on the form status
 */
export function FormSubmitButton({
    disabled = false,
    hasError = false,
    submitSuccessful = false,
    pending = false,
    children = 'Submit',
    className,
    ...props
}: FormSubmitButtonProps & ButtonProps) {
    const status: FormStatus = hasError
        ? 'error'
        : submitSuccessful
          ? 'success'
          : pending
            ? 'pending'
            : 'idle';

    return (
        <Button
            type="submit"
            className={cn('flex items-center justify-center', className)}
            disabled={status === 'pending' || disabled}
            {...props}>
            <FormSubmitText status={status}>{children}</FormSubmitText>
        </Button>
    );
}
/**
 * Button that submits a form, and shows dynamic content (e.g. a spinner) based on the form status
 */
export function PrimaryFormSubmitButton({
    disabled = false,
    hasError = false,
    submitSuccessful = false,
    pending = false,
    children = 'Submit',
}: FormSubmitButtonProps) {
    const status: FormStatus = hasError
        ? 'error'
        : submitSuccessful
          ? 'success'
          : pending
            ? 'pending'
            : 'idle';

    return (
        <PrimaryButton
            type="submit"
            className="mt-3 w-full md:text-base"
            innerClassName="min-h-[46px]"
            disabled={status === 'pending' || disabled}>
            <FormSubmitText status={status}>{children}</FormSubmitText>
        </PrimaryButton>
    );
}

function FormSubmitText({
    status = 'idle',
    children,
}: { status?: FormStatus } & PropsWithChildren) {
    if (status === 'pending') return <Spinner />;
    if (status === 'success') return <Check />;
    return <>{children}</>;
}
