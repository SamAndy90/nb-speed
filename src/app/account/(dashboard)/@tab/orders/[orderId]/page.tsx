import { DashboardOrderPreviews } from '@/components/DashboardOrderPreviews';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DashboardContent } from '@/features/dashboard/components/DashboardContent';
import OrderHeaderActions from '@/features/order/order-header-actions';
import { getOrder } from '@/features/shopify/api/fetch';
import { orderFragment } from '@/features/shopify/graphql/admin/fragments/order';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { prettifyOrderStatus } from '@/features/shopify/utils';
import { OrderFragment } from '@/gql/admin/graphql';
import { getFragmentData } from '@/gql/storefront';
import { currencyFormatter, formatDate, formatFullDate } from '@/lib/utils';
import Image from 'next/image';
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

export default async function OrderPage(props: {
    params: Promise<{ orderId: string }>;
}) {
    const params = await props.params;
    const data = await getOrder(ORDER_SHOPIFY_ID_PATH + params.orderId);
    const order = getFragmentData(orderFragment, data);
    if (!order) return null;

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

    return (
        <DashboardContent>
            <DashboardContent.Header>
                <h4>Order {order.name}</h4>
                <OrderHeaderActions order={order} />
            </DashboardContent.Header>
            <DashboardContent.Body className="flex flex-col px-5 pb-8 pt-6 font-semibold md:px-8 md:pt-8">
                <div className="flex w-full flex-wrap justify-between gap-8 md:items-end">
                    <div className="flex grow flex-col justify-between gap-[18px]">
                        <div className="uppercase">
                            <div className="text-xs text-muted-foreground md:text-base">
                                Status
                            </div>
                            <div className="text-lg font-bold text-accent-green md:text-xl">
                                {prettifyOrderStatus(
                                    order.displayFulfillmentStatus
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p>
                                <span className="text-neutral-500">
                                    Expected Delivery:
                                </span>{' '}
                                {formatFullDate(latestFulfilment.toString())}
                            </p>
                            <Progress
                                value={60}
                                className="h-2 w-full max-w-96 [&>div]:bg-accent-green"
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
                <Separator className="my-8" />
                <div className="flex w-full flex-row flex-wrap gap-5 md:gap-28">
                    <div className="space-y-3">
                        <h5 className="font-sans text-lg font-bold">
                            Order Details
                        </h5>
                        <OrderDetails order={order} />
                    </div>
                    <div className="space-y-6">
                        <h5 className="font-sans text-lg font-bold">
                            Delivery Address
                        </h5>
                        <p className="whitespace-pre text-sm text-neutral-500 md:text-base">
                            {order.shippingAddress?.formatted.join('\n')}
                        </p>
                    </div>
                    <div className="mt-3 grid w-full grid-cols-2 gap-3 md:hidden">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full md:text-xs">
                            Track parcel
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full md:text-xs">
                            Reorder
                        </Button>
                    </div>
                </div>
            </DashboardContent.Body>
        </DashboardContent>
    );
}
