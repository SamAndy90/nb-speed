'use client';

import dynamic from 'next/dynamic';

export const CBackedByScience = dynamic(
    () => import('./BackedByScience').then((mod) => mod.BackedByScience),
    {
        ssr: false,
    }
);
