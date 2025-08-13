import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { changeSubscriptionNextChargeDate, skipSubscription } from '../actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BUTTON_ACTION } from '../utils';
import WarningIcon from '@/assets/warning.svg';
import { getNextChargeInfo } from '@/lib/utils';

const SubscriptionSkipDialog = ({
    subscriptionId,
    nextChargeDate,
}: {
    subscriptionId: number;
    nextChargeDate: string;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAction = async (
        action: (
            subscriptionId: number,
            nextDate: string
        ) => Promise<{ success: boolean }>,
        actionName: string
    ) => {
        setLoading(true);
        try {
            const { afterSkipFormatted } = getNextChargeInfo(nextChargeDate);
            const result = await action(subscriptionId, afterSkipFormatted);
            if (result.success) {
                router.refresh();
            }
        } catch (error) {
            console.error('Action failed:', error);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Skip one
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-2.5rem)] max-w-[506px] border-none px-5 shadow-warning-inset lg:px-6 lg:pb-20">
                <DialogTitle className="hidden text-mobile-h4 lg:px-10 lg:text-desktop-h4">
                    Need a break? Skip your next delivery!
                </DialogTitle>
                <div className="-mt-6 flex flex-col gap-8 pb-2 pr-3 lg:pb-0 lg:pl-9 lg:pr-2">
                    <WarningIcon />
                    <div className="space-y-3">
                        <h4>Need a break? Skip your next delivery!</h4>
                        <p className="text-paragraph-4 lg:text-paragraph-3">
                            You're all set – no charges, no fuss. We'll resume
                            your regular subscription schedule after this
                            skipped interval.
                        </p>
                    </div>
                    <div className="flex gap-1 lg:gap-3">
                        <Button
                            variant="outline"
                            className="h-[34px]"
                            onClick={() =>
                                handleAction(
                                    changeSubscriptionNextChargeDate,
                                    BUTTON_ACTION.CANCEL
                                )
                            }
                            disabled={loading}>
                            Yes, skip it
                        </Button>
                        <Button
                            className="h-[34px]"
                            disabled={loading}
                            variant="dark"
                            onClick={() => setIsOpen(false)}>
                            No, keep it going
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionSkipDialog;
