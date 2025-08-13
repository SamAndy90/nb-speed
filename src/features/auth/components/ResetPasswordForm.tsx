'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordFormFields, ResetPasswordFormSchema } from '../schemas';
import { Form } from '@/components/ui/form';
import { recoverCustomerAction, resetPasswordAction } from '../actions';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import { useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { objectToFormData } from '@/lib/utils';
import { ServerError } from './ServerError';
import { PasswordField } from './form-fields';
import { useQueryState, parseAsString } from 'nuqs';
import { useFormServerError } from '@/hooks/useFormServerError';
import { InnerForm } from './InnerForm';

//TODO: Should the token be a field here?
/**
 * Customer login form
 * Uses RHF and Zod for validation.
 * Submission is done through a server action
 */
export function ResetPasswordForm() {
    //RHF Doesn't play too nicely with server actions, but we can use a hybrid of RHF and server actions to track state
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(resetPasswordAction, null); //TODO: Should default state be null or an empty object?
    /*const [resetToken, setResetToken] = useQueryState('token', {
        defaultValue: '',
    });
    const [customerId, setCustomerId] = useQueryState('id', {
        defaultValue: '',
    });*/
    const [url, setUrl] = useQueryState('url', { defaultValue: '' });
    const form = useForm<ResetPasswordFormFields>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
            url,
        },
    });

    /*useEffect(() => {
        form.setValue('resetToken', resetToken);
    }, [resetToken, form]);
    useEffect(() => {
        form.setValue('customerId', customerId);
    }, [customerId, form]);*/

    useEffect(() => {
        form.setValue('url', url);
    }, [url, form]);
    /*
        We can use useFormStatus to check pending state, but the hook has to be used from a child component
        We can however check for errors and the return value of the form action in this component

    */
    const submitSuccessful = state?.success;
    useFormServerError({ form, state });

    return (
        <Form {...form}>
            <InnerForm
                action={formAction}
                onSubmit={async (e) => {
                    form.handleSubmit((data) =>
                        startTransition(async () => {
                            formAction(objectToFormData(data));
                        })
                    )(e);
                }}>
                <PasswordField control={form.control} name="password" />
                <PasswordField control={form.control} name="confirmPassword" />
                <PrimaryFormSubmitButton
                    pending={pending}
                    submitSuccessful={submitSuccessful}>
                    Reset Password
                </PrimaryFormSubmitButton>
                <ServerError error={form.formState.errors?.root?.message} />
            </InnerForm>
        </Form>
    );
}
