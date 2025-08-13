'use client';
import { MailingAddressFragment } from '@/gql/storefront/graphql';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useOptimistic,
    useState,
} from 'react';
type AddressBookContextType = {
    addresses: MailingAddressFragment[];
    defaultAddressId: string | null;
    setAddresses: (addresses: MailingAddressFragment[]) => void;
    setOptimisticAddresses: (addresses: MailingAddressFragment[]) => void;
    setDefaultAddressId: (defaultAddressId: string | null) => void;
    setOptimisticDefaultAddressId: (defaultAddressId: string | null) => void;
};
const AddressBookContext = createContext<AddressBookContextType>({
    addresses: [],
    defaultAddressId: null,
    setAddresses: () => {},
    setOptimisticAddresses: () => {},
    setDefaultAddressId: () => {},
    setOptimisticDefaultAddressId: () => {},
});

export function AddressBookProvider({
    initialAddresses,
    initialDefaultAddressId,
    children,
}: {
    initialAddresses: MailingAddressFragment[];
    initialDefaultAddressId?: string;
} & PropsWithChildren) {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [defaultAddressId, setDefaultAddressId] = useState<string | null>(
        initialDefaultAddressId ?? null
    );
    const [optimisticAddresses, setOptimisticAddresses] = useOptimistic(
        addresses,
        (currentState, optimisticState: MailingAddressFragment[]) =>
            optimisticState
    );
    const [optimisticDefaultAddressId, setOptimisticDefaultAddressId] =
        useOptimistic(
            defaultAddressId,
            (currentState, optimisticState: string | null) => {
                return optimisticState;
            }
        );

    return (
        <AddressBookContext.Provider
            value={{
                addresses: optimisticAddresses,
                defaultAddressId: optimisticDefaultAddressId,
                setAddresses,
                setOptimisticAddresses,
                setDefaultAddressId,
                setOptimisticDefaultAddressId,
            }}>
            {children}
        </AddressBookContext.Provider>
    );
}

export function useAddressBook() {
    const context = useContext(AddressBookContext);
    if (!context) {
        throw new Error(
            'useAddressBook must be used within a AddressBookProvider'
        );
    }
    return context;
}
