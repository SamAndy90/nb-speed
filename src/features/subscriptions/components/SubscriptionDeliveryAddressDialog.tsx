'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Pencil from '@/assets/icons/pencil.svg';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from 'sonner';
import { RechargeAddress } from '@/lib/recharge';
import { formatAddress } from '../utils';
import { CreateAddressForm } from './CreateAddressForm';
import { updateSubscriptionAddress } from '../actions';

interface SubscriptionDeliveryAddressDialogProps {
    defaultAddress: RechargeAddress;
    addresses: RechargeAddress[];
    subscriptionId: number;
    // onSave: (addressId: string) => Promise<void>;
}

export function DeliveryAddressRadioItem({
    defaultAddress = false,
    value,
    address,
}: {
    defaultAddress?: boolean;
    value: string;
    address: RechargeAddress;
}) {
    return (
        <div className="flex items-center gap-3">
            <RadioGroupItem value={value} id={value} variant="gradient" />
            <Label
                htmlFor={value}
                className="flex flex-col justify-center gap-3 md:flex-row lg:items-center">
                <p className="text-sm font-semibold lg:text-base">
                    {defaultAddress
                        ? 'Default Delivery Address'
                        : `${address.first_name} ${address.last_name}`}
                </p>
                <p className="max-w-[358px] text-xs text-neutral-500 lg:truncate lg:text-sm">
                    {formatAddress(address)}
                </p>
            </Label>
        </div>
    );
}

export function SubscriptionDeliveryAddressDialog({
    defaultAddress,
    addresses,
    subscriptionId,
}: SubscriptionDeliveryAddressDialogProps) {
    const [selected, setSelected] = useState<string>(String(defaultAddress.id));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = async (addressId: string | number) => {
        if (addressId === 'new') {
            // The form submission is handled by the CreateAddressForm component
            return;
        }

        setIsLoading(true);

        try {
            await updateSubscriptionAddress(subscriptionId, Number(addressId));
            // Call the Recharge API to update the subscription's address
            toast.success('Delivery address updated');
            onOpenChange(false);
        } catch (error) {
            console.error('Failed to update delivery address:', error);
            toast.error('Failed to update delivery address');
        } finally {
            setIsLoading(false);
        }
    };

    const onOpenChange = (open: boolean) => {
        setDialogOpen(open);
        setSelected(String(defaultAddress.id));
    };

    const handleNewAddressSuccess = async (newAddress: RechargeAddress) => {
        try {
            toast.success('New address added successfully');
            await handleSaveChanges(newAddress.id);
            setSelected(String(newAddress.id));
        } catch (error) {
            console.error('Failed to add new address:', error);
            toast.error('Failed to add new address');
        }
    };
    return (
        <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
            <DialogTrigger>
                <Pencil className="size-4" />
            </DialogTrigger>
            <DialogContent className="max-h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] max-w-[764px] overflow-y-auto px-5 md:pb-20 lg:px-6 lg:pt-6">
                <DialogTitle className="mb-8 text-mobile-h4 lg:mb-16 lg:px-10 lg:text-desktop-h4">
                    Delivery address
                </DialogTitle>
                <div className="flex grow flex-col gap-16 lg:px-10">
                    <RadioGroup
                        defaultValue="default"
                        className="flex flex-col gap-6"
                        value={selected}
                        onValueChange={setSelected}>
                        {addresses.map((address) => (
                            <DeliveryAddressRadioItem
                                key={address.id}
                                value={String(address.id)}
                                address={address}
                                // defaultAddress={
                                //     address.id === defaultAddress.id
                                // }
                            />
                        ))}
                        <Separator />
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-row items-center gap-3">
                                <RadioGroupItem
                                    value="new"
                                    id="new-address"
                                    variant="gradient"
                                />
                                <Label htmlFor='new-address' className="text-sm lg:text-base">
                                    Add a new address
                                </Label>
                            </div>
                            {selected === 'new' && (
                                <CreateAddressForm
                                    customerId={defaultAddress.customer_id}
                                    onSubmitSuccess={handleNewAddressSuccess}
                                />
                            )}
                        </div>
                    </RadioGroup>
                    {selected !== 'new' && (
                        <Button
                            variant="dark"
                            size="md"
                            className="h-[34px]"
                            onClick={() => handleSaveChanges(selected)}
                            disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Save Changes'}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
