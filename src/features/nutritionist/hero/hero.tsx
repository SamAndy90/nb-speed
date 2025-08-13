'use client';

import Container from '@/components/container';
import { PrimaryButton } from '@/components/PrimaryButton';
import React, { useState } from 'react';
import christianna from '@/assets/christianna-1.webp';
import Image from 'next/image';
import { CirclePause, CirclePlay } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const VideoPopUp = dynamic(
    () => import('@/features/nutritionist/hero/video-popup'),
    { ssr: false }
);

const HeroSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
            <section className="pb-[3.125rem] pt-[130px] lg:py-[7.5rem]">
                <Container>
                    <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                        <div className="flex w-full max-w-[579px] flex-col items-center justify-center gap-4 text-center lg:gap-3">
                            <div className="flex flex-col gap-4 lg:gap-6">
                                <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                                    SAY HELLO!
                                </div>

                                <h1>
                                    Meet our expert registered nutritionist,{' '}
                                    <br />
                                    <span className="font-medium text-accent-pink">
                                        Christianna
                                    </span>
                                </h1>
                            </div>
                            <div className="flex flex-col items-center gap-4 lg:max-w-[480px] lg:gap-6">
                                <p className="text-paragraph-3 lg:text-paragraph-2">
                                    Christianna joins our Nutriburst family with
                                    a wealth of expertise in women's and family
                                    health. As a registered nutritionist, she's
                                    dedicated to helping clients achieve their
                                    health goals through personalised nutrition
                                    and lifestyle goals.
                                </p>
                                <Link href={'#recommended-products'}>
                                    <PrimaryButton
                                        align="left"
                                        className="h-[42px] w-[250px] md:h-auto">
                                        What she recommends
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                        <picture className="relative flex h-[500px] w-full max-w-[512px] overflow-hidden rounded-[8.83px]">
                            <Image
                                src={christianna}
                                alt="christianna"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-full w-full object-cover object-top"
                            />
                            <span
                                onClick={() => setIsPlaying(true)}
                                className="absolute right-5 top-5 cursor-pointer *:transition-all *:duration-300 hover:*:scale-110"
                                aria-label={
                                    isPlaying ? 'Pause video' : 'Play video'
                                }>
                                {isPlaying ? (
                                    <CirclePause
                                        className={'text-white'}
                                        size={54}
                                        strokeWidth={1.2}
                                    />
                                ) : (
                                    <CirclePlay
                                        className={'text-white'}
                                        size={54}
                                        strokeWidth={1.2}
                                    />
                                )}
                            </span>
                        </picture>
                    </div>
                </Container>
            </section>
            <VideoPopUp
                isOpen={isPlaying}
                onClose={() => setIsPlaying(false)}
            />
        </>
    );
};

export default HeroSection;
