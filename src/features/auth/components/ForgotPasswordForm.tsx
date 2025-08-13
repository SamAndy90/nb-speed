'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ForgotPasswordFormFields, ForgotPasswordFormSchema } from '../schemas';
import { Form } from '@/components/ui/form';
import { recoverCustomerAction } from '../actions';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import { useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { objectToFormData } from '@/lib/utils';
import { ServerError } from './ServerError';
import { EmailField } from './form-fields';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Heading,
    HeadingTitle,
    HeadingDescription,
} from '@/components/Heading';
import { useFormServerError } from '@/hooks/useFormServerError';
import { InnerForm } from './InnerForm';
import { PrimaryButton } from '@/components/PrimaryButton';

function Success() {
    return (
        <>
            <Heading>
                <HeadingTitle>Forgot Password</HeadingTitle>
                <HeadingDescription>
                    Check your email for a link to reset your password. If it
                    doesn’t appear within a few minutes, check your spam folder
                </HeadingDescription>
            </Heading>
            <div className="flex max-w-screen-sm flex-col items-center justify-center gap-8 text-center">
                <PrimaryButton asChild className="mt-3 w-60 max-w-full">
                    <Link href="/account/login">Back to login</Link>
                </PrimaryButton>
            </div>
        </>
    );
}

/**
 * Customer login form
 * Uses RHF and Zod for validation.
 * Submission is done through a server action
 */
export function ForgotPasswordForm() {
    //RHF Doesn't play too nicely with server actions, but we can use a hybrid of RHF and server actions to track state
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(recoverCustomerAction, null); //TODO: Should default state be null or an empty object?
    const form = useForm<ForgotPasswordFormFields>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    });

    /*
        We can use useFormStatus to check pending state, but the hook has to be used from a child component
        We can however check for errors and the return value of the form action in this component
    */

    const submitSuccessful = state?.success;
    useFormServerError({ form, state });
    if (submitSuccessful) {
        return <Success />;
    }
    return (
        <>
            <Heading>
                <HeadingTitle>Forgot Password</HeadingTitle>
                <HeadingDescription>
                    Enter your account’s email and we’ll send you an email to
                    reset the password.
                </HeadingDescription>
            </Heading>
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
                    <EmailField control={form.control} name="email" />

                    <PrimaryFormSubmitButton
                        pending={pending}
                        submitSuccessful={submitSuccessful}>
                        Send Password Reset
                    </PrimaryFormSubmitButton>
                    <ServerError error={form.formState.errors?.root?.message} />
                </InnerForm>
            </Form>
        </>
    );
}
