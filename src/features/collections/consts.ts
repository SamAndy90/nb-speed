import { ProductSortKeys } from '@/gql/storefront/graphql';

export const sortKeyMap = {
    popular: 'BEST_SELLING',
    price: 'PRICE',
    title: 'TITLE',
} as const satisfies Record<string, ProductSortKeys>;
