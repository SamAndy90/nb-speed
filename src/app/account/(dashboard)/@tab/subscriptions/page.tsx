import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { currencyFormatter, formatFullDate, stripIdNumber, toCapitalCase } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import {
    formatSubscriptionInterval,
    SUBSCRIPTION_CANCEL_REASON,
} from '@/features/subscriptions/utils';
import { Progress } from '@/components/ui/progress';
import { customerService, subscriptionService } from '@/lib/recharge/client';
import { DashboardOrder } from '@/features/dashboard/components/DashboardOrderItem';
import { getCurrentCustomer } from '@/features/shopify/server';
import { DashboardContent } from '@/features/dashboard/components/DashboardContent';

function SubscriptionSubtotal({ subscription }: { subscription: any }) {
    return (
        <div>
            <p>{currencyFormatter.format(Number(subscription.price))}</p>
            <p className="text-sm text-neutral-400">
                /
                {formatSubscriptionInterval(
                    subscription.charge_interval_frequency,
                    subscription.order_interval_unit
                )}
            </p>
        </div>
    );
}
function SubscriptionStatus({
    status,
    cancellationReason,
}: {
    status: string;
    cancellationReason: string | null;
}) {
    const getStatus = (status: string) => {
        if (
            status === 'cancelled' &&
            cancellationReason === SUBSCRIPTION_CANCEL_REASON.PAUSE
        ) {
            return 'Paused';
        }

        return toCapitalCase(status);
    };

    return (
        <span className="flex flex-row gap-0.5">
            {getStatus(status)}{' '}
            {status === 'active' && (
                <div className="relative flex aspect-square size-[1lh] items-center justify-center">
                    <div className="absolute size-1.5 animate-ping rounded-full bg-accent-green" />
                    <div className="size-1.5 rounded-full bg-accent-green" />
                </div>
            )}
        </span>
    );
}

function SubscriptionPrice({ subscription }: { subscription: any }) {
    return (
        <div className="flex justify-start gap-16 text-sm font-semibold text-neutral-500">
            <div>Amount</div>
            <div className="">
                <span className="mr-2 text-primary-foreground">
                    {currencyFormatter.format(
                        Number(subscription.price) * subscription.quantity
                    )}
                </span>
                <span className="text-xs">
                    /
                    {formatSubscriptionInterval(
                        subscription.charge_interval_frequency,
                        subscription.order_interval_unit
                    )}
                </span>
            </div>
        </div>
    );
}

function SubscriptionEstimatedDeliveryDate({
    subscription,
}: {
    subscription: any;
}) {
    return (
        <div className="flex flex-col gap-3 text-xs font-semibold text-neutral-500">
            <p>
                Estimated Delivery by{' '}
                {formatFullDate(subscription.next_charge_scheduled_at)}
            </p>
            <Progress
                value={60}
                className="h-2 w-full max-w-96 [&>div]:bg-accent-green"
            />
        </div>
    );
}

// Main Page Component
export default async function SubscriptionsPage() {
    const currentCustomer = await getCurrentCustomer();
    if (!currentCustomer) return null;
    const id = currentCustomer.id.split('/').pop();
    const { customers } = await customerService.list({
        external_customer_id: id,
    });
    if (!customers || (customers && !customers?.length)) {
        return (
            <DashboardContent>
                <p className="mb-8 text-paragraph-3 font-semibold">
                    You have no subscribtions yet.
                </p>
                <Button className="h-[34px]" variant={'dark'}>
                    Go to shop
                </Button>
            </DashboardContent>
        );
    }

    const customer = customers[0];
    const { subscriptions = [] } = await subscriptionService.list({
        customer_id: String(customer.id),
    });
    if (!subscriptions.length) {
        return (
            <DashboardContent>
                <p className="mb-8 text-paragraph-3 font-semibold">
                    You have no subscribtions yet.
                </p>
                <Button className="h-[34px]" variant={'dark'}>
                    Go to shop
                </Button>
            </DashboardContent>
        );
    }

    return (
        <>
            {/* Mobile View */}
            <ul className="rounded-[10px] border border-neutral-200 lg:hidden">
                {subscriptions.map((subscription) => (
                    <DashboardOrder
                        key={subscription.id}
                        className="border-b border-neutral-200">
                        <div className="flex flex-col gap-3">
                            <DashboardOrder.Title
                                href={`/account/subscriptions/${stripIdNumber(String(subscription.id))}`}>
                                Subscription #
                                {stripIdNumber(String(subscription.id))}
                            </DashboardOrder.Title>
                            <SubscriptionEstimatedDeliveryDate
                                subscription={subscription}
                            />
                        </div>
                        {/* <div className="flex h-[110px] flex-row gap-3">
                            <DashboardOrderPreviews
                                itemImages={subscription.items.map(
                                    (i) => i.image
                                )}
                            />
                        </div> */}
                        <SubscriptionPrice subscription={subscription} />
                    </DashboardOrder>
                ))}
            </ul>

            {/* Desktop View */}
            <div className="h-full w-full max-lg:hidden">
                <Table className="min-w-[640px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/4">
                                Subscriptions
                            </TableHead>
                            <TableHead>Number</TableHead>
                            <TableHead>Ship every</TableHead>
                            <TableHead>Subtotal</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="px-5">Manage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscriptions.map((subscription) => (
                            <TableRow key={subscription.id}>
                                <TableCell>
                                    {subscription.product_title}
                                </TableCell>
                                <TableCell>
                                    #{stripIdNumber(String(subscription.id))}
                                </TableCell>
                                <TableCell>
                                    {formatSubscriptionInterval(
                                        subscription.order_interval_frequency,
                                        subscription.order_interval_unit
                                    )}
                                </TableCell>
                                <TableCell>
                                    <SubscriptionSubtotal
                                        subscription={subscription}
                                    />
                                </TableCell>
                                <TableCell>
                                    <SubscriptionStatus
                                        status={subscription.status}
                                        cancellationReason={
                                            subscription.cancellation_reason
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="flex w-fit items-center justify-center">
                                        <Link
                                            href={`/account/subscriptions/${stripIdNumber(String(subscription.id))}`}>
                                            View Subscription
                                            <ChevronRight className="ml-[1ch] size-5" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
