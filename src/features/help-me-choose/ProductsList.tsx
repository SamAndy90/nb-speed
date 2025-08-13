'use client';

import { Product } from '@/features/product/types';
import { ProductRatingBatch } from '@/lib/reviews/types';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

type CollectionProductsListProps = {
    data: Product[];
    ratings: ProductRatingBatch[];
};
export function ProductsList({ data, ratings }: CollectionProductsListProps) {
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'circInOut', delay: 0.3 }}>
            <div className={'mb-[46px]'}>
                <h2 className="mb-2.5 text-mobile-h4 md:mb-2 md:text-desktop-h4">
                    These are your perfect matches:
                </h2>
                <p className={'text-paragraph-3 md:text-paragraph-3'}>
                    Tailored to your unique health goals:
                </p>
            </div>
            <ul className="custom-scrollbar -mx-10 -my-5 flex flex-nowrap gap-5 overflow-x-scroll px-10 py-5 md:gap-8">
                {data?.map((p, Idx) => {
                    return (
                        <ProductCard
                            key={p.id}
                            product={p}
                            Idx={Idx}
                            reviewCount={getReviewCount(
                                p.selectedOrFirstAvailableVariant?.sku
                            )}
                            rating={Number(
                                getRating(
                                    p.selectedOrFirstAvailableVariant?.sku
                                )
                            )}
                            primaryButtonText="Shop now"
                        />
                    );
                })}
            </ul>
        </motion.div>
    );
}
