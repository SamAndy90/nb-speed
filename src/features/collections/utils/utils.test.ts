import { Product } from '@/features/product/types';

import { describe, expect, test } from 'vitest';
import {
    createProductMetafieldFilter,
    filterProductsByCollections,
    sortProducts,
    updateTags,
} from './utils';

const mockProducts = [
    { title: 'Product 3', priceRange: { maxVariantPrice: { amount: 3 } } },
    { title: 'Product 1', priceRange: { maxVariantPrice: { amount: 1 } } },
    { title: 'Product 2', priceRange: { maxVariantPrice: { amount: 2 } } },
] as Product[];

const orderedTitles = ['Product 1', 'Product 2', 'Product 3'];

describe('sortProducts', () => {
    test('should sort products by title ascending', () => {
        const sortedProducts = sortProducts(
            mockProducts as Product[],
            'title-asc'
        );
        expect(sortedProducts.map((p) => p.title)).toEqual(orderedTitles);
    });
    test('should sort products by title descending', () => {
        const sortedProducts = sortProducts(
            mockProducts as Product[],
            'title-desc'
        );
        expect(sortedProducts.map((p) => p.title)).toEqual(
            orderedTitles.toReversed()
        );
    });
    test('should sort products by price ascending', () => {
        const sortedProducts = sortProducts(
            mockProducts as Product[],
            'price-asc'
        );
        expect(sortedProducts.map((p) => p.title)).toEqual(orderedTitles);
    });
    test('should sort products by price descending', () => {
        const sortedProducts = sortProducts(
            mockProducts as Product[],
            'price-desc'
        );
        expect(sortedProducts.map((p) => p.title)).toEqual(
            orderedTitles.toReversed()
        );
    });
});

describe('updateTags', () => {
    test('should return all tags if newTags is empty', () => {
        const allTags = ['tag1', 'tag2'];
        const oldTags = ['tag1'];
        const newTags: string[] = [];
        const result = updateTags(allTags, oldTags, newTags);
        expect(result).toEqual(allTags);
    });

    test('should add all tags if all tag is selected', () => {
        const allTags = ['tag1', 'tag2'];
        const oldTags = ['tag1'];
        const newTags = 'all';
        const result = updateTags(allTags, oldTags, newTags);
        expect(result).toEqual(allTags);
    });

    test('should return newTags if no special conditions are met', () => {
        const allTags = ['tag1', 'tag2'];
        const oldTags = ['tag1'];
        const newTags = ['tag2'];
        const result = updateTags(allTags, oldTags, newTags);
        expect(result).toEqual(newTags);
    });

    test('should return newTags without all if all tags are selected', () => {
        const allTags = ['tag1', 'tag2'];
        const oldTags = ['tag1'];
        const newTags = ['all', 'tag1'];
        const result = updateTags(allTags, oldTags, newTags);
        expect(result).toEqual(allTags);
    });
});

describe('createProductMetafieldFilter', () => {
    test('should create a metafield filter with default key and namespace', () => {
        const value = 'testValue';
        const result = createProductMetafieldFilter(value);
        expect(result).toEqual({
            productMetafield: {
                namespace: 'product',
                key: 'benefits',
                value,
            },
        });
    });

    test('should create a metafield filter with custom key and namespace', () => {
        const value = 'testValue';
        const key = 'customKey';
        const namespace = 'customNamespace';
        const result = createProductMetafieldFilter(value, key, namespace);
        expect(result).toEqual({
            productMetafield: {
                namespace,
                key,
                value,
            },
        });
    });
});

describe('createProductMetafieldFilter', () => {
    test('should create a metafield filter with default key and namespace', () => {
        const value = 'testValue';
        const result = createProductMetafieldFilter(value);
        expect(result).toEqual({
            productMetafield: {
                namespace: 'product',
                key: 'benefits',
                value,
            },
        });
    });

    test('should create a metafield filter with custom key and namespace', () => {
        const value = 'testValue';
        const key = 'customKey';
        const namespace = 'customNamespace';
        const result = createProductMetafieldFilter(value, key, namespace);
        expect(result).toEqual({
            productMetafield: {
                namespace,
                key,
                value,
            },
        });
    });

    test('should create a metafield filter with custom key and default namespace', () => {
        const value = 'testValue';
        const key = 'customKey';
        const result = createProductMetafieldFilter(value, key);
        expect(result).toEqual({
            productMetafield: {
                namespace: 'product',
                key,
                value,
            },
        });
    });

    test('should create a metafield filter with default key and custom namespace', () => {
        const value = 'testValue';
        const namespace = 'customNamespace';
        const result = createProductMetafieldFilter(
            value,
            undefined,
            namespace
        );
        expect(result).toEqual({
            productMetafield: {
                namespace,
                key: 'benefits',
                value,
            },
        });
    });
});

const mockCollections = [{ title: 'Collection 1' }, { title: 'Collection 2' }];
describe('filterProductsByCollections', () => {
    const mockProducts = [
        { collections: { nodes: [mockCollections[0]] } },
        { collections: { nodes: [mockCollections[1]] } },
        { collections: { nodes: mockCollections } },
    ] as unknown as Product[];

    test('should return all products if collections array is empty', () => {
        const result = filterProductsByCollections(mockProducts, []);
        expect(result).toEqual(mockProducts);
    });

    test('should return all products if collections array contains "all"', () => {
        const result = filterProductsByCollections(mockProducts, ['all']);
        expect(result).toEqual(mockProducts);
    });

    test('should filter products by a single collection', () => {
        const result = filterProductsByCollections(mockProducts, [
            mockCollections[0].title,
        ]);
        expect(result).toEqual([mockProducts[0], mockProducts[2]]);
    });

    test('should filter products by multiple collections', () => {
        const result = filterProductsByCollections(mockProducts, [
            mockCollections[0].title,
            mockCollections[1].title,
        ]);
        expect(result).toEqual(mockProducts);
    });

    test('should return an empty array if no products match the collections', () => {
        const result = filterProductsByCollections(mockProducts, [
            'Nonexistent Collection',
        ]);
        expect(result).toEqual([]);
    });
});
