'use client';

import { Product } from '@/features/product/types';
type BackedByScienceProps = {
    collections: { title: string; handle: string; products: Product[] }[];
    reviews: { handle: string; ratings: ProductRatingBatch[] }[];
};
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useMemo, useState } from 'react';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Swiper as SwiperType } from 'swiper/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import { ProductRatingBatch } from '@/lib/reviews/types';
import { motion } from 'framer-motion';
import { MotionSpan } from '@/components/motion-components/MotionSpan';
import Link from 'next/link';
import { MainUrls } from '@/route-urls';

const RecommendationCardItem = dynamic(
    () =>
        import(
            '@/features/product/components/sections/YouMayAlsoLike/RecommendationCardItem'
        ),
    { ssr: false }
);
export function BackedByScience({
    collections,
    reviews,
}: BackedByScienceProps) {
    const nonEmptyCollections = useMemo(() => {
        const priorityOrder = ['beauty', 'energy', 'immunity', 'balance'];
        return collections
            .filter((c) => c.products.length > 0)
            .sort((a, b) => {
                const indexA = priorityOrder.indexOf(a.handle);
                const indexB = priorityOrder.indexOf(b.handle);

                const aRank = indexA === -1 ? Infinity : indexA;
                const bRank = indexB === -1 ? Infinity : indexB;

                return aRank - bRank;
            });
    }, [collections]);
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [active, setActive] = useState<string>(nonEmptyCollections[0].handle);
    const products = useMemo(() => {
        return (
            nonEmptyCollections.find((q) => q.handle === active)?.products || []
        );
    }, [active, nonEmptyCollections]);

    const handleNext = () => {
        swiperRef?.slideNext();
    };

    const handlePrev = () => {
        swiperRef?.slidePrev();
    };

    const handleSlideChange = () => {
        if (!swiperRef) return;
        setIsBeginning(swiperRef.isBeginning);
        setIsEnd(swiperRef.isEnd);
    };

    const handleTabChange = (value: string) => {
        setActive(value);
        handleSlideChange();
    };

    const getReviewCount = (sku: string | null | undefined) => {
        if (!sku) return 0;
        const rating = reviews
            .find((r) => r.handle === active)
            ?.ratings.find((r) => r.sku === sku);
        return rating?.num_ratings || 0;
    };

    const getRating = (sku: string | null | undefined) => {
        if (!sku) return 0;
        const rating = reviews
            .find((r) => r.handle === active)
            ?.ratings.find((r) => r.sku === sku);
        return rating?.average_rating || 0;
    };

    return (
        <section className="flex w-full flex-col gap-10 overflow-hidden pb-[50px] pt-[100px] lg:gap-[60px] lg:pb-[120px] lg:pt-[50px]">
            <Container>
                <h2 className="flex flex-col">
                    <motion.b
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            ease: 'easeOut',
                            duration: 0.8,
                            delay: 0.4,
                        }}
                        viewport={{ once: true }}
                        className="self-start bg-cooper-text-gradient bg-clip-text text-transparent">
                        Backed by Science.
                    </motion.b>
                    <MotionSpan text={'designed for flavour'} />
                </h2>
                <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row lg:mt-[60px]">
                    <div className="scrollbar-hide w-full overflow-x-auto">
                        <Tabs
                            defaultValue={active}
                            value={active}
                            onValueChange={handleTabChange}
                            className="flex flex-col justify-center">
                            <TabsList className="h-fit justify-start gap-4">
                                {nonEmptyCollections.map((collection) => (
                                    <TabsTrigger
                                        key={collection.handle}
                                        value={collection.handle}
                                        className="gap-1 whitespace-nowrap text-paragraph-5 font-bold md:text-paragraph-3 md:font-semibold">
                                        {collection.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                    <div
                        className={
                            'hidden flex-1 items-center gap-x-4 md:flex'
                        }>
                        <Link
                            href={MainUrls.getHelpMeChoose()}
                            className={
                                'text-nowrap text-paragraph-3 font-semibold text-neutral-400 underline transition-colors hover:text-primary-black'
                            }>
                            Need help choosing?
                        </Link>
                        <div className="gap-3 md:flex">
                            <Button
                                variant="secondary"
                                disabled={isBeginning}
                                className="h-[34px] w-[34px] bg-gradient-2 p-0 disabled:opacity-50"
                                onClick={handlePrev}
                                aria-label="Previous slide">
                                <ChevronLeft size={16} />
                            </Button>
                            <Button
                                variant="secondary"
                                disabled={isEnd}
                                className="h-[34px] w-[34px] bg-gradient-2 p-0 disabled:opacity-50"
                                onClick={handleNext}
                                aria-label="Next slide">
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="px-0">
                <div className="pl-5">
                    <Swiper
                        onSwiper={setSwiperRef}
                        onSlideChange={handleSlideChange}
                        onReachBeginning={() => setIsBeginning(true)}
                        onReachEnd={() => setIsEnd(true)}
                        onFromEdge={() => {
                            setIsBeginning(false);
                            setIsEnd(false);
                        }}
                        freeMode={true}
                        touchReleaseOnEdges={true}
                        slidesPerView="auto"
                        spaceBetween={24}
                        className="!overflow-visible"
                        wrapperClass="!flex">
                        {products.map((product, i) => (
                            <SwiperSlide
                                key={product.id}
                                className="!w-[302px] !min-w-[302px]">
                                <RecommendationCardItem
                                    key={product.id + i}
                                    Idx={i}
                                    product={product}
                                    reviewCount={getReviewCount(
                                        product.selectedOrFirstAvailableVariant
                                            ?.sku
                                    )}
                                    rating={Number(
                                        getRating(
                                            product
                                                .selectedOrFirstAvailableVariant
                                                ?.sku
                                        )
                                    )}
                                    primaryButtonText="Shop now"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={'mt-6 px-5 md:hidden'}>
                    <Link
                        href={MainUrls.getHelpMeChoose()}
                        className={
                            'text-nowrap text-paragraph-4 font-semibold text-neutral-400 underline transition-colors hover:text-primary-black'
                        }>
                        Need help choosing?
                    </Link>
                </div>
            </Container>
        </section>
    );
}
