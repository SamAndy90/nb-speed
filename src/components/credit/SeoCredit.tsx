'use client';
import { useEffect } from 'react';

export default function SeoCredit() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify({
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
