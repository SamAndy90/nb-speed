import LogoGradient from '@/assets/logo/full-logo-gradient.svg';
import { Separator } from './ui/separator';
import Link, { LinkProps } from 'next/link';
import buyWomenBuilt from '@/assets/buy-women-built.webp';
import wellnessAward from '@/assets/get-the-gloss.webp';
import Image from 'next/image';
import { PropsWithChildren, SVGProps } from 'react';
import { MenuItemFragment } from '@/gql/storefront/graphql';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';
import User from '@/assets/icons/user.svg';
import { PropsWithClassName } from '@/types';
import { cn } from '@/lib/utils';
import Container from './container';
import dynamic from 'next/dynamic';

const ReviewsWidgetModern = dynamic(
    () => import('@/components/ReviewsWidgetModern'),
    {
        ssr: false,
    }
);

function Line() {
    return <span className="text-neutral-300">|</span>;
}
function FooterTitle({ children }: PropsWithChildren) {
    return <h3 className="mb-1 font-sans text-sm font-bold">{children}</h3>;
}
function FooterLink(props: LinkProps & PropsWithChildren) {
    return <Link {...props} />;
}
function FooterColumn({ children }: PropsWithChildren) {
    return <div className="flex flex-col gap-2">{children}</div>;
}

function DesktopMenu({ menu }: { menu: MenuItemFragment[] }) {
    return (
        <div className="my-16 hidden flex-wrap gap-16 text-sm md:flex">
            {menu.map(({ items, title }, i) => (
                <FooterColumn key={`footer-column-${i}`}>
                    <FooterTitle>{title}</FooterTitle>
                    {items.map((item, iLink) => (
                        <FooterLink
                            key={`footer-link-${i}-${iLink}`}
                            href={
                                typeof item.url === 'string' ? item.url : '/'
                            }>
                            {item.title}
                        </FooterLink>
                    ))}
                </FooterColumn>
            ))}
        </div>
    );
}
function MobileMenu({ menu }: { menu: MenuItemFragment[] }) {
    return (
        <Accordion className="mb-8 mt-16 md:hidden" type="single" collapsible>
            {menu.map(({ items, title }, i) => (
                <AccordionItem
                    key={`footer-mobile-accordion-item-${i}`}
                    value={title}
                    className="flex flex-col">
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            {items.map((item, iLink) => (
                                <FooterLink
                                    key={`footer-mobile-accordion-item-link-${i}-${iLink}`}
                                    href={
                                        typeof item.url === 'string'
                                            ? item.url
                                            : '/'
                                    }>
                                    {item.title}
                                </FooterLink>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

function QuickLink({
    icon,
    children,
    className,
    ...rest
}: LinkProps &
    PropsWithClassName &
    PropsWithChildren & { icon: React.FC<SVGProps<SVGElement>> }) {
    const Icon = icon;
    return (
        <Link {...rest} className={cn('flex items-center gap-1 text-sm')}>
            <Icon className="size-4" />
            {children}
        </Link>
    );
}
function QuickLinks() {
    return (
        <div className="mb-8 flex flex-col gap-4 md:hidden">
            <QuickLink href="/account/login" icon={User}>
                Log In
            </QuickLink>
        </div>
    );
}
export function Footer({
    mobileMenu,
    desktopMenu,
}: {
    mobileMenu: MenuItemFragment[];
    desktopMenu: MenuItemFragment[];
}) {
    return (
        <Container>
            <div className="hidden w-full lg:block">
                <Separator className="w-full bg-neutral-200" />
            </div>
            <footer className="flex w-full flex-col pt-8">
                <div className="flex w-full justify-between">
                    <LogoGradient className="w-full md:max-w-[266px]" />
                    <ReviewsWidgetModern
                        widgetId={'footer-review-widget'}
                        className={'hidden max-w-40 md:block'}
                    />
                </div>
                <DesktopMenu menu={desktopMenu} />
                <MobileMenu menu={mobileMenu} />
                <QuickLinks />
                <div className="flex w-full justify-between pb-5">
                    <div className="relative hidden h-16 flex-row justify-start gap-4 *:h-16 *:w-fit *:object-contain md:flex">
                        <Image src={buyWomenBuilt} alt="" />
                        <Image src={wellnessAward} alt="" />
                    </div>
                    <div className="flex h-full w-full flex-row items-center justify-between gap-3 md:w-fit md:flex-col md:items-end"></div>
                </div>
                <div className={'pb-5 text-paragraph-5 text-gray-700'}>
                    Logos are used for editorial reference only. All trademarks
                    remain the property of their respective owners.
                </div>
                <Separator className="max-sm:hidden" />

                <div className="hidden flex-row justify-between gap-14 py-6 text-xs md:flex">
                    <p>
                        ©All rights reserved - provided by Nutriburst Ltd.{' '}
                        {new Date().getFullYear()}
                    </p>
                    <div className="flex grow justify-start gap-3 *:odd:bg-black">
                        <Link href="/legal/toc">Terms & Conditions</Link>
                        <Line />
                        <Link href="/legal/refund">Return Policy</Link>
                        <Line />
                        <Link href="/legal/privacy">Privacy Policy</Link>
                        <Line />
                    </div>
                    <p>
                        Webdesign by{' '}
                        <Link
                            href="https://www.voelckerdesign.com"
                            target={'_blank'}
                            className="underline underline-offset-2 transition-all hover:underline-offset-4">
                            Voelcker Design
                        </Link>
                    </p>
                </div>
                <div className="flex flex-col md:hidden">
                    <p className="h-12 text-xs">
                        ©All rights reserved - provided by Nutriburst Ltd.{' '}
                        {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
            <div className="w-full bg-theme-50 p-2 text-center text-xs font-bold md:hidden">
                designed by{' '}
                <Link
                    className="underline"
                    href="https://www.voelckerdesign.com"
                    target={'_blank'}>
                    voelcker design
                </Link>
            </div>
        </Container>
    );
}
