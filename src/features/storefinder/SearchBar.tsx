'use client';

import { SelectInput, TextInput } from './Inputs';
import {
    distanceOptions,
    resultsOptions,
    useFindStore,
} from './FindStoreProvider';

export function SearchBar() {
    const {
        query,
        distance,
        resultsAmount,
        setQuery,
        setDistance,
        setResultsAmount,
    } = useFindStore();

    return (
        <div
            className={
                'flex flex-wrap items-center gap-x-2 gap-y-2 md:gap-x-6'
            }>
            <TextInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={'Location / ZIP Code'}
                className={{ inputWrapper: 'flex-1 md:flex-initial' }}
            />
            <SelectInput
                className={{ wrapper: 'hidden md:block' }}
                value={distance}
                onChange={setDistance}
                options={distanceOptions}
                prefix={distance ? 'Distance' : 'Choose distance'}
            />
            <SelectInput
                className={{ wrapper: 'hidden md:block' }}
                value={resultsAmount}
                onChange={setResultsAmount}
                options={resultsOptions}
                prefix={!resultsAmount ? 'Choose amount' : ''}
            />
        </div>
    );
}
