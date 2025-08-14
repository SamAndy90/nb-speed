import React from 'react';

import { Footer } from '@/components/Footer';
import {
    DESKTOP_FOOTER_MENU_ITEMS,
    MOBILE_FOOTER_MENU_ITEMS,
} from '@/features/shopify/consts';

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="w-full">{children}</main>
            <Footer
                desktopMenu={DESKTOP_FOOTER_MENU_ITEMS}
                mobileMenu={MOBILE_FOOTER_MENU_ITEMS}
            />
        </>
    );
}
