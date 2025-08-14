import { Footer } from '@/components/Footer';
import {
    DESKTOP_FOOTER_MENU_ITEMS,
    MOBILE_FOOTER_MENU_ITEMS,
} from '@/features/shopify/consts';
import React, { ReactNode } from 'react';

const LandingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {children}
            <Footer
                desktopMenu={DESKTOP_FOOTER_MENU_ITEMS}
                mobileMenu={MOBILE_FOOTER_MENU_ITEMS}
            />
        </>
    );
};

export default LandingLayout;
