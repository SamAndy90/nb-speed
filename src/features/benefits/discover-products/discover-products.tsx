'use client';

import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../consts';
import ProductItem from './product-item';

const DiscoverProducts = () => {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [active, setActive] = useState<string>(MOCK_CATEGORIES[0].id);

    const products = useMemo(() => {
        return MOCK_PRODUCTS.filter((q) => q.category === active);
    }, [active]);

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

    return (
        <section className="bg-gradient-section pt-[3.125rem] lg:pt-[7.5rem] overflow-hidden">
            <Container>
                <div className="flex flex-col gap-4 lg:gap-6">
                    <div className="text-[14px] font-bold leading-[1.4] lg:text-[20px]">
                        FULL TRANSPARENCY
                    </div>
                    <h2>
                        <span className="font-medium text-accent-pink">
                            Discover the Science
                        </span>
                        <br />
                        behind our products
                    </h2>
                </div>

                <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row">
                    <div className="scrollbar-hide w-full overflow-x-auto">
                        <Tabs
                            defaultValue={active}
                            value={active}
                            onValueChange={setActive}
                            className="flex flex-col justify-center">
                            <TabsList className="h-fit justify-start gap-4">
                                {MOCK_CATEGORIES.map((tab) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="gap-1 whitespace-nowrap text-paragraph-5 font-bold md:text-paragraph-3 md:font-semibold">
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="hidden flex-1 items-end justify-end gap-3 md:flex">
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
            </Container>

            <div className="mt-[3.75rem] pb-[3.125rem] lg:pb-[7.5rem]">
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
                            slidesPerView="auto"
                            spaceBetween={24}
                            className="!overflow-visible"
                            wrapperClass="!flex">
                            {products.map((product) => (
                                <SwiperSlide
                                    key={product.id}
                                    className="!w-[250px] min-[350px]:!w-[300px] lg:!w-[353px]">
                                    <ProductItem
                                        product={product}
                                        className="h-full w-full"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default DiscoverProducts;
