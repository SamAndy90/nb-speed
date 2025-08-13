'use client';

import NextAdapterApp from 'next-query-params/app';
import { PropsWithChildren } from 'react';
import { QueryParamProvider } from 'use-query-params';

export function QueryParamsProvider({ children }: PropsWithChildren) {
    return (
        <QueryParamProvider adapter={NextAdapterApp}>
            {children}
        </QueryParamProvider>
    );
}
