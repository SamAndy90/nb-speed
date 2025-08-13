'use client';

import { useEffect, useId, useRef } from 'react';
import Script from 'next/script';
import { cn } from '@/lib/utils';

type Props = {
    className?: string;
};

export default function ReviewsBadgeRibbon({ className }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    const initializeWidget = () => {
        if (
            typeof window !== 'undefined' &&
            (window as any).reviewsBadgeRibbon &&
            ref.current &&
            !(ref.current as any)._reviewsInitialized
        ) {
            (window as any).reviewsBadgeRibbon(id, {
                store: 'www.nutriburstvitamins.com',
                size: 'small',
                mono: true,
            });
            (ref.current as any)._reviewsInitialized = true;
        }
    };

    useEffect(() => {
        initializeWidget();
    }, []);

    return (
        <>
            <div ref={ref} id={id} className={cn(className)} />
            <Script
                src="https://widget.reviews.io/badge-ribbon/dist.js"
                strategy="afterInteractive"
                onReady={initializeWidget}
            />
        </>
    );
}
