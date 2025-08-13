import { getCurrentCartAction } from '@/features/cart/actions';
import { CartContextProvider } from '@/features/cart/context/cart';
import { PropsWithChildren } from 'react';
import ClientQueryClientProvider from '@/ClientQueryClientProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryParamsProvider } from './QueryParamsProvider';
import { BenefitContextProvider } from '@/features/collections/providers/BenefitProvider';
export function Providers({ children }: PropsWithChildren) {
    const cartPromise = getCurrentCartAction().then((res) =>
        res.success ? res.data : undefined
    );

    return (
        <NuqsAdapter>
            <ClientQueryClientProvider>
                <CartContextProvider cartPromise={cartPromise}>
                    <QueryParamsProvider>
                        <BenefitContextProvider>
                            {children}
                        </BenefitContextProvider>
                    </QueryParamsProvider>
                </CartContextProvider>
            </ClientQueryClientProvider>
        </NuqsAdapter>
    );
}
