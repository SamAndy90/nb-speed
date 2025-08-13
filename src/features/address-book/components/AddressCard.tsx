import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { MailingAddressFragment } from '@/gql/storefront/graphql';

import Trash from '@/assets/icons/trash.svg';

import { EditAddressDialog } from './AddressDialog';
import { motion } from 'framer-motion';
import { trimId } from '@/features/shopify/utils';
import { cn } from '@/lib/utils';
import { useState } from 'react';
type AddressCardProps = {
    address: MailingAddressFragment;
    isDefault: boolean;
    onSetDefaultAction: (addressId: string) => void;
    onDeleteAction: (addressId: string) => void;
    lastRow: boolean;
};
const MotionCard = motion.create(Card);

export function AddressCard({
    address,
    isDefault,
    onSetDefaultAction,
    onDeleteAction,
    lastRow,
}: AddressCardProps) {
    const [isDefaultBilling, setIsDefaultBilling] = useState(isDefault);
    return (
        <motion.div
            className={cn(
                'flex h-60 w-full flex-col justify-between gap-4 overflow-hidden border border-l-0 border-t-0 border-neutral-200 bg-primary px-5 py-8 pt-6 text-sm font-semibold text-neutral-500 max-md:border-x-0 md:text-base [&:nth-child(3n)]:border-r-0',
                lastRow && 'border-b-0'
            )}
            layoutId={trimId(address.id)}>
            <div className="flex justify-between">
                <div>
                    {address.firstName} {address.lastName} <br />
                    {address.formatted.join('\n')}
                </div>
                <div className="flex flex-col gap-4">
                    {!isDefault && (
                        <Button
                            onClick={() => onDeleteAction(address.id)}
                            variant="ghost"
                            className="size-4 p-0">
                            <Trash className="size-4 text-neutral-500 hover:text-primary-black" />
                        </Button>
                    )}
                    <EditAddressDialog address={address} />
                </div>
            </div>
            <footer className="flex flex-col items-start gap-2 font-semibold md:text-sm">
                <div
                    className={cn('flex items-center justify-center gap-2', {
                        'text-primary-black': !isDefault,
                    })}>
                    <Checkbox
                        checked={isDefault}
                        onCheckedChange={async (value) => {
                            if (value !== true) return;
                            onSetDefaultAction(address.id);
                        }}
                    />
                    Set as default delivery address
                </div>
                <div
                    className={cn('flex items-center justify-center gap-2', {
                        'text-primary-black': !isDefaultBilling,
                    })}>
                    <Checkbox
                        checked={isDefaultBilling}
                        onCheckedChange={(value) =>
                            setIsDefaultBilling(value === true)
                        }
                    />
                    Set as default billing address
                </div>
            </footer>
        </motion.div>
    );
}
