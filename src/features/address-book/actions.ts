'use server';
import { cookies } from 'next/headers';

import {
    deleteCustomerAddress,
    updateCustomerDefaultAddress,
} from '@/features/shopify/api/fetch';
import { CustomerAccessTokenSchema } from '@/features/auth/schemas';
import { getCustomerAddresses } from '@/features/shopify/api/fetch';
import { addressFragment } from '@/features/shopify/graphql/storefront/fragments/address';
import { getFragmentData } from '@/gql/storefront';

export async function updateDefaultAddressAction(addressId: string) {
    const token = (await cookies()).get('shopifyAccessToken');
    const parsedToken = CustomerAccessTokenSchema.safeParse(
        JSON.parse(token?.value ?? '{}')
    );
    if (!parsedToken.success) return null;
    console.log('Calling server action');
    const res = await updateCustomerDefaultAddress(
        addressId,
        parsedToken.data.accessToken
    );
    return res;
}

export async function getCustomerAddressesAction() {
    const token = (await cookies()).get('shopifyAccessToken');

    const parsedToken = CustomerAccessTokenSchema.safeParse(
        JSON.parse(token?.value ?? '{}')
    );
    if (!parsedToken.success) return null;
    const customerAddresses = await getCustomerAddresses(
        parsedToken.data.accessToken
    );

    if (!customerAddresses) return null;
    const defaultAddressFragment = getFragmentData(
        addressFragment,
        customerAddresses.defaultAddress
    );
    const otherAddressFragments = customerAddresses.addresses.edges.map((a) =>
        getFragmentData(addressFragment, a.node)
    );
    return { defaultAddressFragment, otherAddressFragments };
}

export async function deleteCustomerAddressAction(addressId: string) {
    const token = (await cookies()).get('shopifyAccessToken');
    const parsedToken = CustomerAccessTokenSchema.safeParse(
        JSON.parse(token?.value ?? '{}')
    );
    if (!parsedToken.success) return null;
    console.log('Deleting address');
    const res = await deleteCustomerAddress(
        addressId,
        parsedToken.data.accessToken
    );
    console.log(res);
    return res;
    //revalidateTag('/account/address-book'); //Will need this if we cache the response
    //redirect(`/account/address-book`);
}
