'use client';
import { useEffect } from 'react';

export function ConsoleCredit() {
    useEffect(() => {
        console.log(
            '%cBuilt by Voelcker Design – https://voelckerdesign.com',
            'color: #2b6777; font-size: 12px;'
        );
    }, []);

    return null;
}
