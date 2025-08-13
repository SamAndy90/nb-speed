'use client';

import { useEffect } from 'react';

type BeholdWidgetProps = {
    beholdId: string;
};

export default function BeholdWidget({ beholdId }: BeholdWidgetProps) {
    useEffect(() => {
        const scriptId = 'behold-widget-script';

        const loadBehold = () => {
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.type = 'module';
                script.src = 'https://w.behold.so/widget.js';
                script.async = true;
                document.body.appendChild(script);
            }
        };

        if (document.readyState === 'complete') {
            loadBehold();
        } else {
            window.addEventListener('load', loadBehold);
            return () => window.removeEventListener('load', loadBehold);
        }
    }, []);

    return <div data-behold-id={beholdId}></div>;
}
