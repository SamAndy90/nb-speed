'use client';

import { Product } from '@/features/product/types';
import Container from '@/components/container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductRatingBatch } from '@/lib/reviews/types';
import dynamic from 'next/dynamic';

const RecommendationCard = dynamic(() => import('./RecommendationCard'), {
    ssr: false,
});

export function YouMayAlsoLike({
    recommendations,
    ratings,
}: {
    recommendations: Product[];
    ratings: ProductRatingBatch[];
}) {
    const getRating = (sku: string | null | undefined) => {
        if (!sku) return 0;
        const rating = ratings.find((r) => r.sku === sku);
        return rating?.average_rating || 0;
    };

    const getReviewCount = (sku: string | null | undefined) => {
        if (!sku) return 0;
        const rating = ratings.find((r) => r.sku === sku);
        return rating?.num_ratings || 0;
    };

    return (
        <section className="w-full overflow-hidden py-[3.125rem] lg:py-[7.5rem]">
            <div className="w-full">
                <Container>
                    <h2>
                        You may
                        <span className="font-medium"> also like</span>
                    </h2>
                </Container>

                <Container className="mt-8 lg:mt-[60px]">
                    <div>
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={20}
                            className="!overflow-visible"
                            wrapperClass="!flex">
                            {recommendations.map((p, i) => (
                                <SwiperSlide
                                    key={`qualification-${p.id}-${i}`}
                                    className="!w-[302px] min-[350px]:!w-[302px]">
                                    <RecommendationCard
                                        key={p.id + i}
                                        product={p}
                                        reviewCount={getReviewCount(
                                            p.selectedOrFirstAvailableVariant
                                                ?.sku
                                        )}
                                        rating={Number(
                                            getRating(
                                                p
                                                    .selectedOrFirstAvailableVariant
                                                    ?.sku
                                            )
                                        )}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Container>
            </div>
        </section>
    );
}
