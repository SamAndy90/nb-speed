import { DashboardOrderPreviews } from '@/components/DashboardOrderPreviews';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { REFERRAL_URL, SHOP_KEY, TEST_CUSTOMER_ID } from '@/consts';
import { DashboardContent } from '@/features/dashboard/components/DashboardContent';
import { InviteAFriend } from '@/features/dashboard/components/InviteAFriend';
import { RewardsPointCard } from '@/features/dashboard/components/RewardsPointCount';
import { getInfluenceCustomer } from '@/features/influence/api';
import { getCustomerOrders } from '@/features/shopify/api/fetch';
import { orderFragment } from '@/features/shopify/graphql/admin/fragments/order';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { getCurrentCustomer } from '@/features/shopify/server';
import { prettifyOrderStatus } from '@/features/shopify/utils';
import { OrderFragment } from '@/gql/admin/graphql';
import { getFragmentData } from '@/gql/storefront';
import {
    currencyFormatter,
    formatDate,
    formatFullDate,
    stripIdNumber,
} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const ORDER_SHOPIFY_ID_PATH = 'gid://shopify/Order/';

function OrderDetailsHeading({ children }: PropsWithChildren) {
    return <td className="text-neutral-500">{children}</td>;
}

function OrderDetailsRow({ children }: PropsWithChildren) {
    return <tr className="first:*:pr-8">{children}</tr>;
}

function OrderDetails({ order }: { order: OrderFragment }) {
    const transaction = order.transactions[0];

    return (
        <div className="text-sm md:text-base">
            <table className="border-separate border-spacing-y-3">
                <tbody>
                    <OrderDetailsRow>
                        <OrderDetailsHeading>Order Number</OrderDetailsHeading>
                        <td>
                            <p>{order.name}</p>
                        </td>
                    </OrderDetailsRow>
                    <OrderDetailsRow>
                        <OrderDetailsHeading>Order Date</OrderDetailsHeading>
                        <td>{formatDate(order.processedAt)}</td>
                    </OrderDetailsRow>
                    <OrderDetailsRow>
                        <OrderDetailsHeading>
                            Payment Details
                        </OrderDetailsHeading>

                        <td>
                            <div className="flex gap-1">
                                <div className="relative flex size-[1lh] items-center justify-center">
                                    <Image
                                        alt={
                                            transaction.paymentIcon?.altText ??
                                            ''
                                        }
                                        src={transaction.paymentIcon?.url}
                                        className="size-fill object-contain"
                                        fill
                                    />
                                </div>

                                {transaction.paymentDetails //@ts-expect-error
                                    ?.paymentMethodName ?? 'Other'}
                            </div>
                        </td>
                    </OrderDetailsRow>
                    <OrderDetailsRow>
                        <OrderDetailsHeading>Total Amount</OrderDetailsHeading>

                        <td>
                            <p>
                                {currencyFormatter.format(
                                    order.currentTotalPriceSet.presentmentMoney
                                        .amount
                                )}
                            </p>
                        </td>
                    </OrderDetailsRow>
                </tbody>
            </table>
        </div>
    );
}

export default async function OverviewPage() {
    const currentCustomer = await getCurrentCustomer();

    if (!currentCustomer) return null;
    const orders = (await getCustomerOrders(currentCustomer.id)) ?? [];
    const order = getFragmentData(orderFragment, orders[0]);

    if (!order) {
        return (
            <DashboardContent>
                <p className="text-paragraph-3 font-semibold">
                    No orders yet. Head over{' '}
                    <Link
                        href="/collections/all-products"
                        className="underline">
                        to the shop
                    </Link>{' '}
                    and place your first order.
                </p>
            </DashboardContent>
        );
    }
    const influenceCustomer = await getInfluenceCustomer(
        SHOP_KEY,
        currentCustomer.email!
    );

    if (!influenceCustomer) {
        return (
            <DashboardContent>
                <p className="text-paragraph-3 font-semibold">
                    Customer Not Found
                </p>
            </DashboardContent>
        );
    }

    //Get latest delivery date from fulfilments
    const latestFulfilment = order.fulfillments.reduce((latest, fulfilment) => {
        if (
            fulfilment.estimatedDeliveryAt &&
            fulfilment.estimatedDeliveryAt > latest
        ) {
            return fulfilment.estimatedDeliveryAt;
        }
        return latest;
    }, new Date(0));
    const orderHref = `/account/orders/${stripIdNumber(order.id)}`;

    return (
        <DashboardContent>
            <DashboardContent.Header>
                <h4>Your Dashboard</h4>
                <div className="flex gap-3.5 max-sm:hidden">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="md:text-xs">
                        <Link href="mailto:support@nutriburstvitamins.com">
                            Need help?
                        </Link>
                    </Button>
                </div>
            </DashboardContent.Header>
            <DashboardContent.Body className="flex flex-col pt-6 font-semibold md:pt-8">
                <div className="flex w-full flex-wrap justify-between gap-8 px-5 md:items-end md:px-8">
                    <div className="flex grow flex-col justify-between gap-[18px]">
                        <div className="uppercase">
                            <div className="text-xs text-muted-foreground md:text-base">
                                Order Status
                            </div>
                            <div className="text-lg font-bold text-accent-green md:text-xl">
                                {prettifyOrderStatus(
                                    order.displayFulfillmentStatus
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 text-sm text-neutral-500">
                            <p>
                                <span>Estimated Delivery by</span>{' '}
                                {formatFullDate(latestFulfilment.toString())}
                            </p>
                            <Progress
                                value={60}
                                className="h-2 w-full max-w-96 bg-neutral-200 [&>div]:bg-accent-green"
                            />
                        </div>
                    </div>
                    <div className="flex h-28 gap-4 md:h-32">
                        <DashboardOrderPreviews
                            itemImages={order.lineItems.edges.map(
                                ({ node }) =>
                                    getFragmentData(imageFragment, node.image)!
                            )}
                            maxItemsShown={3}
                        />
                    </div>
                </div>
                <div className="mt-8 grid w-full grid-cols-2 gap-3 px-5 *:text-xs md:flex md:justify-start md:px-8">
                    <Button
                        variant="dark"
                        size="sm"
                        className="w-full md:w-fit">
                        <Link href={orderHref}>Go to order</Link>
                    </Button>
                    {/* <Button
                        variant="outline"
                        size="sm"
                        className="w-full md:w-fit">
                        <Link href={'/'}>Track Parcel</Link>
                    </Button> */}
                </div>
                <Separator className="mt-8" />
                <div className="flex w-full flex-col md:flex-row">
                    <RewardsPointCard
                        points={influenceCustomer?.pointBalance || 0}
                        variant="overview"
                        className="border-b pb-8 pt-7 md:border-b-0"
                    />
                    <InviteAFriend
                        variant="overview"
                        referralLink={
                            REFERRAL_URL + influenceCustomer?.referralLink
                        }
                    />
                </div>
            </DashboardContent.Body>
        </DashboardContent>
    );
}
