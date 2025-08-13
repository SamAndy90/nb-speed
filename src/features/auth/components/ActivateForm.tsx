'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordFormFields, ResetPasswordFormSchema } from '../schemas';
import { Form } from '@/components/ui/form';
import { resetPasswordAction } from '../actions';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import { useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { objectToFormData } from '@/lib/utils';
import { ServerError } from './ServerError';
import { PasswordField } from './form-fields';
import { useQueryState } from 'nuqs';
import { useFormServerError } from '@/hooks/useFormServerError';
import { InnerForm } from './InnerForm';

export function ActivateForm() {
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(resetPasswordAction, null);
    const [url, setUrl] = useQueryState('url', { defaultValue: '' });
    const form = useForm<ResetPasswordFormFields>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
            url,
        },
    });

    useEffect(() => {
        form.setValue('url', url);
    }, [url, form]);

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
                <PasswordField
                    placeholder="Confirm password"
                    control={form.control}
                    name="confirmPassword"
                />
                <PrimaryFormSubmitButton
                    pending={pending}
                    submitSuccessful={submitSuccessful}>
                    Activate account
                </PrimaryFormSubmitButton>
                <ServerError error={form.formState.errors?.root?.message} />
            </InnerForm>
        </Form>
    );
}
