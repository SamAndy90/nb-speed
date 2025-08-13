import { getCustomerOrders } from '@/features/shopify/api/fetch';
import { getCurrentCustomer } from '@/features/shopify/server';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { currencyFormatter, formatDate, stripIdNumber } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFragmentData } from '@/gql/admin';
import { orderFragment } from '@/features/shopify/graphql/admin/fragments/order';
import { DashboardOrderPreviews } from '@/components/DashboardOrderPreviews';
import { prettifyOrderStatus } from '@/features/shopify/utils';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { DashboardOrder } from '@/features/dashboard/components/DashboardOrderItem';
import { DashboardContent } from '@/features/dashboard/components/DashboardContent';

export default async function OrderPage() {
    const customer = await getCurrentCustomer();
    const orders = customer && (await getCustomerOrders(customer?.id));
    const orderFragments = orders ? getFragmentData(orderFragment, orders) : [];

    const filteredOrders = orderFragments?.filter((order) => !order.tags.includes('Subscription'));

    if (!filteredOrders || (filteredOrders.length === 0)) {
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


    return (
        <>
            <ul className="rounded-[10px] border border-neutral-200 lg:hidden">
                {filteredOrders.map((order) => (
                    <DashboardOrder>
                        <div className="flex flex-col gap-3">
                            <DashboardOrder.Title
                                href={`/account/orders/${stripIdNumber(order.id)}`}>
                                Order {order.name}
                            </DashboardOrder.Title>
                            <DashboardOrder.EstimatedDeliveryDate
                                order={order}
                            />
                        </div>
                        <div className="flex h-[110px] flex-row gap-3">
                            <DashboardOrderPreviews
                                itemImages={order.lineItems.edges.map(
                                    ({ node }) =>
                                        getFragmentData(
                                            imageFragment,
                                            node.image
                                        )!
                                )}
                            />
                        </div>
                        <div className="flex text-sm font-semibold">
                            <div className="w-[123px] space-y-3 text-neutral-500">
                                <p>Order Date</p>
                                <p>Total Amount</p>
                            </div>
                            <div className="space-y-3">
                                <p>{formatDate(order.processedAt)}</p>
                                <p>
                                    {currencyFormatter.format(
                                        order.currentTotalPriceSet
                                            .presentmentMoney.amount
                                    )}
                                </p>
                            </div>
                        </div>
                    </DashboardOrder>
                ))}
            </ul>
            <div className="h-full w-full max-lg:hidden">
                {' '}
                <Table className="hidden min-w-[640px] lg:table">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/4">Orders</TableHead>
                            <TableHead>Order No</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="">Subtotal</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="px-5">Reorder</TableHead>
                            <TableHead className="px-5">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id} className="">
                                <TableCell className="flex h-[132px] flex-row gap-4">
                                    <DashboardOrderPreviews
                                        itemImages={order.lineItems.edges.map(
                                            ({ node }) =>
                                                getFragmentData(
                                                    imageFragment,
                                                    node.image
                                                )!
                                        )}
                                    />
                                </TableCell>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>
                                    {formatDate(order.processedAt)}
                                </TableCell>

                                <TableCell>
                                    {currencyFormatter.format(
                                        order.currentTotalPriceSet
                                            .presentmentMoney.amount
                                    )}
                                </TableCell>
                                <TableCell>
                                    {prettifyOrderStatus(
                                        order.displayFulfillmentStatus
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        className="text-base font-semibold">
                                        Reorder
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="flex items-center justify-center text-base font-semibold">
                                        <Link
                                            href={`/account/orders/${stripIdNumber(order.id)}`}>
                                            View Order
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
