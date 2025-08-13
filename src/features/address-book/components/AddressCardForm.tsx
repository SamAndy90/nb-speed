'use client';
import { startTransition, useOptimistic, useState } from 'react';
import { MailingAddressFragment } from '@/gql/storefront/graphql';
import { z } from 'zod';
import {
    deleteCustomerAddressAction,
    updateDefaultAddressAction,
} from '../actions';
import { AddressCard } from './AddressCard';
import { toast } from 'sonner';
import { getFragmentData } from '@/gql/storefront';
import { addressFragment } from '@/features/shopify/graphql/storefront/fragments/address';
import { trimId } from '@/features/shopify/utils';
import {
    ADDRESS_DEFAULT_SET_SUCCESSFULLY_TOAST_MESSAGE,
    ADDRESS_DELETED_SUCCESSFULLY_TOAST_MESSAGE,
} from '../consts';
import { useAddressBook } from '../contexts/address';
type AddressCardFormProps = {
    initialDefaultAddressId: string;
    initialAddresses: MailingAddressFragment[];
};

const DefaultAddressFormSchema = z.object({
    defaultAddressId: z.string(),
});

type DefaultAddressForm = z.infer<typeof DefaultAddressFormSchema>;

function isInBottomRow(index: number, totalItems: number): boolean {
    const itemsPerRow = 3;
    const totalRows = Math.ceil(totalItems / itemsPerRow);
    const currentRow = Math.ceil((index + 1) / itemsPerRow);
    return currentRow === totalRows;
}
function floatDefaultAddressToTop(
    addresses: MailingAddressFragment[],
    defaultAddressId: string | null
) {
    if (!defaultAddressId) return addresses;
    return addresses.reduce((acc, curr) => {
        if (trimId(curr.id) === trimId(defaultAddressId)) {
            return [curr, ...acc];
        }
        return [...acc, curr];
    }, [] as MailingAddressFragment[]);
}
export function AddressCardForm() {
    //Partition the array, find the default address and move it to the start

    const {
        addresses,
        setAddresses,
        defaultAddressId,
        setOptimisticAddresses,
        setDefaultAddressId,
        setOptimisticDefaultAddressId,
    } = useAddressBook();

    async function onSetDefaultAction(addressId: string) {
        startTransition(() => setOptimisticDefaultAddressId(addressId));
        const res = await updateDefaultAddressAction(addressId);
        if (!res) return;
        if (!res.customer) return;
        if (res.customerUserErrors.length > 0)
            toast.error(res.customerUserErrors[0].message);
        const fragment = getFragmentData(
            addressFragment,
            res.customer.defaultAddress
        );
        console.log(`${addressId} -> ${fragment?.id}`);
        setDefaultAddressId(fragment?.id ?? null);
        toast.success(ADDRESS_DEFAULT_SET_SUCCESSFULLY_TOAST_MESSAGE);
    }

    async function onDeleteAddressAction(addressId: string) {
        startTransition(() =>
            setOptimisticAddresses(addresses.filter((a) => a.id !== addressId))
        );
        const res = await deleteCustomerAddressAction(addressId);
        if (!res) return;
        if (!res.deletedCustomerAddressId) return;
        if (res.customerUserErrors.length > 0)
            toast.error(res.customerUserErrors[0].message);
        setAddresses(
            addresses.filter((a) => a.id !== res.deletedCustomerAddressId)
        );
        toast.success(ADDRESS_DELETED_SUCCESSFULLY_TOAST_MESSAGE);
    }

    return (
        <ul className="h-m grid w-full grid-cols-1 flex-col md:grid md:grid-cols-3">
            {floatDefaultAddressToTop(addresses, defaultAddressId).map(
                (a, i) => (
                    <AddressCard
                        key={a.id}
                        address={a}
                        isDefault={
                            defaultAddressId
                                ? trimId(a.id) === trimId(defaultAddressId)
                                : false
                        }
                        onSetDefaultAction={onSetDefaultAction}
                        onDeleteAction={onDeleteAddressAction}
                        lastRow={isInBottomRow(i, addresses.length)}
                    />
                )
            )}
        </ul>
    );
}
