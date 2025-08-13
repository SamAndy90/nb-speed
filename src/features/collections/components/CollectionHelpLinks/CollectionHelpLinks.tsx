import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';
import ChevronRight from '@/assets/icons/chevron-right.svg';
function CollectionHelpLink({
    children,
    ...props
}: LinkProps & PropsWithChildren) {
    return (
        <Link
            {...props}
            className="flex items-center justify-center text-sm font-bold">
            {children} <ChevronRight className="-mb-px size-3.5" />
        </Link>
    );
}
function CollectionHelpCard({
    children,
    href,
}: PropsWithChildren & Pick<LinkProps, 'href'>) {
    return (
        <li className="flex flex-col items-center justify-center border-b px-[29.5px] py-12.5 text-center first:border-t md:border-b-0 md:border-r first:md:border-t-0 last:md:border-r-0">
            {children}
            {/*<CollectionHelpLink href={href}>Find out more</CollectionHelpLink>*/}
        </li>
    );
}
function CollectionHelpTitle({ top, bottom }: { top: string; bottom: string }) {
    return (
        <h3 className="mb-4 flex flex-col items-center justify-center gap-1 text-mobile-h3 md:text-desktop-h4">
            <div className="font-sans text-sm font-bold uppercase">{top}</div>
            {bottom}
        </h3>
    );
}
function CollectionHelpDescription({ children }: PropsWithChildren) {
    return <p className="mb-4 text-sm md:mb-6 md:text-base">{children}</p>;
}

export function CollectionHelpLinks() {
    return (
        <ul className="flex flex-wrap md:hidden">
        {/*<ul className="flex flex-wrap md:grid md:grid-cols-3 md:hidden">*/}
            <CollectionHelpCard href="/">
                <CollectionHelpTitle top="Recurring" bottom="Subscriptions" />
                <CollectionHelpDescription>
                    Save & enjoy having your favourites delivered on your
                    schedule.
                </CollectionHelpDescription>
            </CollectionHelpCard>
            <CollectionHelpCard href="/">
                <CollectionHelpTitle top="Safe" bottom="Payment" />
                <CollectionHelpDescription>
                    Secure payments, always protected. Your safety is our
                    priority.
                </CollectionHelpDescription>
            </CollectionHelpCard>
        </ul>
    );
}
