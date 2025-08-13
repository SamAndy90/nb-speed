'use client';

import Container from '@/components/container';
import React from 'react';
import { MOCK_WELLNESS_GOAL_PRODUCTS, WELLNESS_GOALS } from '../consts';
import { Switch } from '@/components/ui/switch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
const ProductItem = dynamic(
    () => import('@/features/sections/product-choices-section/product-item'),
    { ssr: false }
);

const WellnessGoalSection = () => {
    return (
        <section className="relative min-h-[550px] overflow-hidden py-[3.125rem] lg:py-[7.5rem]">
            <div className="bottom-0 top-0 flex w-full items-center lg:absolute">
                <Container>
                    <div className="flex flex-col gap-[56px] lg:flex-row">
                        <div className="flex flex-1 flex-col gap-8 lg:gap-10">
                            <div className="flex flex-col gap-6">
                                <h2>
                                    What’s your personal <br />
                                    <span className="font-medium text-accent-pink">
                                        wellness Goal?
                                    </span>
                                </h2>

                                <p className="text-paragraph-4 lg:text-paragraph-3">
                                    Check the goals below and get a personalized
                                    product recommendation for your individual
                                    goals.
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-4 rounded-[10px] p-5 shadow-soft lg:max-w-[437px] lg:p-8">
                                {WELLNESS_GOALS.map((goal, index) => (
                                    <div
                                        key={`goal-${index}`}
                                        className="flex items-center gap-3">
                                        <Switch id={`goal-${index}`} />
                                        <Label
                                            htmlFor={`goal-${index}`}
                                            className="cursor-pointer text-paragraph-4 font-semibold lg:text-paragraph-3 lg:font-semibold">
                                            {goal}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block lg:flex-1"></div>
                    </div>
                </Container>
            </div>
            <div className="ml-auto mt-[3.125rem] w-full max-w-[1160px] lg:mt-0 lg:translate-x-[30rem]">
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={0}
                    loop
                    breakpoints={{
                        768: {
                            spaceBetween: 32,
                        },
                    }}>
                    {MOCK_WELLNESS_GOAL_PRODUCTS.map((product, index) => (
                        <SwiperSlide
                            key={`wellness-goal-product-${product.id}`}
                            virtualIndex={index}
                            className="!w-[288px] md:px-0 lg:!w-[350px]">
                            <ProductItem product={product} contentClassName='max-w-[197px] md:max-w-full mx-auto' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default WellnessGoalSection;
