import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DashboardContent } from '@/features/dashboard/components/DashboardContent';
import { formatDate, formatFullDate } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { formatSubscriptionInterval } from '@/features/subscriptions/utils';
import { SubscriptionDeliveryAddressDialog } from '@/features/subscriptions/components/SubscriptionDeliveryAddressDialog';
import { SubscriptionEditPaymentDialog } from '@/features/subscriptions/components/SubscriptionPaymentDialog';
import SubscriptionFrequencyDialog from '@/features/subscriptions/components/SubscriptionFrequencyDialog';
import SubscriptionDetailHeader from '@/features/subscriptions/components/SubscriptionDetailHeader';
import {
    addressService,
    paymentMethodService,
    subscriptionService,
} from '@/lib/recharge/client';
import SubscriptionStatus from '@/features/subscriptions/components/SubscriptionStatus';
import { getProductById } from '@/features/shopify/api/product';
import { DashboardOrderPreviews } from '@/components/DashboardOrderPreviews';
import { getFragmentData } from '@/gql/storefront';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { RechargeAddress } from '@/lib/recharge';
import SubScriptionActionsMobile from '@/features/subscriptions/components/SubscriptinoActionsMobile';

function SubscriptionDetailsHeading({ children }: PropsWithChildren) {
    return <td className="text-neutral-500">{children}</td>;
}

function SubscriptionDetailsRow({ children }: PropsWithChildren) {
    return <tr className="first:*:pr-8">{children}</tr>;
}

function SubscriptionDetails({ subscription }: { subscription: any }) {
    return (
        <div className="text-sm md:text-base">
            <table className="border-separate border-spacing-y-3">
                <tbody>
                    <SubscriptionDetailsRow>
                        <SubscriptionDetailsHeading>
                            Subscription Number
                        </SubscriptionDetailsHeading>
                        <td>
                            <p>#{subscription.id}</p>
                        </td>
                    </SubscriptionDetailsRow>
                    <SubscriptionDetailsRow>
                        <SubscriptionDetailsHeading>
                            Start Date
                        </SubscriptionDetailsHeading>
                        <td>{formatDate(subscription.created_at)}</td>
                    </SubscriptionDetailsRow>
                    <SubscriptionDetailsRow>
                        <SubscriptionDetailsHeading>
                            Total Amount
                        </SubscriptionDetailsHeading>
                        <td>
                            <p>
                                {subscription.presentment_currency}{' '}
                                {subscription.price * subscription.quantity}
                            </p>
                        </td>
                    </SubscriptionDetailsRow>
                </tbody>
            </table>
        </div>
    );
}

function formatAddress(address: RechargeAddress) {
    const parts = [
        address.address1,
        address.address2,
        address.city,
        address.province,
        address.country_code,
        address.zip,
    ].filter(Boolean);

    return parts.map((part, index) => (
        <div key={`address-line-${index}`}>{part}</div>
    ));
}

export const metadata: Metadata = {
    title: 'Subscription Details',
};

export default async function SubscriptionPage({
    params,
}: {
    params: { subscriptionId: string };
}) {
    const subscription = await subscriptionService.get(
        parseInt(params.subscriptionId)
    );
    if (!subscription) return null;
    const { addresses } = await addressService.list({
        customer_id: subscription.customer_id,
    });
    const address = addresses?.find(
        (address) => address.id === subscription.address_id
    );
    if (!address) return null;
    const { payment_methods: paymentMethods } = await paymentMethodService.list(
        {
            customer_id: String(subscription.customer_id),
        }
    );
    const addressPaymentMethod = paymentMethods?.find(
        (p) => p.id === address.payment_method_id
    );
    const paymentDetail = Array.isArray(addressPaymentMethod)
        ? addressPaymentMethod[0].payment_details
        : addressPaymentMethod?.payment_details;
    // Fetch product details from Shopify
    const product = subscription.external_product_id?.ecommerce
        ? await getProductById(
              subscription.external_product_id.ecommerce
          ).catch(() => null)
        : null;
    if (!product) return;
    const productImages = product.images.map((image) =>
        getFragmentData(imageFragment, image)
    );

    const getProgressValue = (
        nextChargeDate: string,
        startDate: string
    ): number => {
        const start = new Date(startDate);
        const end = new Date(nextChargeDate);
        const today = new Date();

        const totalTime = end.getTime() - start.getTime();
        const elapsedTime = today.getTime() - start.getTime();

        // Avoid division by 0 or negative timeframes
        if (totalTime <= 0) return 100;

        // Clamp between 0% and 100%
        const progress = Math.max(0, Math.min(elapsedTime / totalTime, 1));

        return Math.round(progress * 100);
    };

    return (
        <DashboardContent>
            <SubscriptionDetailHeader subscription={subscription} />
            <DashboardContent.Body className="flex flex-col px-5 pb-8 pt-6 font-semibold md:px-8 md:pt-8">
                <div className="flex w-full flex-wrap justify-between gap-8 md:items-end">
                    <div className="flex grow flex-col justify-between gap-[18px]">
                        <div className="uppercase">
                            <div className="text-xs text-muted-foreground md:text-base">
                                Status
                            </div>
                            <SubscriptionStatus
                                subscription={subscription}
                                status={subscription.status}
                            />
                        </div>
                        {subscription.status === 'active' && (
                            <div className="flex flex-col gap-4">
                                <p>
                                    <span className="text-neutral-500">
                                        Next Delivery:{' '}
                                    </span>
                                    {formatFullDate(
                                        subscription.next_charge_scheduled_at
                                    )}
                                </p>
                                <Progress
                                    value={getProgressValue(
                                        subscription.next_charge_scheduled_at,
                                        subscription.created_at
                                    )}
                                    className="h-2 w-full max-w-96 bg-neutral-200 [&>div]:bg-accent-green"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex h-28 gap-4 md:h-32">
                        <DashboardOrderPreviews
                            itemImages={productImages}
                            maxItemsShown={3}
                        />
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="flex w-full flex-col justify-between gap-8 overflow-auto lg:flex-row">
                    <div className="min-w-fit space-y-3">
                        <h5 className="font-sans text-lg font-bold">
                            Subscription Details
                        </h5>
                        <SubscriptionDetails subscription={subscription} />
                    </div>
                    <div className="min-w-[210px] space-y-4 md:space-y-6">
                        <h5 className="flex justify-between gap-6 font-sans text-lg font-bold">
                            Delivery Address
                            <SubscriptionDeliveryAddressDialog
                                defaultAddress={address!}
                                addresses={addresses!}
                                subscriptionId={subscription.id}
                            />
                        </h5>
                        <div className="text-sm text-neutral-500 md:text-base">
                            {formatAddress(address)}
                        </div>
                    </div>
                    <div className="min-w-[175px] space-y-4 md:space-y-6">
                        <h5 className="flex flex-row justify-between font-sans text-lg font-bold">
                            Payment{' '}
                            {/* <SubscriptionEditPaymentDialog
                                customerId={subscription.customer_id}
                                paymentMethods={paymentMethods || []}
                                currentPaymentMethod={addressPaymentMethod?.id}
                            /> */}
                        </h5>
                        <div className="flex w-fit items-center justify-center gap-1 text-sm text-neutral-500 lg:text-base">
                            {`${paymentDetail.brand} ${paymentDetail.last4}`}
                        </div>
                    </div>
                    <div className="min-w-[175px] space-y-4 md:space-y-6">
                        <h5 className="flex flex-row justify-between font-sans text-lg font-bold">
                            Ship Every{' '}
                            <SubscriptionFrequencyDialog
                                id={subscription.id}
                                charge_interval_frequency={
                                    subscription.charge_interval_frequency
                                }
                                order_interval_unit={
                                    subscription.order_interval_unit
                                }
                            />
                        </h5>
                        <p className="whitespace-pre text-sm text-neutral-500 md:text-base">
                            {formatSubscriptionInterval(
                                subscription.charge_interval_frequency,
                                subscription.order_interval_unit
                            )}
                        </p>
                    </div>
                </div>
                <SubScriptionActionsMobile subscription={subscription} />
            </DashboardContent.Body>
        </DashboardContent>
    );
}
