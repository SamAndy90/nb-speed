'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

type ReviewsWidgetProps = {
    widgetId: string;
    className?: string;
};

export default function ReviewsWidget({
    widgetId,
    className,
}: ReviewsWidgetProps) {
    const ref = useRef<HTMLDivElement>(null);

    const initializeWidget = () => {
        if (
            typeof window !== 'undefined' &&
            (window as any).reviewsBadgeModern &&
            ref.current &&
            !(ref.current as any)._reviewsBadgeModern
        ) {
            (window as any).reviewsBadgeModern(widgetId, {
                store: 'www.nutriburstvitamins.com',
                primaryClr: '#2D2F36',
                starsClr: '#2D2F36',
            });
            (ref.current as any)._reviewsBadgeModern = true;
        }
    };

    useEffect(() => {
        initializeWidget();
    }, []);

    return (
        <>
            <div ref={ref} id={widgetId} className={className} />
            <Script
                src="https://widget.reviews.io/badge-modern/dist.js"
                strategy="afterInteractive"
                onReady={initializeWidget}
            />
        </>
    );
}
