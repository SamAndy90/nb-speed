import Container from '@/components/container';
import { PrimaryButton } from '@/components/PrimaryButton';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
    return (
        <section className="pb-0 pt-[9.125rem] lg:pb-[2rem] lg:pt-[6.75rem]">
            <Container>
                <div className="mx-auto max-w-[790px]">
                    <div className="flex flex-col items-center justify-center gap-4 text-center lg:gap-5">
                        <div className="text-paragraph-4 font-bold uppercase md:text-paragraph-1">
                            about nutriburst
                        </div>

                        <div>
                            <h1 className="font-light leading-[1.1]">
                                <span className="font-medium text-accent-pink">
                                    From Our Journey <br />
                                    to Your Wellness:
                                </span>
                                <br />
                                The Nutriburst Story
                            </h1>

                            <p className="mx-auto mt-3 max-w-[790px] text-paragraph-3 md:text-paragraph-2">
                                Our journey began with a clear purpose: to
                                create smarter supplements powered by real
                                science and crafted with care. Rooted in
                                cutting-edge research, we transform innovation
                                into delicious, effective formulas designed to
                                elevate your everyday wellbeing.
                            </p>
                        </div>
                        <Link href={'#story'}>
                            <PrimaryButton
                                className="h-[42px] w-[230px] md:h-auto"
                                align="left">
                                Explore our Story
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HeroSection;
