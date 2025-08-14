'use client';

import { Fragment } from 'react';
import { StoreCard } from './StoreCard';
import { useFindStore } from './FindStoreProvider';
import { cn } from '@/lib/utils';

export function StoreList() {
    const { stores } = useFindStore();
    if (!stores.length) {
        return (
            <div
                className={
                    'flex h-full w-full justify-center pt-6 md:w-[347px]'
                }>
                <p className={'text-paragraph-2 text-neutral-500'}>
                    No stores found
                </p>
            </div>
        );
    }
    return (
        <div
            className={'custom-scrollbar h-full w-full overflow-y-scroll pr-5'}>
            <div
                className={
                    'flex h-full w-full gap-x-7 md:w-[327px] md:flex-col md:gap-y-10'
                }>
                {stores?.map((s, Idx, arr) => {
                    return (
                        <Fragment key={`${s.latitude}${s.longitude}${Idx}`}>
                            <StoreCard data={s} />
                            <div
                                className={cn(
                                    'min-w-[1px] bg-neutral-200 md:min-h-[1px] md:w-full',
                                    {
                                        'bg-transparent':
                                            Idx === arr.length - 1,
                                    }
                                )}
                            />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}
