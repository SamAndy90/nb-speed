import { cn } from '@/lib/utils';
import { AsProps, PropsWithClassName } from '@/types';
import React, { ComponentProps, PropsWithChildren } from 'react';

export function DashboardContent({
    className,
    ...props
}: ComponentProps<'section'>) {
    return <section className={cn('w-full', className)} {...props} />;
}

function DashboardContentHeader<T extends React.ElementType>({
    children,
    className,
    as = 'header',
}: PropsWithChildren & PropsWithClassName & AsProps<T>) {
    const Component = as;
    return (
        <Component
            className={cn(
                'flex w-full items-center justify-between rounded-t-[calc(var(--radius)-6px)] border border-neutral-200 bg-theme-50 px-5 py-8 md:px-8 md:py-8',
                className
            )}>
            {children}
        </Component>
    );
}

function DashboardContentBody<T extends React.ElementType>({
    children,
    className,
    as = 'div',
}: PropsWithChildren & PropsWithClassName & AsProps<T>) {
    const Component = as;
    return (
        <Component
            className={cn(
                'flex w-full flex-col items-center justify-between rounded-b-[calc(var(--radius)-6px)] border border-t-0 border-neutral-200 bg-primary-white',
                className
            )}>
            {children}
        </Component>
    );
}

DashboardContent.Header = DashboardContentHeader;
DashboardContent.Body = DashboardContentBody;
