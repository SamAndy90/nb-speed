'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product, VariantDetails } from '@/features/product/types';
import { ImageFragment } from '@/gql/storefront/graphql';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { getFragmentData } from '@/gql/storefront';

type VariantMap = {
    [type: string]: {
        [size: string]: string[];
    };
};

const buildVariantMap = (variants: any[]): VariantMap => {
    const map: VariantMap = {};

    for (const variant of variants) {
        const selected = Object.fromEntries(
            variant.selectedOptions.map((o: any) => [
                o.name.toLowerCase(),
                o.value,
            ])
        );
        const { type, size, flavour } = selected;

        if (!type || !size || !flavour) continue;

        if (!map[type]) map[type] = {};
        if (!map[type][size]) map[type][size] = [];

        if (!map[type][size].includes(flavour)) {
            map[type][size].push(flavour);
        }
    }

    return map;
};

type ShopifyImageType = {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
};

type MediaImageReference = {
    __typename: 'MediaImage';
    image?: ShopifyImageType | null;
};

type ReferenceUnion =
    | MediaImageReference
    | { __typename: 'Video' }
    | { __typename: 'Collection' }
    | { __typename: 'Product' }
    | { __typename: 'GenericFile' }
    | { __typename: 'Metaobject' }
    | { __typename: 'Model3d' }
    | { __typename: 'Page' }
    | { __typename: 'ProductVariant' };

export function extractImageData(ref: ReferenceUnion | null | undefined) {
    if (ref?.__typename === 'MediaImage' && ref.image?.url) {
        return {
            url: ref.image.url,
            alt: ref.image.altText ?? '',
            width: ref.image.width ?? 800,
            height: ref.image.height ?? 600,
        };
    }

    return null;
}

export function filterImagesByTypeAndStrictSize(
    images: ImageFragment[],
    type: string,
    size: string
): ImageFragment[] {
    const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();

    const normalizedType = normalize(type);
    const normalizedSize = normalize(size);

    const seen = new Set<string>();

    return images.filter((img) => {
        const alt = img.altText ?? '';
        const normalizedAlt = normalize(alt);

        if (!normalizedAlt.includes(normalizedType)) return false;

        const mentionsPack = /(\d+\s*pack)/i.test(alt);
        const sizeMismatch =
            mentionsPack && !normalizedAlt.includes(normalizedSize);

        if (sizeMismatch) return false;

        if (seen.has(img.url)) return false;
        seen.add(img.url);

        return true;
    });
}

export type VariantProductContextType = {
    product: Product;
    variant: Product['variants'][number];
    variantDetails: VariantDetails;
    type: string;
    setType: (type: string) => void;
    size: string;
    setSize: (size: string) => void;
    flavour: string;
    setFlavour: (flavour: string) => void;
    types: string[];
    availableSizes: string[];
    availableFlavours: string[];
    images: ImageFragment[];
    hydrationImages: ImageFragment[];
};

const VariantProductContext = createContext<VariantProductContextType | null>(
    null
);

type VariantProductProviderProps = {
    product: Product;
    children: React.ReactNode;
};

export function VariantProductProvider({
    children,
    product,
}: VariantProductProviderProps) {
    const variantMap = useMemo(
        () => buildVariantMap(product?.variants || []),
        [product]
    );

    const types = useMemo(() => Object.keys(variantMap), [variantMap]);

    const initialType = types?.[0] ?? '';
    const initialSize = variantMap?.[initialType]
        ? (Object.keys(variantMap[initialType])?.[0] ?? '')
        : '';
    const initialFlavour = variantMap?.[initialType]?.[initialSize]?.[0] ?? '';

    const [type, setType] = useState(initialType);
    const [size, setSize] = useState(initialSize);
    const [flavour, setFlavour] = useState(initialFlavour);

    const availableSizes = useMemo(
        () => Object.keys(variantMap[type] || {}),
        [variantMap, type]
    );
    const availableFlavours = useMemo(
        () => variantMap[type]?.[size] || [],
        [variantMap, type, size]
    );

    useEffect(() => {
        if (
            Array.isArray(availableSizes) &&
            availableSizes.length > 0 &&
            !availableSizes.includes(size)
        ) {
            setSize(availableSizes[0]);
        }
    }, [type, availableSizes]);

    useEffect(() => {
        if (
            Array.isArray(availableFlavours) &&
            availableFlavours.length > 0 &&
            !availableFlavours.includes(flavour)
        ) {
            setFlavour(availableFlavours[0]);
        }
    }, [type, size, availableFlavours]);

    const productVariant = useMemo(() => {
        return (
            product.variants.find(
                (variant) =>
                    variant.title.includes(type) &&
                    variant.title.includes(size) &&
                    variant.title.includes(flavour)
            ) ||
            product.variants.find(
                (variant) =>
                    variant.title.includes(type) && variant.title.includes(size)
            ) ||
            product.variants.find((variant) => variant.title.includes(type)) ||
            product.variants[0]
        );
    }, [product, type, size, flavour]);

    const mainImage = extractImageData(
        size === '6 Pack'
            ? productVariant.variant_image_6?.reference
            : productVariant.variant_image?.reference
    );

    const images = useMemo(() => {
        return product.images.map((image) =>
            getFragmentData(imageFragment, image)
        );
    }, [product]);

    let hydrationImages = filterImagesByTypeAndStrictSize(
        product.images as ImageFragment[],
        type,
        size
    );

    hydrationImages = mainImage
        ? [mainImage, ...hydrationImages]
        : hydrationImages;

    const variantDetails: VariantDetails = JSON.parse(
        productVariant.details?.value || '{}'
    );

    const value: VariantProductContextType = {
        product: product,
        variant: productVariant,
        variantDetails,
        type,
        setType,
        size,
        setSize,
        flavour,
        setFlavour,
        types,
        availableSizes,
        availableFlavours,
        images,
        hydrationImages,
    };

    return (
        <VariantProductContext.Provider value={value}>
            {children}
        </VariantProductContext.Provider>
    );
}

export function useVariantProduct() {
    const variantContext = useContext(VariantProductContext);
    if (!variantContext) {
        throw new Error(
            'useVariantProduct must be used within a VariantProductProvider'
        );
    }
    return variantContext;
}
