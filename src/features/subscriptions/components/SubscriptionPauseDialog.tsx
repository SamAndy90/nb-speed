import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { pauseSubscription } from '../actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BUTTON_ACTION } from '../utils';
import WarningIcon from '@/assets/warning.svg';

const SubscriptionPauseDialog = ({
    subscriptionId,
}: {
    subscriptionId: number;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAction = async (
        action: (id: number) => Promise<{ success: boolean }>,
        actionName: string
    ) => {
        setLoading(true);
        try {
            const result = await action(subscriptionId);
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
                    Pause
                </Button>
            </DialogTrigger>
            <DialogContent className="shadow-warning-inset w-[calc(100%-2.5rem)] max-w-[506px] border-none px-5 lg:px-6 lg:pb-20">
                <DialogTitle className="hidden text-mobile-h4 lg:px-10 lg:text-desktop-h4">
                    Subscription Pause Dialog
                </DialogTitle>
                <div className="-mt-6 flex flex-col gap-8 pb-2 pr-3 lg:pb-0 lg:pl-9 lg:pr-2">
                    <WarningIcon />
                    <div className="space-y-3">
                        <h4>
                            Are you sure you want to pause your subscription?
                        </h4>
                        <p className="text-paragraph-4 lg:text-paragraph-3">
                            You'll be missing out on some great benefits while
                            it's paused. If you're not ready to let go
                            completely, you can keep it active and continue
                            enjoying the perks!
                        </p>
                    </div>
                    <div className="flex gap-1 lg:gap-3">
                        <Button
                            variant="outline"
                            className="h-[34px]"
                            onClick={() =>
                                handleAction(
                                    pauseSubscription,
                                    BUTTON_ACTION.PAUSE
                                )
                            }
                            disabled={loading}>
                            Yes, pause it
                        </Button>
                        <Button
                            className="h-[34px]"
                            disabled={loading}
                            variant="dark"
                            onClick={() => setIsOpen(false)}>
                            No, keep it active
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionPauseDialog;
