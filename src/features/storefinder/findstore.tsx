'use client';

import Container from '@/components/container';
import { SearchBar } from './SearchBar';
import { StoreList } from './StoreList';
import { FindStoreProvider } from './FindStoreProvider';

import dynamic from 'next/dynamic';

const Map = dynamic(
    () =>
        import('@/features/storefinder/Map').then((component) => component.Map),
    { ssr: false }
);

export default function FindStore() {
    return (
        <FindStoreProvider>
            <section>
                <Container>
                    <div className={'py-[45px] md:pb-[70px] md:pt-20'}>
                        <div className={'mb-12 md:mb-[4.5rem]'}>
                            <SearchBar />
                        </div>
                        <div
                            className={
                                'flex flex-col gap-y-[90px] md:flex-row md:gap-x-6 lg:gap-x-12 xl:gap-x-[4.5rem]'
                            }>
                            <div
                                className={
                                    'relative overflow-y-hidden after:absolute after:bottom-0 after:left-0 after:hidden after:h-10 after:w-full after:max-w-[calc(100%-12px)] after:bg-gradient-to-t after:from-primary-white after:to-transparent md:h-auto md:max-h-[584px] md:after:block'
                                }>
                                <StoreList />
                            </div>
                            <div
                                className={
                                    'relative z-0 flex min-h-[460px] flex-1 overflow-hidden rounded-[1.25rem] sm:block sm:aspect-[1.26/1] sm:min-h-0'
                                }>
                                <Map />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </FindStoreProvider>
    );
}
