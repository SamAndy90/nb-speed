import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    CreateAddressFormFields,
    CreateAddressFormSchema,
    UpdateAddressFormFields,
    UpdateAddressFormSchema,
} from '../../auth/schemas';
import { Form } from '@/components/ui/form';
import {
    FormSubmitButton,
    PrimaryFormSubmitButton,
} from '@/components/FormSubmitButton';
import { useEffect, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { objectToFormData } from '@/lib/utils';
import { ServerError } from '../../auth/components/ServerError';
import {
    InputField,
    LabelledSelectField,
} from '../../auth/components/form-fields';
import {
    MailingAddressFragment,
    MailingAddressInput,
} from '@/gql/storefront/graphql';
import countryList from '@/assets/shopify-countries.json';
import {
    createCustomerAddressAction,
    updateCustomerAddressAction,
} from '../../auth/actions';
import { useFormServerError } from '@/hooks/useFormServerError';
import { getFragmentData } from '@/gql/storefront';
import { addressFragment } from '@/features/shopify/graphql/storefront/fragments/address';
import { Checkbox } from '@/components/ui/checkbox';
type AddressFormProps<T extends MailingAddressInput | MailingAddressFragment> =
    (T extends MailingAddressFragment
        ? { address: MailingAddressFragment }
        : { address?: MailingAddressInput }) & {
        onSubmitSuccess: (newAddress: MailingAddressFragment) => void;
    };

export function CreateAddressForm({
    address,
    onSubmitSuccess,
}: AddressFormProps<MailingAddressInput>) {
    //RHF Doesn't play too nicely with server actions, but we can use a hybrid of RHF and server actions to track state

    const [pending, startTransition] = useTransition();
    const action = createCustomerAddressAction;

    const [state, formAction] = useFormState(action, null); //TODO: Should default state be null or an empty object?

    const form = useForm<CreateAddressFormFields>({
        resolver: zodResolver(CreateAddressFormSchema),
        defaultValues: {
            firstName: address?.firstName ?? '',
            lastName: address?.lastName ?? '',
            address1: address?.address1 ?? '',
            city: address?.city ?? '',
            country: address?.country ?? '',
            zip: address?.zip ?? '',
        },
    });

    /*
            We can use useFormStatus to check pending state, but the hook has to be used from a child component
            We can however check for errors and the return value of the form action in this component
        */

    const submitSuccessful = state?.success;

    useEffect(() => {
        if (submitSuccessful) {
            const data = state.data;

            console.log('Data:', data);
            const newAddress = getFragmentData(
                addressFragment,
                data.customerAddress
            );
            if (!newAddress) return;
            onSubmitSuccess(newAddress);
        }
    }, [state]);
    //Fire a toast on successful submission

    useFormServerError({ form, state });
    const [isDefault, setIsDefault] = useState(false);
    const [isDefaultBilling, setIsDefaultBilling] = useState(false);
    return (
        <Form {...form}>
            <form
                className="flex flex-col items-start gap-6"
                action={formAction}
                onSubmit={async (e) => {
                    form.handleSubmit((data) =>
                        startTransition(async () =>
                            formAction(objectToFormData(data))
                        )
                    )(e);
                }}>
                <div className="flex w-full flex-col flex-wrap gap-6 *:w-full *:grow md:flex-row *:md:basis-[40%]">
                    <InputField
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        placeholder="Your first name"
                    />
                    <InputField
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        placeholder="Your last name"
                    />

                    <InputField
                        control={form.control}
                        name="address1"
                        label="Address"
                    />

                    <InputField
                        control={form.control}
                        name="city"
                        label="City"
                    />
                    <LabelledSelectField
                        control={form.control}
                        name="country"
                        label="Country"
                        options={countryList}
                    />
                    <InputField
                        control={form.control}
                        name="zip"
                        label="Postal Code"
                    />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                    <Checkbox
                        checked={isDefault}
                        onCheckedChange={(value) =>
                            setIsDefault(value === true)
                        }
                    />
                    Set as default delivery address
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                    <Checkbox
                        checked={isDefaultBilling}
                        onCheckedChange={(value) =>
                            setIsDefaultBilling(value === true)
                        }
                    />
                    Set as default billing address
                </div>
                <FormSubmitButton
                    className="w-fit"
                    variant="dark"
                    pending={pending}
                    submitSuccessful={submitSuccessful}
                    size="sm">
                    Save Address
                </FormSubmitButton>
                <ServerError error={form.formState.errors?.root?.message} />
            </form>
        </Form>
    );
}

export function UpdateAddressForm({
    address,
    onSubmitSuccess,
}: AddressFormProps<MailingAddressFragment>) {
    //RHF Doesn't play too nicely with server actions, but we can use a hybrid of RHF and server actions to track state

    const [pending, startTransition] = useTransition();

    const [state, formAction] = useFormState(updateCustomerAddressAction, null); //TODO: Should default state be null or an empty object?

    const form = useForm<UpdateAddressFormFields>({
        resolver: zodResolver(UpdateAddressFormSchema),
        defaultValues: {
            addressId: address.id,
            firstName: address?.firstName ?? '',
            lastName: address?.lastName ?? '',
            address1: address?.address1 ?? '',
            city: address?.city ?? '',
            country: address?.country ?? '',
            zip: address?.zip ?? '',
        },
    });

    /*
            We can use useFormStatus to check pending state, but the hook has to be used from a child component
            We can however check for errors and the return value of the form action in this component
        */

    const submitSuccessful = state?.success;

    useEffect(() => {
        if (submitSuccessful) {
            const data = state.data;
            const newAddress = getFragmentData(
                addressFragment,
                data.customerAddress
            );
            if (!newAddress) return;
            onSubmitSuccess(newAddress);
        }
    }, [state]);
    //Fire a toast on successful submission

    useFormServerError({ form, state });
    const [isDefault, setIsDefault] = useState(false);
    const [isDefaultBilling, setIsDefaultBilling] = useState(false);
    return (
        <Form {...form}>
            <form
                className="flex flex-col items-start gap-6"
                action={formAction}
                onSubmit={async (e) => {
                    form.handleSubmit((data) =>
                        startTransition(async () =>
                            formAction(objectToFormData(data))
                        )
                    )(e);
                }}>
                <div className="flex w-full flex-col flex-wrap gap-6 *:w-full *:grow md:flex-row *:md:basis-[40%]">
                    <InputField
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        placeholder="Your first name"
                    />
                    <InputField
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        placeholder="Your last name"
                    />

                    <InputField
                        control={form.control}
                        name="address1"
                        label="Address"
                    />

                    <InputField
                        control={form.control}
                        name="city"
                        label="City"
                    />
                    <LabelledSelectField
                        control={form.control}
                        name="country"
                        label="Country"
                        options={countryList}
                    />
                    <InputField
                        control={form.control}
                        name="zip"
                        label="Postal Code"
                    />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                    <Checkbox
                        checked={isDefault}
                        onCheckedChange={(value) =>
                            setIsDefault(value === true)
                        }
                    />
                    Set as default delivery address
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                    <Checkbox
                        checked={isDefaultBilling}
                        onCheckedChange={(value) =>
                            setIsDefaultBilling(value === true)
                        }
                    />
                    Set as default billing address
                </div>
                <FormSubmitButton
                    className="w-fit"
                    variant="dark"
                    pending={pending}
                    submitSuccessful={submitSuccessful}
                    size="sm">
                    Save Address
                </FormSubmitButton>
                <ServerError error={form.formState.errors?.root?.message} />
            </form>
        </Form>
    );
}
