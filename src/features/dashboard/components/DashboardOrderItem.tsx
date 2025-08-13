import Link from 'next/link';
import { ComponentProps } from 'react';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { OrderFragment } from '@/gql/admin/graphql';
import { cn, formatFullDate } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export function DashboardOrder({ className, ...props }: ComponentProps<'li'>) {
    return (
        <li
            {...props}
            className={cn(
                'flex flex-col gap-8 border-b px-5 py-6 last:border-b-0 border-neutral-200',
                className
            )}
        />
    );
}

function DashboardOrderTitle({
    children,
    ...props
}: ComponentProps<typeof Link>) {
    return (
        <Link
            {...props}
            className="flex items-center justify-between text-base font-semibold">
            <p>{children}</p>
            <ChevronRight className="size-5" />
        </Link>
    );
}

function DashboardOrderEstimatedDeliveryDate({
    order,
}: {
    order: OrderFragment;
}) {
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
        <div className="flex flex-col gap-3 font-semibold">
            <p>
                <span className="text-neutral-500">Expected Delivery:</span>{' '}
                {formatFullDate(latestFulfilment.toString())}
            </p>
            <Progress
                value={60}
                className="h-2 w-full max-w-96 [&>div]:bg-accent-green"
            />
        </div>
    );
}
function DashboardOrderDeliveryProgress({
    className,
    ...props
}: ComponentProps<'p'>) {
    return <p className="text-xs text-neutral-500" {...props} />;
}

function DashboardOrderTable() {}

DashboardOrder.Title = DashboardOrderTitle;
DashboardOrder.DeliveryProgress = DashboardOrderDeliveryProgress;
DashboardOrder.EstimatedDeliveryDate = DashboardOrderEstimatedDeliveryDate;
