'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    CreateAddressForm,
    UpdateAddressForm,
} from '@/features/address-book/components/AddressForm';
import Pencil from '@/assets/icons/pencil.svg';
import { useState } from 'react';
import { MailingAddressFragment } from '@/gql/storefront/graphql';
import { useAddressBook } from '../contexts/address';
import { toast } from 'sonner';
import {
    ADDRESS_ADDED_SUCCESFULLY_TOAST_MESSAGE,
    ADDRESS_EDITED_SUCCESFULLY_TOAST_MESSAGE,
} from '../consts';
import { trimId } from '@/features/shopify/utils';
import ChevronRight from '@/assets/icons/chevron-right.svg';

export function CreateAddressDialog() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setAddresses, addresses } = useAddressBook();
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    className="flex h-[34px] items-center justify-center gap-2 pl-[18px] pr-3"
                    variant="dark">
                    Add address <ChevronRight className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="top-[calc(50%)] max-h-[calc(100dvh-116px)] w-[calc(100%-2.5rem)] md:px-8 md:pb-20">
                <DialogHeader className="mb-4">
                    <DialogTitle>Add a new address</DialogTitle>
                </DialogHeader>
                <div className="flex min-h-0 grow flex-col pt-4 max-md:max-h-[80%] max-md:overflow-y-scroll">
                    <CreateAddressForm
                        onSubmitSuccess={(newAddress) => {
                            setAddresses([...addresses, newAddress]);
                            toast.success(
                                ADDRESS_ADDED_SUCCESFULLY_TOAST_MESSAGE
                            );
                            setDialogOpen(false);
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function EditAddressDialog({
    address,
}: {
    address: MailingAddressFragment;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setAddresses, addresses } = useAddressBook();
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="size-4 p-0 ">
                    <Pencil className="size-4 text-neutral-500 hover:text-primary-black" />
                </Button>
            </DialogTrigger>
            <DialogContent className="top-[calc(50%)] max-h-[calc(100dvh-116px)] max-md:h-full overflow-hidden w-[calc(100%-2.5rem)] md:px-8 md:pb-20">
                <DialogHeader className="mb-4">
                    <DialogTitle>Edit Address</DialogTitle>
                </DialogHeader>
                <div className="flex min-h-0 grow flex-col pt-4 h-full max-md:overflow-y-scroll px-6 -mx-6">
                    <UpdateAddressForm
                        address={address}
                        onSubmitSuccess={(newAddress) => {
                            setAddresses(
                                addresses.map((a) => {
                                    if (
                                        trimId(a.id) === trimId(newAddress.id)
                                    ) {
                                        return newAddress;
                                    }
                                    return a;
                                })
                            );
                            toast.success(
                                ADDRESS_EDITED_SUCCESFULLY_TOAST_MESSAGE
                            );
                            setDialogOpen(false);
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
