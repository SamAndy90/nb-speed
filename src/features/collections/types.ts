import { sortKeyMap } from '@/features/collections/consts';
import { z } from 'zod';

const [firstKey, ...restKeys] = Object.keys(sortKeyMap);
export const ProductCollectionSortTypeSchema = z.enum([firstKey, ...restKeys]);
export const ProductCollectionSortDirectionSchema = z.enum(['asc', 'desc']);

export type ProductCollectionSortType = keyof typeof sortKeyMap;
export type ProductCollectionSortDirection = 'asc' | 'desc';
export type ProductCollectionSortKey =
    `${keyof typeof sortKeyMap}-${ProductCollectionSortDirection}`;
export const ProductCollectionSortKeySchema =
    z.custom<`${ProductCollectionSortType}-${ProductCollectionSortDirection}`>(
        (val) => {
            if (typeof val !== 'string') return false;
            if (!val.includes('-')) return false;
            const [key, direction] = val.split('-');
            if (!sortKeyMap[key as ProductCollectionSortType]) return false;
            if (!['asc', 'desc'].includes(direction)) return false;
            return true;
        }
    );

