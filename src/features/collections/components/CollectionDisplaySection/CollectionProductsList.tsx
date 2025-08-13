'use client';
import {
    ProductAddToCartButton,
    ProductCard,
    ProductCardContent,
    ProductCardDescription,
    ProductCardFooter,
    ProductCardImage,
    ProductCardProps,
    ProductCardTitle,
} from '@/features/product/components/sections/ProductCard/ProductCard';
import { useCollection } from '../../providers/collection';
import { StarRating, Stars, ReviewCount } from '@/components/Ratings';
import { currencyFormatter } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';
import { useEffect, useMemo } from 'react';

function CollectionProductCard({
    collection,
    rating,
    reviewCount,
    product,
    ...props
}: ProductCardProps) {
    const price = product.priceRange.maxVariantPrice.amount;
    const router = useRouter();
    const formattedPrice = currencyFormatter.format(price);

    const handleCardClick = () => {
        router.push(`/products/${product.handle}`);
    };

    return (
        <ProductCard
            rating={rating}
            reviewCount={reviewCount}
            collection={collection}
            product={product}
            {...props}
            className="aspect-[161/285] h-auto w-full cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-soft-1"
            onClick={handleCardClick}>
            <ProductCardImage collection={collection} />
            <ProductCardContent className="min-h-0 p-3 md:p-5 md:pb-8">
                <div className="flex justify-between">
                    <StarRating
                        score={Number(rating)}
                        reviewCount={reviewCount}
                        className="flex-col items-start text-[0.45rem] sm:flex-row sm:items-center md:flex-col md:items-start md:text-xs xl:flex-row xl:items-center">
                        <Stars className="text-[10px] md:text-[14px]" />
                        <ReviewCount className="max-md:text-[0.625rem]" />
                    </StarRating>
                    <div className="text-sm font-bold">{formattedPrice}</div>
                </div>
                <ProductCardTitle className="text-xs md:text-base" />
                <ProductCardDescription className="h-fit grow overflow-hidden text-ellipsis text-xs max-md:max-h-8 md:text-sm" />
                <ProductCardFooter className="flex w-full flex-col lg:flex-row">
                    <ProductAddToCartButton className="w-full lg:w-fit" />
                </ProductCardFooter>
            </ProductCardContent>
        </ProductCard>
    );
}
export function CollectionProductsList() {
    const {
        collection: { products, ratings },
        isLoading,
    } = useCollection();

    /**
     * TODO:
     * - If there are less than 3 cards, should the remaining space be empty or should the 1/2 cards expand
     */
    if (isLoading)
        return (
            <div
                className={
                    'flex w-full items-center justify-center self-start py-12'
                }>
                <Spinner />
            </div>
        );

    const getReviewCount = (sku: string | null | undefined) => {
        if (!sku) return 0;
        const rating = ratings.find((r) => r.sku === sku);
        return rating?.num_ratings || 0;
    };

    const getRating = (sku: string | null | undefined) => {
        if (!sku) return 0;
        const rating = ratings.find((r) => r.sku === sku);
        return rating?.average_rating || 0;
    };

    if (!isLoading && !products.length)
        return (
            <div
                className={
                    'flex w-full items-center justify-center self-start py-12 text-center'
                }>
                Unfortunately, we did not find any products according to your
                request.
            </div>
        );

    return (
        <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
            {products?.map((p) => {
                if (p.handle === 'hydration') {
                    return (
                        <CollectionProductCard
                            key={p.id}
                            product={p}
                            reviewCount={12}
                            rating={5}
                        />
                    );
                }
                return (
                    <CollectionProductCard
                        key={p.id}
                        product={p}
                        reviewCount={getReviewCount(
                            p.selectedOrFirstAvailableVariant?.sku
                        )}
                        rating={getRating(
                            p.selectedOrFirstAvailableVariant?.sku
                        )}
                    />
                );
            })}
        </ul>
    );
}
