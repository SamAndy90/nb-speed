'use client';
import { ReviewCount, StarRating, Stars } from '@/components/Ratings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/features/product/types';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { getFragmentData } from '@/gql/storefront';
import { cn, currencyFormatter } from '@/lib/utils';
import Image from 'next/image';

import Link from 'next/link';
import { RecommendationCardInfo } from './RecommendationCardInfo';
import {
    ADVANCED_TAG,
    ESSENTIALS_TAG,
    HYDRATION_TAG,
    KIDS_TAG,
    NEW_TAG,
} from '@/features/shopify/consts';
import { useAddProduct } from '@/features/cart/hooks/useAddProduct';
import { useMemo } from 'react';

const DEFAULT_SHORT_DESCRIPTION =
    'Tropical-flavored gummies for energy, deep relaxation, and stress resistance.';

export default function RecommendationCard({
    product,
    rating,
    reviewCount,
    collection,
    showMoreInfoButton = false,
}: {
    product: Product;
    rating: number;
    reviewCount: number;
    collection?: string;
    showMoreInfoButton?: boolean;
}) {
    const image = getFragmentData(imageFragment, product.featuredImage);
    const price = product.priceRange.maxVariantPrice.amount;
    const shortDescription =
        product.details?.shortDescription ?? DEFAULT_SHORT_DESCRIPTION;
    const formattedPrice = currencyFormatter.format(price);

    const hasNewTag = product.tags?.includes(NEW_TAG);

    const productCollection =
        collection ??
        product.tags.find(
            (tag) =>
                tag === ADVANCED_TAG ||
                tag === ESSENTIALS_TAG ||
                tag === KIDS_TAG ||
                tag === HYDRATION_TAG
        );

    const badgeColor = useMemo(() => {
        if (hasNewTag) return 'bg-beige-new';
        if (productCollection === ADVANCED_TAG) return 'bg-gradient-bronze';
        if (productCollection === ESSENTIALS_TAG) return 'bg-gradient-silver';
        if (productCollection === KIDS_TAG) return 'bg-beige-light';
        if (productCollection === HYDRATION_TAG) return 'bg-ocean-blue-300';
        return null;
    }, [productCollection, hasNewTag]);

    const badgeText = useMemo(() => {
        if (hasNewTag) return 'New';
        if (productCollection === ADVANCED_TAG) return 'Advanced';
        if (productCollection === ESSENTIALS_TAG) return 'Essentials';
        if (productCollection === KIDS_TAG) return 'Kids';
        if (productCollection === HYDRATION_TAG) return 'Hydration';
        return null;
    }, [productCollection, hasNewTag]);

    const { addCartItemAction } = useAddProduct(product);

    return (
        <Link
            href={`/products/${product.handle}`}
            className="block h-full cursor-pointer rounded-md drop-shadow-card duration-500 hover:scale-[1.02] hover:shadow-soft-1">
            <div className="relative flex h-full flex-col overflow-clip rounded-md bg-primary">
                <div className="relative w-full">
                    {image && (
                        <Image
                            src={image.url}
                            alt={image.altText ?? ''}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="aspect-[1/1] h-auto w-full"
                        />
                    )}
                    {showMoreInfoButton && (
                        <RecommendationCardInfo>
                            {shortDescription}
                        </RecommendationCardInfo>
                    )}
                    <Badge
                        className={cn(
                            'absolute left-0 top-3 z-10 rounded-xxs rounded-l-none border-none px-3 py-1.5 text-xs',
                            badgeColor,
                            { hidden: !productCollection }
                        )}>
                        {badgeText}
                    </Badge>
                </div>
                <div className="flex min-h-48 w-full flex-1 shrink-0 flex-col gap-2 bg-primary p-5">
                    <div className="flex justify-between">
                        <StarRating
                            score={rating}
                            reviewCount={reviewCount}
                            className="text-[13.38px]">
                            <Stars />
                            <ReviewCount />
                        </StarRating>
                        <div className="text-sm font-bold">
                            {formattedPrice}
                        </div>
                    </div>
                    <h3 className="font-sans text-base font-bold">
                        {product.title}
                    </h3>
                    <p className="flex-1 grow text-sm text-neutral-600">
                        {shortDescription}
                    </p>
                    <div className="mt-2 flex gap-3">
                        <form action={addCartItemAction}>
                            <Button variant="dark" size="sm">
                                Add to Cart
                            </Button>
                        </form>
                        <Button variant="outline" asChild size="sm">
                            <span>Learn more</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
