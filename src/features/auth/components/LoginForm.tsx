'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { LoginFormFields, LoginFormSchema } from '../schemas';
import { Form } from '@/components/ui/form';
import { loginAction } from '../actions';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import { useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { objectToFormData } from '@/lib/utils';
import { ServerError } from './ServerError';
import { CheckboxField, EmailField, PasswordField } from './form-fields';

/**
 * Customer login form
 * Uses RHF and Zod for validation.
 * Submission is done through a server action
 */
export function LoginForm() {
    //RHF Doesn't play too nicely with server actions, but we can use a hybrid of RHF and server actions to track state
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(loginAction, null); //TODO: Should default state be null or an empty object?
    const form = useForm<LoginFormFields>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    /*
        We can use useFormStatus to check pending state, but the hook has to be used from a child component
        We can however check for errors and the return value of the form action in this component

    */

    const submitSuccessful = state?.success;

    useEffect(() => {
        if (state && !state.success) {
            form.setError('root', {
                type: 'serverError',
                message: state.error,
            });
        }
    }, [form, state]);

    return (
        <Form {...form}>
            <form
                className="md:mt mb-6 mt-10 flex w-full max-w-sm flex-col gap-3"
                action={formAction}
                onSubmit={async (e) => {
                    form.handleSubmit((data) =>
                        startTransition(async () => {
                            formAction(objectToFormData(data));
                        })
                    )(e);
                }}>
                <EmailField control={form.control} name="email" />
                <PasswordField control={form.control} name="password" />
                <PrimaryFormSubmitButton
                    pending={pending}
                    submitSuccessful={submitSuccessful}>
                    Login
                </PrimaryFormSubmitButton>
                <ServerError error={form.formState.errors?.root?.message} />
            </form>
        </Form>
    );
}
