'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RechargeAddress } from '@/lib/recharge/types';
import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import {
    InputField,
    LabelledSelectField,
} from '@/features/auth/components/form-fields';
import { ServerError } from '@/features/auth/components/ServerError';
import countryList from '@/assets/shopify-countries.json';
import { createAddressAction, validateAddressAction } from '../actions';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getCountryByCode, getCountryCodeByName } from '@/lib/data/countries';

const addressFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    address1: z.string().min(1, 'Address is required'),
    address2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    company: z.string().optional(),
    country: z.string().min(1, 'Country is required'),
    province: z.string().min(1, 'Province/State is required'),
    zip: z.string().min(1, 'Postal code is required'),
    phone: z.string().optional(),
});

type AddressFormFields = z.infer<typeof addressFormSchema>;

interface CreateAddressFormProps {
    customerId: number;
    address?: Partial<RechargeAddress>;
    onSubmitSuccess: (newAddress: RechargeAddress) => void;
}

export function CreateAddressForm({
    customerId,
    address,
    onSubmitSuccess,
}: CreateAddressFormProps) {
    const [isPending, startTransition] = useTransition();
    const [showValidationDialog, setShowValidationDialog] = useState(false);
    const [validatedAddress, setValidatedAddress] = useState<any>(null);
    const [originalAddress, setOriginalAddress] = useState<any>(null);

    const form = useForm<AddressFormFields>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            firstName: address?.first_name ?? '',
            lastName: address?.last_name ?? '',
            address1: address?.address1 ?? '',
            address2: address?.address2 ?? '',
            city: address?.city ?? '',
            company: address?.company ?? '',
            country: address?.country_code
                ? (getCountryByCode(address?.country_code)?.name ?? '')
                : '',
            province: address?.province ?? '',
            zip: address?.zip ?? '',
            phone: address?.phone ?? '',
        },
    });

    const selectedCountry = form.watch('country');
    const isUSAddress =
        selectedCountry === 'US' ||
        selectedCountry === 'USA' ||
        selectedCountry === 'United States';

    const handleValidateAndSave = async (data: AddressFormFields) => {
        if (!isUSAddress) {
            await handleSaveAddress(false, data);
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            formData.append('address1', data.address1);
            formData.append('city', data.city);
            formData.append('state', data.province);
            formData.append('zipcode', data.zip);

            const validationResult = await validateAddressAction(formData);

            if (validationResult.success && validationResult.validatedAddress) {
                setOriginalAddress({
                    city: data.city,
                    province: data.province,
                    zip: data.zip,
                });
                setValidatedAddress(validationResult.validatedAddress);
                setShowValidationDialog(true);
            } else {
                // If validation fails, proceed with original address
                await handleSaveAddress(false, data);
            }
        });
    };

    const handleSaveAddress = async (
        useValidated: boolean,
        formData?: AddressFormFields
    ) => {
        const currentData = formData || form.getValues();
        const finalData = useValidated
            ? {
                  ...currentData,
                  city: validatedAddress.city,
                  province: validatedAddress.state,
                  zip: validatedAddress.zipcode,
              }
            : currentData;

        startTransition(async () => {
            const submitFormData = new FormData();
            submitFormData.append('firstName', finalData.firstName);
            submitFormData.append('lastName', finalData.lastName);
            submitFormData.append('address1', finalData.address1);
            submitFormData.append('address2', finalData.address2 || '');
            submitFormData.append('city', finalData.city);
            submitFormData.append('company', finalData.company || '');
            submitFormData.append(
                'country',
                getCountryCodeByName(finalData.country) || ''
            );
            submitFormData.append('province', finalData.province);
            submitFormData.append('zip', finalData.zip);
            submitFormData.append('phone', finalData.phone || '');

            const result = await createAddressAction(
                customerId,
                submitFormData
            );
            // const result = address?.id
            //     ? await updateAddressAction(address.id, submitFormData)
            //     : await createAddressAction(customerId, submitFormData);

            if (result.success && result.data) {
                onSubmitSuccess(result.data);
                toast.success(
                    address?.id
                        ? 'Address updated successfully'
                        : 'Address added successfully'
                );
                setShowValidationDialog(false);
            } else {
                toast.error(result.error || 'Failed to save address');
            }
        });
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleValidateAndSave)}
                    className="flex flex-col items-start gap-6">
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
                            name="address2"
                            label="Address 2 (Optional)"
                        />
                        <InputField
                            control={form.control}
                            name="city"
                            label="City"
                        />
                        <InputField
                            control={form.control}
                            name="company"
                            label="Company (Optional)"
                        />
                        <LabelledSelectField
                            control={form.control}
                            name="country"
                            label="Country"
                            options={countryList}
                        />
                        <InputField
                            control={form.control}
                            name="province"
                            label="Province/State"
                        />
                        <InputField
                            control={form.control}
                            name="zip"
                            label="Postal Code"
                        />
                        <InputField
                            control={form.control}
                            name="phone"
                            label="Phone"
                        />
                    </div>

                    <ServerError error={form.formState.errors?.root?.message} />

                    {isUSAddress && (
                        <p className="text-xs text-neutral-500">
                            US addresses will be validated before saving
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="dark"
                        size="md"
                        className="h-[34px]"
                        disabled={isPending}>
                        {isPending
                            ? 'Processing...'
                            : isUSAddress
                              ? 'Validate & Save Address'
                              : 'Save Address'}
                    </Button>
                </form>
            </Form>

            <Dialog
                open={showValidationDialog}
                onOpenChange={setShowValidationDialog}>
                <DialogContent>
                    <DialogTitle>Address Validation</DialogTitle>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold">
                                Suggested Address:
                            </h3>
                            <p>
                                {validatedAddress?.city},{' '}
                                {validatedAddress?.state_name}
                            </p>
                            <p>{validatedAddress?.zipcode}</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold">Original Address:</h3>
                            <p>
                                {originalAddress?.city},{' '}
                                {originalAddress?.province}
                            </p>
                            <p>{originalAddress?.zip}</p>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => handleSaveAddress(false)}>
                                Use Original
                            </Button>
                            <Button
                                variant="dark"
                                onClick={() => handleSaveAddress(true)}>
                                Use Suggested
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
