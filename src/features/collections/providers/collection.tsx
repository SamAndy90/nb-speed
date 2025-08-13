'use client';

import { useQuery } from '@tanstack/react-query';
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { ProductCollectionSortKey } from '../types';
import { useSearchParams } from 'next/navigation';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { extractSortKeyAndDirection, updateTags } from '../utils/utils';
import { Product } from '@/features/product/types';
import { getFragmentData } from '@/gql/storefront';
import { ImageFragment } from '@/gql/storefront/graphql';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { getCollectionProductsByHandleAction } from '../actions';
import { ProductRatingBatch } from '@/lib/reviews/types';
import { useBenefit } from './BenefitProvider';

type CollectionState = {
    products: Product[];
    sortKey: ProductCollectionSortKey | null;
    allBenefits: string[];
    benefitsSelected: string[];
    allCollections: string[];
    collectionImages: Record<string, ImageFragment>;
    collectionsSelected: string[];
    ratings: ProductRatingBatch[];
};

export type CollectionContextType = {
    isLoading: boolean;
    collection: CollectionState;
    setSortKey: (sortKey: ProductCollectionSortKey) => void;
    setBenefitsSelected: (benefits: string[] | 'all') => void;
    setCollectionsSelected: (categories: string[] | 'all') => void;
};

function filterAndSortProductsByQuery(
    products: Product[],
    rawQuery: string
): Product[] {
    if (!rawQuery.trim() || rawQuery.trim().length < 2) return products;

    const queryWords = rawQuery
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length >= 1);

    type ProductWithScore = Product & { _matchScore: number };

    const scoredProducts: ProductWithScore[] = products
        .map((product) => {
            let score = 0;

            const title = product.title.toLowerCase();
            const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
            const benefits =
                product.benefits?.map((b) => b.toLowerCase()) ?? [];

            for (const word of queryWords) {
                if (title.includes(word)) score += 5;
                if (tags.some((tag) => tag.includes(word))) score += 3;
                if (benefits.some((benefit) => benefit.includes(word)))
                    score += 2;
            }

            return {
                ...product,
                _matchScore: score,
            };
        })
        .filter((p) => p._matchScore > 0)
        .sort((a, b) => b._matchScore - a._matchScore);

    return scoredProducts;
}

function sortCollectionProducts(
    products: Product[],
    sortKey: ProductCollectionSortKey
) {
    const [sortType, sortDirection] = extractSortKeyAndDirection(sortKey ?? '');
    switch (sortType) {
        case 'title':
            return sortDirection === 'asc'
                ? products.sort((a, b) => a.title.localeCompare(b.title))
                : products.sort((a, b) => b.title.localeCompare(a.title));

        case 'price':
            return sortDirection === 'asc'
                ? products.sort(
                      (a, b) =>
                          a.variants[0].price.amount -
                          b.variants[0].price.amount
                  )
                : products.sort(
                      (a, b) =>
                          b.variants[0].price.amount -
                          a.variants[0].price.amount
                  );
        case 'popular':
        default:
            return [...products].sort((a, b) => {
                const aIsAdvanced = a.benefits?.includes('Advanced') ?? false;
                const bIsAdvanced = b.benefits?.includes('Advanced') ?? false;

                if (aIsAdvanced && !bIsAdvanced) return -1;
                if (!aIsAdvanced && bIsAdvanced) return 1;
                return 0;
            });
    }
}
const CollectionContext = createContext<CollectionContextType | null>(null);

function useTagList<T extends string>(allTags: T[]) {
    const [selected, setSelected] = useState<string[]>(allTags);
    const updateSelected = useCallback(
        (newTags: string[] | 'all') =>
            setSelected((old) => updateTags(allTags, old, newTags)),
        [allTags]
    );
    return [selected, updateSelected] as const;
}
export function CollectionContextProvider({
    children,
    handle,
    initialCollection,
    initialRatings,
}: {
    handle: string;
    initialCollection: Product[];
    initialRatings: ProductRatingBatch[];
} & PropsWithChildren) {
    const params = useSearchParams();
    const sortKey = params.get('sort');
    const query = params.get('query');
    const { benefitValue } = useBenefit();
    const updateUrl = useUpdateURL();

    const allBenefits = useMemo(
        () => Array.from(new Set(initialCollection.flatMap((p) => p.benefits))),
        [initialCollection]
    );

    const allCollections = useMemo(() => {
        const collectionFragments = initialCollection.flatMap(
            (p) => p.collections.nodes
        );
        const collections = Array.from(
            new Set(collectionFragments.map((c) => c.title))
        );
        return collections;
    }, [initialCollection]);

    const collectionImages = useMemo(() => {
        const collections = initialCollection.flatMap(
            (p) => p.collections.nodes
        );

        const collectionImages: Record<string, ImageFragment> =
            Object.fromEntries(
                collections
                    .map((c) => [
                        c.title,
                        getFragmentData(imageFragment, c.image),
                    ])
                    .filter(([_, img]) => img)
            );
        return collectionImages;
    }, [initialCollection]);

    const ratings = useMemo(() => {
        return initialRatings;
    }, [initialRatings]);

    const [benefitsSelected, setBenefitsSelected] = useTagList(allBenefits);
    const [collectionsSelected, setCollectionsSelected] =
        useTagList(allCollections);

    useEffect(() => {
        if (benefitValue) {
            setBenefitsSelected([benefitValue]);
        }
    }, [benefitValue]);

    const { isLoading, isFetching, error, data, status, refetch } = useQuery<
        Product[]
    >({
        queryKey: [
            handle,
            sortKey ?? 'default',
            benefitsSelected,
            collectionsSelected,
            benefitValue,
        ],
        queryFn: async () => {
            const res = await getCollectionProductsByHandleAction(
                handle,
                sortKey ?? undefined,
                benefitsSelected,
                allBenefits,
                collectionsSelected,
                allCollections
            );

            return res.success
                ? sortCollectionProducts(
                      res.data,
                      sortKey as ProductCollectionSortKey
                  )
                : [];
        },
        initialData: [],
    });

    const setSortKey = useCallback(
        (key: string) => {
            updateUrl({ sort: key });
            refetch();
        },
        [updateUrl, refetch]
    );

    const filteredByQuery = useMemo(() => {
        return filterAndSortProductsByQuery(data, query ?? '');
    }, [data, query]);

    useEffect(() => {
        refetch();
    }, [
        sortKey,
        benefitsSelected,
        collectionsSelected,
        refetch,
        query,
        benefitValue,
    ]);

    const value: CollectionContextType = {
        collection: {
            products: filteredByQuery,
            sortKey: sortKey as ProductCollectionSortKey,
            allBenefits,
            benefitsSelected,
            allCollections,
            collectionsSelected,
            collectionImages,
            ratings,
        },
        isLoading: isLoading || isFetching,
        setSortKey,
        setBenefitsSelected,
        setCollectionsSelected,
    };

    return (
        <CollectionContext.Provider value={value}>
            {children}
        </CollectionContext.Provider>
    );
}

export function useCollection() {
    const collectionContext = useContext(CollectionContext);
    if (!collectionContext) {
        throw new Error(
            'useCollection must be used within a CollectionContextProvider'
        );
    }
    return collectionContext;
}
