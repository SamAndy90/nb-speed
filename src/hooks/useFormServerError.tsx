import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export function useFormServerError<T extends FieldValues>({
    form,
    state,
}: {
    form: UseFormReturn<T>;
    state: ({ success: true } | { success: false; error: string }) | null;
}) {
    useEffect(() => {
        console.log('State:', state);
        if (state && !state.success) {
            console.log('Setting error:', state.error);
            form.setError('root', {
                type: 'serverError',
                message: state.error,
            });
        }
    }, [form, state]);
}
