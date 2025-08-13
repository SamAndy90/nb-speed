import { RechargeSubscription } from '@/lib/recharge';
import { SUBSCRIPTION_CANCEL_REASON } from '../utils';

function SubscriptionStatus({
    subscription,
    status,
}: {
    subscription: RechargeSubscription;
    status: string;
}) {
    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return {
                    textColor: 'text-accent-green',
                    bgColor: 'bg-accent-green',
                };
            case 'cancelled':
                if (
                    subscription.cancellation_reason ===
                    SUBSCRIPTION_CANCEL_REASON.PAUSE
                ) {
                    return {
                        textColor: 'text-warning-500',
                        bgColor: 'bg-warning-500',
                    };
                }
                return {
                    textColor: 'text-red-500',
                    bgColor: 'bg-red-500',
                };
            case 'expired':
                return {
                    textColor: 'text-neutral-400',
                    bgColor: 'bg-neutral-400',
                };
            default:
                return {
                    textColor: 'text-neutral-500',
                    bgColor: 'bg-neutral-500',
                };
        }
    };

    const { textColor, bgColor } = getStatusStyles(status);
    const getStatus = () => {
        if (
            status === 'cancelled' &&
            subscription.cancellation_reason ===
                SUBSCRIPTION_CANCEL_REASON.PAUSE
        ) {
            return 'PAUSED';
        }

        return status.toUpperCase();
    };

    return (
        <div className={`flex text-lg font-bold md:text-xl ${textColor}`}>
            {getStatus()}
            {status.toLowerCase() === 'active' && (
                <div className="relative flex aspect-square size-[1lh] items-center justify-center">
                    <div
                        className={`absolute size-1.5 animate-ping rounded-full ${bgColor}`}
                    />
                    <div className={`size-1.5 rounded-full ${bgColor}`} />
                </div>
            )}
        </div>
    );
}

export default SubscriptionStatus;
