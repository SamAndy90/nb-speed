'use client';
import { useEffect } from 'react';

export default function SeoCredit() {
    useEffect(() => {
        if (document.getElementById('seo-credit-jsonld')) return;

        const script = document.createElement('script');
        script.id = 'seo-credit-jsonld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Client Brand Name',
            author: {
                '@type': 'Organization',
                name: 'Voelcker Design',
                url: 'https://voelckerdesign.com',
            },
        });

        document.head.appendChild(script);
    }, []);

    return null;
}
