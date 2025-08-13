'use client';

import FindStore from '@/features/storefinder/findstore';
import Hero from '@/features/storefinder/hero';

export default function StoreFinderPage() {
    return (
        <main className={'w-full'}>
            <Hero />
            <FindStore />
        </main>
    );
}
