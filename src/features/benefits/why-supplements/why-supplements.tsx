import Container from '@/components/container';
import React from 'react';
import groupOverhead from '@/assets/group-overhead.webp';
import Image from 'next/image';

const WhySupplementsSection = () => {
    return (
        <section className="relative overflow-hidden">
            <picture className="flex justify-center">
                <Image
                    src={groupOverhead}
                    alt="group overhead"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="top-0 lg:min-[1962px] absolute h-auto w-full min-w-[1440px]"
                />
            </picture>
            <div className="relative z-[1] bg-[#F9F7F3D4]">
                <Container className="py-[3.125rem] lg:py-[7.5rem]">
                    <div className="mx-auto flex max-w-[602px] flex-col items-center gap-4 text-center lg:gap-6 lg:py-8">
                        <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                            WHY SUPPLEMENTS?
                        </div>
                        <h2>
                            Crafted for Health. <br />{' '}
                            <span className="font-medium text-accent-pink">
                                Designed for Taste.
                            </span>
                        </h2>

                        <p className="max-w-[402px] text-paragraph-4 md:text-paragraph-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.{' '}
                        </p>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default WhySupplementsSection;
