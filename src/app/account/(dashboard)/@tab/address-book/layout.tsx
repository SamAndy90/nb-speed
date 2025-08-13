import { PropsWithChildren } from 'react';
import { AddressBookProvider } from '../../../../../features/address-book/contexts/address';
import { getCustomerAddressesAction } from '../../../../../features/address-book/actions';

export default async function AddressBookLayout({
    children,
}: PropsWithChildren) {
    const res = await getCustomerAddressesAction();
    if (!res) return null;
    const { defaultAddressFragment, otherAddressFragments } = res;
    return (
        <AddressBookProvider
            initialAddresses={otherAddressFragments}
            initialDefaultAddressId={defaultAddressFragment?.id}>
            {children}
        </AddressBookProvider>
    );
}
