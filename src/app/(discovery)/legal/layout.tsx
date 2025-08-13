import { Footer } from '@/components/Footer';
import { DESKTOP_FOOTER_MENU_ITEMS, MOBILE_FOOTER_MENU_ITEMS } from '@/features/shopify/consts';
import React from 'react';

const TosLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="w-full pt-[7.5rem]">
            {children}
            <Footer
                desktopMenu={DESKTOP_FOOTER_MENU_ITEMS}
                mobileMenu={MOBILE_FOOTER_MENU_ITEMS}
            />
        </section>
    );
};

export default TosLayout;
