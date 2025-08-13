'use client';

import { Button } from '@/components/ui/button';
import { RechargeSubscription } from '@/lib/recharge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { activateSubscription } from '../actions';
import { BUTTON_ACTION, SUBSCRIPTION_CANCEL_REASON } from '../utils';
import SubscriptionPauseDialog from './SubscriptionPauseDialog';
import SubscriptionCancelDialog from './SubscriptionCancelDialog';

interface SubscriptionDetailHeaderProps {
    subscription: RechargeSubscription;
}

function SubScriptionActionsMobile({
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
        <div className="mt-8 flex w-full gap-3 *:w-full lg:hidden">
            {subscription.status === 'active' ? (
                <>
                    <SubscriptionPauseDialog subscriptionId={subscription.id} />
                    <SubscriptionCancelDialog
                        subscriptionId={subscription.id}
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
    );
}

export default SubScriptionActionsMobile;
