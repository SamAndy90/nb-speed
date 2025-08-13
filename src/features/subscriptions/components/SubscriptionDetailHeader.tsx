'use client';

import { Button } from '@/components/ui/button';
import { DashboardContent } from '@/features/dashboard/components/DashboardContent';
import { RechargeSubscription } from '@/lib/recharge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { activateSubscription } from '../actions';
import { BUTTON_ACTION, SUBSCRIPTION_CANCEL_REASON } from '../utils';
import dynamic from 'next/dynamic';
import SubscriptionSkipDialog from './SubscriptionSkipDialog';
const SubscriptionPauseDialog = dynamic(
    () => import('./SubscriptionPauseDialog'),
    { ssr: false }
);
const SubscriptionCancelDialog = dynamic(
    () => import('./SubscriptionCancelDialog'),
    { ssr: false }
);

interface SubscriptionDetailHeaderProps {
    subscription: RechargeSubscription;
}

function SubscriptionDetailHeader({
    subscription,
}: SubscriptionDetailHeaderProps) {
    const router = useRouter();
    const [loadingState, setLoadingState] = useState<string | null>(null);
    const subscriptionId = Number(subscription.id);

    const handleAction = async (
        action: (id: number) => Promise<{ success: boolean }>,
        actionName: string
    ) => {
        setLoadingState(actionName);
        try {
            const result = await action(subscriptionId);
            if (result.success) {
                router.refresh();
            }
        } catch (error) {
            console.error('Action failed:', error);
        } finally {
            setLoadingState(null);
        }
    };

    return (
        <DashboardContent.Header>
            <h4>Subscription #{subscription.id}</h4>
            <div className="hidden gap-3.5 font-sans lg:flex">
                {subscription.status === 'active' ? (
                    <>
                        <SubscriptionPauseDialog
                            subscriptionId={subscription.id}
                        />
                        <SubscriptionCancelDialog
                            subscriptionId={subscription.id}
                        />
                        <SubscriptionSkipDialog
                            subscriptionId={subscription.id}
                            nextChargeDate={subscription.next_charge_scheduled_at}
                        />
                    </>
                ) : (
                    <>
                        {subscription.cancellation_reason !==
                            SUBSCRIPTION_CANCEL_REASON.CANCEL && (
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={Boolean(loadingState)}
                                onClick={() =>
                                    handleAction(
                                        activateSubscription,
                                        BUTTON_ACTION.ACTIVATE
                                    )
                                }>
                                {loadingState === BUTTON_ACTION.ACTIVATE
                                    ? 'Processing...'
                                    : 'Activate Subscription'}
                            </Button>
                        )}
                    </>
                )}
            </div>
        </DashboardContent.Header>
    );
}

export default SubscriptionDetailHeader;
