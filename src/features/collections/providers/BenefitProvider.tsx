'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type BenefitContextType = {
    benefitValue: string;
    setBenefitValue: (v: string) => void;
};

const BenefitContext = createContext<BenefitContextType | null>(null);

export function BenefitContextProvider({ children }: PropsWithChildren) {
    const [benefit, setBenefit] = useState('');

    const value: BenefitContextType = {
        benefitValue: benefit,
        setBenefitValue: (v: string) => setBenefit(v),
    };

    return (
        <BenefitContext.Provider value={value}>
            {children}
        </BenefitContext.Provider>
    );
}

export function useBenefit() {
    const benefitContext = useContext(BenefitContext);
    if (!benefitContext) {
        throw new Error(
            'useBenefit must be used within a BenefitContextProvider'
        );
    }
    return benefitContext;
}
