// @deprecated
'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from '@/components/ui/accordion';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    NextNavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
    PropsWithChildren,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Button } from './ui/button';
import Search from '@/assets/icons/search.svg';

import User from '@/assets/icons/user.svg';
import Menu from '@/assets/icons/menu.svg';
import Help from '@/assets/icons/help.svg';
import Close from '@/assets/icons/close.svg';
import LogoBlack from '@/assets/logo/logo-black.svg';
import { NavMaryBadge } from '@/features/landing/components/ExpertBadge';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet';
import { MenuItemFragment } from '@/gql/storefront/graphql';
import Link from 'next/link';
import { PropsWithClassName } from '@/types';
import { cn } from '@/lib/utils';
import {
    PrimaryAccordionLink,
    PrimaryAccordionTrigger,
} from './ui/nav-accordion';
import React from 'react';
import { CartSheet } from '@/features/cart/components/CartSheet';
import Container from './container';
import { usePathname } from 'next/navigation';
import { useHasScrolled } from '@/hooks/useHasScrolled';

const FULL_HERO_PAGES = ['/pages/maryearps'];
const BLACK_FULL_HERO_PAGES = ['/pages/environment-and-sustainability'];

const MobileNavContext = React.createContext<
    | {
          close: () => void;
      }
    | undefined
>(undefined);

export const MobileNavProvider = ({
    children,
    value,
}: PropsWithChildren & { value: { close: () => void } }) => {
    return (
        <MobileNavContext.Provider value={value}>
            {children}
        </MobileNavContext.Provider>
    );
};

export const useMobileNav = () => {
    const context = React.useContext(MobileNavContext);
    if (!context) {
        throw new Error('useMobileNav must be used within a MobileNavProvider');
    }
    return context;
};

export function Nav({
    mobileMenu,
    desktopMenu,
}: {
    mobileMenu: MenuItemFragment[];
    desktopMenu: MenuItemFragment[];
}) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const pathname = usePathname();
    const hasFullHero = FULL_HERO_PAGES.includes(pathname);
    const showBackDropByScrolling = [
        ...FULL_HERO_PAGES,
        ...BLACK_FULL_HERO_PAGES,
    ].includes(pathname);
    const hasScrolled = useHasScrolled();
    const [navMenuOpenValue, setNavMenuOpenValue] = useState<string>('');
    const isNavMenuOpen = Boolean(navMenuOpenValue);

    useEffect(() => {
        setMobileNavOpen(false);
    }, [pathname]);

    return (
        <nav
            className={cn(
                'sticky top-0 z-40 h-14 w-full overflow-x-clip font-semibold text-neutral-700 transition-all has-[[data-state=open]]:bg-primary md:h-20',
                {
                    'text-primary-white':
                        !hasScrolled &&
                        hasFullHero &&
                        !isNavMenuOpen &&
                        !mobileNavOpen,
                }
            )}>
            <Container className="flex h-full justify-between">
                <div className="peer relative z-10 flex h-full w-full justify-between">
                    <Link className="h-full py-4" href="/">
                        <LogoBlack
                            className={cn('h-full text-[#222221]', {
                                'text-primary-white':
                                    !hasScrolled &&
                                    hasFullHero &&
                                    !isNavMenuOpen &&
                                    !mobileNavOpen,
                            })}
                        />
                    </Link>
                    <DesktopNavMenu
                        value={navMenuOpenValue}
                        items={desktopMenu}
                        onNavMenuOpenChange={setNavMenuOpenValue}
                    />
                    <NavButtonList
                        className={cn('text-primary-black', {
                            'text-primary-white':
                                !hasScrolled &&
                                hasFullHero &&
                                !isNavMenuOpen &&
                                !mobileNavOpen,
                        })}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="max-md:hidden">
                            <Search />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex"
                            asChild>
                            <Link href="/account/overview">
                                <User />
                            </Link>
                        </Button>

                        <MobileNavProvider
                            value={{ close: () => setMobileNavOpen(false) }}>
                            <MobileNavMenu
                                items={mobileMenu}
                                open={mobileNavOpen}
                                onOpenChange={setMobileNavOpen}
                            />
                        </MobileNavProvider>
                        <CartSheet />
                    </NavButtonList>
                </div>
            </Container>

            <div
                className={cn(
                    'webkit-backdrop-blur-2xl absolute left-0 top-0 h-full w-full grow bg-primary/50 backdrop-blur-2xl peer-has-[[data-state=open]]:bg-primary',
                    'hasFullHero',
                    {
                        'opacity-0 transition-all duration-300':
                            showBackDropByScrolling,
                    },
                    { 'opacity-100': hasScrolled }
                )}
            />
        </nav>
    );
}

function NavMenuItem({
    isOpen,
    item: { items, title, url },
}: {
    isOpen: boolean;
    item: MenuItemFragment;
}) {
    if (items.length === 0)
        return (
            <NextNavigationMenuLink className={'px-2 text-inherit'} href={url}>
                {title}
            </NextNavigationMenuLink>
        );

    const [firstChild, ...rest] = items;
    //Using has to either show the separate leftmost column, or to show 1 list of items
    //Might be able to remove this logic, depending on the content of the menus
    return (
        <NavigationMenuItem value={title}>
            <NavigationMenuTrigger className={cn('h-20 px-2 text-inherit')}>
                {title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
                className={cn('flex flex-col bg-primary pb-0')}>
                <div
                    className={cn(
                        'min-h-60 w-screen overflow-hidden duration-300'
                    )}>
                    <Container
                        as="ul"
                        className="group relative z-10 flex h-full grow justify-between py-6">
                        <NavMenuSubItem
                            item={firstChild}
                            className="hidden text-lg group-has-[ul]:block"
                        />
                        <div className="flex flex-col gap-2 group-has-[ul]:flex-row">
                            <NavMenuSubItem
                                item={firstChild}
                                className="group-has-[ul]:hidden"
                            />
                            {rest.map((subItem) => (
                                <NavMenuSubItem
                                    item={subItem}
                                    key={subItem.title}
                                />
                            ))}
                        </div>

                        <NavMaryBadge className="md:relative md:bottom-0 md:right-0 md:top-0" />
                    </Container>
                </div>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}

function NavMenuSubItem({
    item: { items, title, url },
    className,
    style,
}: {
    item: MenuItemFragment['items'][0];
    style?: React.CSSProperties;
} & PropsWithClassName) {
    if (items.length === 0)
        return (
            <li key={title} className={className}>
                <NextNavigationMenuLink
                    href={url ?? '/'}
                    className="px-0 font-bold">
                    {title}
                </NextNavigationMenuLink>
            </li>
        );
    return (
        <li className={cn('min-w-44 text-sm', className)} style={style}>
            <ul>
                <div className="pb-4 text-sm text-secondary-foreground">
                    {title}
                </div>
                <ul className="flex flex-col gap-[0.3lh]">
                    {items.map((subItem) => (
                        <li key={subItem.title}>
                            <NextNavigationMenuLink
                                href={subItem.url}
                                className="px-0 text-[1em] font-bold">
                                {subItem.title}
                            </NextNavigationMenuLink>
                        </li>
                    ))}
                </ul>
            </ul>
        </li>
    );
}

function DesktopNavMenu({
    value,
    items,
    onNavMenuOpenChange,
}: {
    value: string;
    items: MenuItemFragment[];
    onNavMenuOpenChange: (value: string) => void;
}) {
    const navMenuRef = useRef(null!);
    //Track the width of the nav menu
    const handleValueChange = (value: string) => {
        onNavMenuOpenChange(value);
    };

    return (
        <NavigationMenu value={value} onValueChange={handleValueChange}>
            <NavigationMenuList
                className="hidden space-x-0 md:flex"
                ref={navMenuRef}>
                {items.map(({ items, title, url }) => {
                    return (
                        <NavMenuItem
                            isOpen={title === value}
                            key={title}
                            item={{ items, title, url }}
                        />
                    );
                })}
            </NavigationMenuList>

            <NavigationMenuViewport className="fixed left-0 rounded-none border-none shadow-none" />
        </NavigationMenu>
    );
}

function MobileNavItem({
    item: { items, title, url },
}: {
    item: MenuItemFragment;
}) {
    const { close } = useMobileNav();
    if (items.length === 0)
        return (
            <PrimaryAccordionLink href={url} onClick={close}>
                {title}
            </PrimaryAccordionLink>
        );
    return (
        <AccordionItem value={title} className="border-b-0">
            <PrimaryAccordionTrigger value={title}>
                {title}
            </PrimaryAccordionTrigger>
            <AccordionContent className="pb-0">
                <ul className="my-2 flex flex-col gap-2">
                    {items.map((subItem) => (
                        <li key={subItem.title}>
                            <Button
                                asChild
                                className="py-1 text-sm font-normal no-underline hover:underline"
                                size="inline"
                                variant="linkMuted">
                                <Link href={subItem.url ?? ''} onClick={close}>
                                    {subItem.title}
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    );
}

function differentMenuItemTypes(a: MenuItemFragment, b?: MenuItemFragment) {
    if (!b) return false;
    return a.items.length > 0 != b.items.length > 0;
}
function MobileNavMenu({
    items,
    open,
    onOpenChange,
}: {
    items: MenuItemFragment[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="order-3 max-md:w-auto md:hidden">
                    {open ? <Close className="size-4" /> : <Menu />}
                </Button>
            </SheetTrigger>
            <SheetContent
                side="top"
                className="top-12 z-40 flex h-[calc(100vh-3rem)] flex-col gap-10 overflow-y-scroll pt-[90px] font-semibold">
                <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-4">
                    {items.map((item, i, arr) => (
                        <React.Fragment key={item.title}>
                            <MobileNavItem item={item} />
                            {differentMenuItemTypes(item, arr[i + 1]) && (
                                <div className="h-2" />
                            )}
                        </React.Fragment>
                    ))}
                </Accordion>
                <SheetFooter className="flex-col gap-4">
                    <PrimaryAccordionLink href="/" className="gap-3">
                        <Search /> Search
                    </PrimaryAccordionLink>
                    <PrimaryAccordionLink
                        href="/account/overview"
                        className="gap-3">
                        <User /> Account
                    </PrimaryAccordionLink>
                    <PrimaryAccordionLink href="/" className="gap-3">
                        <Help /> Help & FAQ
                    </PrimaryAccordionLink>
                </SheetFooter>
                {open && (
                    <div className="flex grow flex-col justify-end">
                        <NavMaryBadge />
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

function NavButtonList({
    children,
    className = '',
}: {
    children?: ReactNode;
    className?: string;
}) {
    return (
        <ul
            className={cn(
                'relative z-50 flex items-center justify-center gap-6 md:gap-0',
                className
            )}>
            {children}
        </ul>
    );
}
