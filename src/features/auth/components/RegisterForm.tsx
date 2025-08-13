'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormFields, RegisterFormSchema } from '../schemas';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PropsWithChildren, useEffect, useState, useTransition } from 'react';
import { registerAction } from '../actions';
import { objectToFormData } from '@/lib/utils';
import { Spinner } from '@/components/Spinner';
import { Check, Eye, EyeOff } from 'lucide-react';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import { useFormState } from 'react-dom';
import { ServerError } from './ServerError';
import {
    CheckboxField,
    EmailField,
    InputField,
    PasswordField,
} from './form-fields';
import { useFormServerError } from '@/hooks/useFormServerError';
import { InnerForm } from './InnerForm';
import Link from 'next/link';

/**
 * The registration form for new customers.
 * Uses RHF and Zod for validation.
 * Submission is done through a server action
 */
export function RegisterForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useFormState(registerAction, null);
    const form = useForm<RegisterFormFields>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            agree: false,
        },
    });

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
                <InputField
                    control={form.control}
                    name="firstName"
                    placeholder="First name"
                    required
                />
                <InputField
                    control={form.control}
                    name="lastName"
                    placeholder="Last name"
                    required
                />

                <EmailField
                    control={form.control}
                    name="email"
                    placeholder="Your best email"
                />
                <PasswordField
                    control={form.control}
                    name="password"
                    placeholder="A strong password"
                />
                <CheckboxField control={form.control} name="agree" required>
                    <span className="text-neutral-600">
                        by creating an account I agree to the{' '}
                        <Link href="/legal/toc" target='_blank' className="underline">
                            T&Cs
                        </Link>
                    </span>
                </CheckboxField>
                <PrimaryFormSubmitButton
                    pending={pending}
                    submitSuccessful={submitSuccessful}>
                    Sign Up Now
                </PrimaryFormSubmitButton>
                <ServerError error={form.formState.errors?.root?.message} />
            </InnerForm>
        </Form>
    );
}
