'use server';

import {
    addressService,
    paymentMethodService,
    subscriptionService,
} from '@/lib/recharge/client';
import { revalidatePath } from 'next/cache';
import { ActionState } from '@/types';
import {
    AddressCreateInput,
    PaymentType,
    RechargeAddress,
    RechargePaymentMethod,
    RechargeSubscription,
} from '@/lib/recharge';
import { paymentMethodSchema } from './schemas';
import { SUBSCRIPTION_CANCEL_REASON } from './utils';

export async function pauseSubscription(subscriptionId: number) {
    try {
        await subscriptionService.cancel(
            subscriptionId,
            SUBSCRIPTION_CANCEL_REASON.PAUSE
        );
        revalidatePath(`/account/subscriptions/${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to pause subscription:', error);
        return { success: false, error };
    }
}

export async function cancelSubscription(subscriptionId: number) {
    try {
        await subscriptionService.cancel(
            subscriptionId,
            SUBSCRIPTION_CANCEL_REASON.CANCEL
        );
        revalidatePath(`/account/subscriptions/${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
        return { success: false, error };
    }
}

export async function listChargesByCustomerId(customerId: number) {
    try {
        const charges =
            await subscriptionService.listChargesByCustomerId(customerId);
        return charges;
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
        return { success: false, error };
    }
}

export async function listChargeByPurchaseItemId(purchaseItemId: number) {
    try {
        const charges =
            await subscriptionService.listChargesByPurchaseItemId(
                purchaseItemId
            );
        return charges;
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
        return { success: false, error };
    }
}

export async function skipSubscription(
    subscriptionId: number,
    chargeId: number
) {
    try {
        await subscriptionService.skip(chargeId, subscriptionId);
        revalidatePath(`/account/subscriptions/${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
        return { success: false, error };
    }
}

export async function changeSubscriptionNextChargeDate(
    subscriptionId: number,
    date: string
) {
    try {
        await subscriptionService.changeNextChargeDate(subscriptionId, date);
        revalidatePath(`/account/subscriptions/${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
        return { success: false, error };
    }
}

export async function activateSubscription(subscriptionId: number) {
    try {
        await subscriptionService.activate(subscriptionId);
        revalidatePath(`/account/subscriptions/${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to activate subscription:', error);
        return { success: false, error };
    }
}

export async function updateSubscriptionFrequency(
    subscriptionId: number,
    charge_interval_frequency: number,
    order_interval_unit: RechargeSubscription['order_interval_unit']
) {
    try {
        await subscriptionService.update(subscriptionId, {
            charge_interval_frequency,
            order_interval_unit,
            order_interval_frequency: charge_interval_frequency, // Keep these in sync
        });
        revalidatePath(`/account/subscriptions/${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to update subscription frequency:', error);
        return { success: false, error };
    }
}

export async function updateSubscriptionAddress(
    subscriptionId: number,
    addressId: number
) {
    try {
        await subscriptionService.changeAddress(
            subscriptionId,
            Number(addressId)
        );
        revalidatePath(`/account/subscriptions/${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to update subscription frequency:', error);
        return { success: false, error };
    }
}

type AddressActionResponse = {
    success: boolean;
    data?: RechargeAddress;
    error?: string;
};

export async function validateAddressAction(formData: FormData): Promise<{
    success: boolean;
    validatedAddress?: {
        city: string;
        state: string;
        state_name: string;
        zipcode: string;
    };
    error?: string;
}> {
    try {
        // Only validate US addresses
        const addressValidation = {
            address1: formData.get('address1') as string,
            city: formData.get('city') as string,
            state: formData.get('province') as string,
            zipcode: formData.get('zip') as string,
        };

        const validationResult =
            await addressService.validate(addressValidation);

        return {
            success:
                !validationResult.errors ||
                Object.keys(validationResult.errors).length === 0,
            validatedAddress: validationResult.errors
                ? undefined
                : {
                      city: validationResult.city,
                      state: validationResult.state,
                      state_name: validationResult.state_name,
                      zipcode: validationResult.zipcode,
                  },
        };
    } catch (error) {
        console.error('Error validating address:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to validate address',
        };
    }
}

export async function createAddressAction(
    customerId: number,
    formData: FormData
): Promise<AddressActionResponse> {
    try {
        const addressData: AddressCreateInput = {
            customer_id: customerId,
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            address1: formData.get('address1') as string,
            city: formData.get('city') as string,
            country_code: formData.get('country') as string,
            province: formData.get('province') as string,
            zip: formData.get('zip') as string,
            phone: (formData.get('phone') as string) || '',
            address2: (formData.get('address2') as string) || undefined,
            company: (formData.get('company') as string) || undefined,
        };

        const requiredFields = [
            'customer_id',
            'first_name',
            'last_name',
            'address1',
            'city',
            'country_code',
            'province',
            'zip',
            'phone',
        ];
        const missingFields = requiredFields.filter(
            (field) => !addressData[field as keyof AddressCreateInput]
        );

        if (missingFields.length > 0) {
            return {
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`,
            };
        }

        const response = await addressService.create(customerId, addressData);

        if (!response.address) {
            return {
                success: false,
                error: 'Failed to create address: No address data returned',
            };
        }

        return {
            success: true,
            data: response.address,
        };
    } catch (error) {
        console.error('Error creating address:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to create address',
        };
    }
}

export async function updateAddressAction(
    addressId: number,
    formData: FormData
): Promise<AddressActionResponse> {
    try {
        const addressData: Partial<AddressCreateInput> = {
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            address1: formData.get('address1') as string,
            city: formData.get('city') as string,
            country_code: formData.get('country') as string,
            province: formData.get('province') as string,
            zip: formData.get('zip') as string,
            phone: (formData.get('phone') as string) || '',
            address2: (formData.get('address2') as string) || undefined,
            company: (formData.get('company') as string) || undefined,
        };

        // Remove undefined values
        Object.keys(addressData).forEach((key) => {
            if (addressData[key as keyof typeof addressData] === undefined) {
                delete addressData[key as keyof typeof addressData];
            }
        });

        // If country_code is being updated, zip must also be included
        if (addressData.country_code && !addressData.zip) {
            return {
                success: false,
                error: 'Zip code is required when updating country',
            };
        }

        const response = await addressService.update(addressId, addressData);

        if (!response.address) {
            return {
                success: false,
                error: 'Failed to update address: No address data returned',
            };
        }

        return {
            success: true,
            data: response.address,
        };
    } catch (error) {
        console.error('Error updating address:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to update address',
        };
    }
}

async function changePaymentMethod(addressId: number, paymentMethodId: number) {
    return addressService.update(addressId, {
        payment_method_id: paymentMethodId,
    });
}

export async function updateAddressPaymentMethodAction(
    addressId: number,
    paymentMethodId: number
) {
    try {
        await changePaymentMethod(addressId, paymentMethodId);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to update payment method',
        };
    }
}

export async function createPaymentMethodAction(formData: FormData) {
    try {
        const rawData = {
            customerId: formData.get('customer_id'),
            paymentType: formData.get('paymentType'),
            cardNumber: formData.get('cardNumber'),
            nameOnCard: formData.get('nameOnCard'),
            expiryMonth: formData.get('expiryMonth'),
            expiryYear: formData.get('expiryYear'),
            isPrimaryPaymentMethod:
                formData.get('isPrimaryPaymentMethod') === 'true',
        };

        const validatedData = paymentMethodSchema.parse(rawData);

        // Transform the data for Recharge API
        const rechargeData = {
            customer_id: Number(rawData.customerId),
            payment_type:
                rawData.paymentType as RechargePaymentMethod['payment_type'],
            processor_name: 'stripe' as const,
            processor_customer_token: 'cus_xxx', // Get from Stripe
            processor_payment_method_token: 'pm_xxx', // Get from Stripe
            default: validatedData.isPrimaryPaymentMethod,
        };
        const response = await paymentMethodService.create(rechargeData);

        return {
            success: true,
            data: response,
        };
    } catch (error: any) {
        console.error('Payment method creation failed:', error);
        return {
            success: false,
            error: error.message || 'Failed to create payment method',
        };
    }
}

export async function deletePaymentMethodAction(id: number) {
    try {
        await paymentMethodService.delete(id);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to delete payment method',
        };
    }
}

export async function setDefaultPaymentMethodAction(id: number) {
    try {
        await paymentMethodService.setAsDefault(id);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to set default payment method',
        };
    }
}
