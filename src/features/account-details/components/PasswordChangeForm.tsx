'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    UpdatePasswordFormFields,
    UpdatePasswordFormSchema,
} from '../../auth/schemas';
import { Form } from '@/components/ui/form';
import { updateCustomerPasswordAction } from '../../auth/actions';
import {
    FormSubmitButton,
    PrimaryFormSubmitButton,
} from '@/components/FormSubmitButton';
import { useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { objectToFormData } from '@/lib/utils';
import { ServerError } from '../../auth/components/ServerError';
import { PasswordField } from '../../auth/components/form-fields';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Heading,
    HeadingTitle,
    HeadingDescription,
} from '@/components/Heading';
import { useFormServerError } from '@/hooks/useFormServerError';
import { toast } from 'sonner';
import { FORM_RESET_DELAY } from './AccountDetailsForm';
import { PASSWORD_UPDATED_SUCCESS_TOAST_MESSAGE } from '../consts';

/**
 * Update account details form
 * Uses RHF and Zod for validation.
 * Submission is done through a server action
 */
export function UpdatePasswordForm({ currentEmail }: { currentEmail: string }) {
    //RHF Doesn't play too nicely with server actions, but we can use a hybrid of RHF and server actions to track state
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(
        updateCustomerPasswordAction,
        null
    ); //TODO: Should default state be null or an empty object?
    const form = useForm<UpdatePasswordFormFields>({
        resolver: zodResolver(UpdatePasswordFormSchema),
        defaultValues: {
            email: currentEmail,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    /*
        We can use useFormStatus to check pending state, but the hook has to be used from a child component
        We can however check for errors and the return value of the form action in this component

    */

    const submitSuccessful =
        state?.success && form.formState.isSubmitSuccessful;

    useFormServerError({ form, state });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (submitSuccessful) {
            toast.success(PASSWORD_UPDATED_SUCCESS_TOAST_MESSAGE);

            //TODO: Does the password change form also need to be reset after a delay?
            timeoutId = setTimeout(() => {
                form.reset({});
            }, FORM_RESET_DELAY);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [submitSuccessful]);

    return (
        <Form {...form}>
            <form
                className="w-full space-y-6"
                action={formAction}
                onSubmit={async (e) => {
                    form.handleSubmit((data) =>
                        startTransition(async () => {
                            formAction(objectToFormData(data));
                        })
                    )(e);
                }}>
                <PasswordField
                    control={form.control}
                    name="currentPassword"
                    placeholder="..."
                    label="Current Password"
                />
                <PasswordField
                    control={form.control}
                    name="newPassword"
                    placeholder="..."
                    label="New Password"
                />
                <PasswordField
                    control={form.control}
                    name="confirmNewPassword"
                    placeholder="..."
                    label="Confirm New Password"
                />
                <FormSubmitButton
                    pending={pending}
                    submitSuccessful={submitSuccessful}
                    variant="dark"
                    size="sm"
                    className="text-sm">
                    Update Password
                </FormSubmitButton>
                <ServerError error={form.formState.errors?.root?.message} />
            </form>
        </Form>
    );
}
