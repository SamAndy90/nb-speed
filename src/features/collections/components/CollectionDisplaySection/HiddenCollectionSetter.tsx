'use client';

import { useEffect } from 'react';
import { useCollection } from '../../providers/collection';
import { useSearchParams } from 'next/navigation';

export function HiddenCollectionSetter() {
    const { setBenefitsSelected } = useCollection();

    const searchParams = useSearchParams();
    const benefit = searchParams.get('benefit');

    useEffect(() => {
        if (benefit) {
            const uppsercasedBenefit =
                benefit.slice(0, 1).toUpperCase() + benefit.slice(1);

            setBenefitsSelected([uppsercasedBenefit]);
        }
    }, [benefit]);

    return null;
}
