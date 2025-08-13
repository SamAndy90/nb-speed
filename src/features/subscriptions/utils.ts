import { RechargeAddress } from '@/lib/recharge';

/**
 * Format a subscription interval for display
 */
export function formatSubscriptionInterval(
    intervalFrequency: number,
    intervalUnit: string
) {
    const interval = intervalFrequency;
    const unit = intervalFrequency === 1 ? intervalUnit : `${intervalUnit}s`;
    return `${interval} ${unit}`;
}

/**
 * Format a subscription status for display. Just changes it from lowercase to Title Case.
 */
export function formatSubscriptionStatus(status: string) {
    return status[0].toUpperCase() + status.slice(1);
}

export function formatAddress(address: RechargeAddress): string {
    const parts = [
        address.address1,
        address.address2,
        address.city,
        address.province,
        address.country_code,
        address.zip,
    ].filter(Boolean);

    return parts.join('\n');
}

export const BUTTON_ACTION = {
    PAUSE: 'pause',
    CANCEL: 'cancel',
    SKIP: 'skip',
    ACTIVATE: 'activate',
};


export const SUBSCRIPTION_CANCEL_REASON = {
    CANCEL: 'User requested cancellation',
    PAUSE: 'User requested pause',
};