'use client';

import React, { useState, PropsWithChildren, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from './container';
import LogoBlack from '@/assets/logo/logo-black.svg';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import User from '@/assets/icons/user.svg';
import { usePathname } from 'next/navigation';
import { useHasScrolled } from '@/hooks/useHasScrolled';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopNav from './header/desktop-nav';
import { MenuItemFragment } from '@/gql/storefront/graphql';
// import DesktopSubmenu from './header/desktop-submenu';
// import MobileNavMenu from './header/mobile-nav-menu';
// import Cart from '@/features/cart/components/Cart/Cart';
// import SearchComponent from './search/SearchComponent';

import dynamic from 'next/dynamic';

const DesktopSubmenu = dynamic(() => import('./header/desktop-submenu'), {
    ssr: false,
});
const SearchComponent = dynamic(() => import('./search/SearchComponent'), {
    ssr: false,
});
const Cart = dynamic(() => import('@/features/cart/components/Cart/Cart'), {
    ssr: false,
});
const MobileNavMenu = dynamic(() => import('./header/mobile-nav-menu'), {
    ssr: false,
});

const FULL_HERO_PAGES = ['/pages/maryearps'];

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

const Header = ({
    mobileMenu,
    desktopMenu,
}: {
    mobileMenu: MenuItemFragment[];
    desktopMenu: MenuItemFragment[];
}) => {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const isScrolled = useHasScrolled();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const desktop = useMediaQuery('lg');
    const pathname = usePathname();
    const hasFullHero = FULL_HERO_PAGES.includes(pathname);
    const hasWhiteColor =
        !isScrolled && hasFullHero && activeMenu === null && !mobileNavOpen;
    const closeTimeoutRef = useRef<NodeJS.Timeout>();
    const openTimeoutRef = useRef<NodeJS.Timeout>();

    const handleOnMouseLeave = () => {
        // Clear any existing open timeout
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }

        // Clear any existing close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }

        // Set new timeout with 300ms delay
        closeTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 300);
    };

    const handleSubMenuMouseLeave = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        setActiveMenu(null);
    };

    const handleOnMouseEnter = (index: number | null) => {
        // Clear any existing close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }

        // Clear any existing open timeout
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }

        // Set new timeout with debounce delay for opening
        openTimeoutRef.current = setTimeout(() => {
            setActiveMenu(index);
        }, 150); // Using a slightly shorter delay for opening than closing
    };

    // Cleanup timeouts on unmount
    React.useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
            if (openTimeoutRef.current) {
                clearTimeout(openTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            {/* Background overlay */}
            <motion.div
                className="fixed left-0 top-0 z-40 w-full"
                initial={{
                    height: desktop ? '83px' : '58px',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(0px)',
                }}
                animate={{
                    height: mobileNavOpen
                        ? '100vh'
                        : activeMenu !== null
                          ? '385px'
                          : desktop
                            ? '83px'
                            : '58px',
                    backgroundColor:
                        activeMenu !== null || isScrolled || mobileNavOpen
                            ? 'rgb(254, 254, 251)'
                            : 'rgba(255, 255, 255, 0)',
                    backdropFilter:
                        activeMenu !== null || isScrolled || mobileNavOpen
                            ? 'blur(20px)'
                            : 'blur(0px)',
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                }}
            />

            {/* Header content */}
            <header
                className={cn(
                    'fixed left-0 top-0 z-40 w-full text-neutral-700',
                    {
                        'text-primary-white': hasWhiteColor,
                    }
                )}>
                <Container>
                    <nav className="flex h-[58px] w-full justify-between lg:h-[83px]">
                        <Link className="h-full py-4" href="/">
                            <LogoBlack
                                className={cn('h-full text-[#222221]', {
                                    'text-primary-white': hasWhiteColor,
                                })}
                            />
                        </Link>

                        <DesktopNav
                            activeMenu={activeMenu}
                            hasWhiteColor={hasWhiteColor}
                            menuItems={desktopMenu}
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                        />

                        <div className="relative z-50 flex items-center justify-center gap-1 md:gap-0">
                            <MobileNavProvider
                                value={{
                                    close: () => setMobileNavOpen(false),
                                }}>
                                <SearchComponent />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden md:flex"
                                    asChild>
                                    <Link href="/account/overview">
                                        <User />
                                    </Link>
                                </Button>

                                {!mobileNavOpen && <Cart />}
                                <MobileNavMenu
                                    items={mobileMenu}
                                    open={mobileNavOpen}
                                    onOpenChange={setMobileNavOpen}
                                />
                            </MobileNavProvider>
                        </div>
                    </nav>
                </Container>
            </header>
            {/* Enhanced submenu with slide animation */}
            <DesktopSubmenu
                menuItems={desktopMenu}
                activeMenu={activeMenu}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleSubMenuMouseLeave}
            />

            {/* Spacer */}
            <div className="h-[56px] lg:h-[80px]" />

            <div
                className={cn(
                    'invisible fixed h-screen w-screen opacity-0 backdrop-blur-[100px] transition-all duration-300',
                    {
                        'visible z-30 opacity-100':
                            activeMenu !== null || mobileNavOpen,
                    }
                )}
            />
        </>
    );
};

export default Header;
