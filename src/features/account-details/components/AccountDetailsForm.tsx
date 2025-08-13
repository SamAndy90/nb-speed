'use client';

import {
    UpdatePasswordFormFields,
    UpdatePasswordFormSchema,
} from '../../auth/schemas';
import { updateCustomerPasswordAction } from '../../auth/actions';
import { PasswordField } from '../../auth/components/form-fields';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { PASSWORD_UPDATED_SUCCESS_TOAST_MESSAGE } from '../consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    AccountDetailsFormFields,
    AccountDetailsFormSchema,
} from '@/features/auth/schemas';
import { Form } from '@/components/ui/form';
import { updateCustomerAction } from '@/features/auth/actions';
import { FormSubmitButton } from '@/components/FormSubmitButton';
import { useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { objectToFormData } from '@/lib/utils';
import { ServerError } from '@/features/auth/components/ServerError';
import { EmailField, InputField } from '@/features/auth/components/form-fields';
import { CustomerUpdateInput } from '@/gql/storefront/graphql';
import { useFormServerError } from '@/hooks/useFormServerError';
import { toast } from 'sonner';
import { getFragmentData } from '@/gql/storefront';
import { customerFragment } from '@/features/shopify/graphql/storefront/fragments/customer';
import { ACCOUNT_UPDATED_SUCCESS_TOAST_MESSAGE } from '../consts';
export const FORM_RESET_DELAY = 3000;
/**
 * Update account details form
 * Uses RHF and Zod for validation.
 * Submission is done through a server action
 */
export function AccountDetailsForm({
    currentCustomer,
}: {
    currentCustomer: CustomerUpdateInput;
}) {
    //RHF Doesn't play too nicely with server actions, but we can use a hybrid of RHF and server actions to track state
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(updateCustomerAction, null); //TODO: Should default state be null or an empty object?

    const form = useForm<AccountDetailsFormFields>({
        resolver: zodResolver(AccountDetailsFormSchema),
        defaultValues: {
            email: currentCustomer.email ?? '',
            oldEmail: currentCustomer.email ?? '',
            firstName: currentCustomer.firstName ?? '',
            lastName: currentCustomer.lastName ?? '',
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
            toast.success(ACCOUNT_UPDATED_SUCCESS_TOAST_MESSAGE);

            timeoutId = setTimeout(() => {
                const newCustomer = getFragmentData(
                    customerFragment,
                    state.data.customer
                );
                if (newCustomer) {
                    form.reset({
                        email: newCustomer.email ?? '',
                        oldEmail: newCustomer.email ?? '',
                        firstName: newCustomer.firstName ?? '',
                        lastName: newCustomer.lastName ?? '',
                    });
                }
            }, FORM_RESET_DELAY);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [submitSuccessful]);
    return (
        <>
            <Form {...form}>
                <form
                    className="flex w-full flex-col gap-8"
                    action={formAction}
                    onSubmit={async (e) => {
                        form.handleSubmit((data) =>
                            startTransition(() => {
                                formAction(objectToFormData(data));
                            })
                        )(e);
                    }}>
                    <div
                        className="flex w-full grid-cols-2 grid-rows-3 flex-col gap-4 lg:grid"
                        style={{ gridAutoFlow: 'column' }}>
                        <InputField
                            control={form.control}
                            name="firstName"
                            placeholder="Your first name"
                            label="First Name"
                        />
                        <InputField
                            control={form.control}
                            name="lastName"
                            placeholder="Your last name"
                            label="Last Name"
                        />
                        <EmailField
                            control={form.control}
                            name="email"
                            label="Email"
                        />
                        <PasswordField
                            control={form.control}
                            name="currentPassword"
                            placeholder="..."
                            label="Current Password"
                            required={false}
                        />
                        <PasswordField
                            control={form.control}
                            name="newPassword"
                            placeholder="..."
                            label="New Password"
                            required={false}
                        />
                        <PasswordField
                            control={form.control}
                            name="confirmNewPassword"
                            placeholder="..."
                            label="Confirm New Password"
                            required={false}
                        />
                    </div>
                    <div className="flex justify-end">
                        <FormSubmitButton
                            pending={pending}
                            disabled={!form.formState.isDirty}
                            submitSuccessful={submitSuccessful}
                            variant="dark"
                            size="sm"
                            className="gap-2 text-sm">
                            Save Changes <ChevronRight className="size-4" />
                        </FormSubmitButton>
                    </div>
                    <ServerError error={form.formState.errors?.root?.message} />
                </form>
            </Form>
        </>
    );
}

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
                <ServerError error={form.formState.errors?.root?.message} />
            </form>
        </Form>
    );
}
