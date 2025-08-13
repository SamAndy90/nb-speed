import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fontHeading, fontSans } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';
import Header from '@/components/header';
import CookieConsent from '@/components/CookieConsent';
import Script from 'next/script';
import { ConsoleCredit } from '@/components/credit/ConsoleCredit';
import SeoCredit from '@/components/credit/SeoCredit';
import {
    DESKTOP_MAIN_MENU_ITEMS,
    MOBILE_MAIN_MENU_ITEMS,
} from '@/features/shopify/consts';

export const metadata: Metadata = {
    title: 'Nutriburst',
    description: 'Nutriburst',
    authors: [{ name: 'Voelcker Design', url: 'https://voelckerdesign.com' }],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const desktopMenu = await getMenu('desktop-main-menu');
    // const mobileMenu = await getMenu('mobile-main-menu');

    const desktopMenu = DESKTOP_MAIN_MENU_ITEMS;
    const mobileMenu = MOBILE_MAIN_MENU_ITEMS;

    return (
        <html lang="en">
            <head>
                {/* <link
                    rel="stylesheet"
                    href="https://use.typekit.net/rfu4rpw.css"
                /> */}
                {/* Developed by Voelcker Design – https://voelckerdesign.com */}
                <meta name="author" content="Voelcker Design" />
                <meta name="designer" content="Voelcker Design" />

                <Script
                    id="clarity-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "i15d4ji0c3");`,
                    }}
                />
            </head>

            <body
                className={cn(
                    'flex min-h-screen w-screen flex-col items-center justify-between font-sans',
                    fontHeading.variable,
                    fontSans.variable
                )}>
                <ConsoleCredit />
                <SeoCredit />
                <Providers>
                    {mobileMenu && desktopMenu && (
                        <Header
                            mobileMenu={mobileMenu}
                            desktopMenu={desktopMenu}
                        />
                    )}

                    {children}
                    <CookieConsent />
                    <Toaster position="top-right" />
                </Providers>
            </body>
        </html>
    );
}
