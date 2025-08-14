import Container from '@/components/container';
import { PrimaryButton } from '@/components/PrimaryButton';
import React from 'react';
import leanne from '@/assets/sustainability/NutriGreen.webp';
import Image from 'next/image';
import Link from 'next/link';
import { ShopUrls } from '@/route-urls';

const EarthMindSection = () => {
    return (
        <section className="overflow-hidden bg-gradient-7 pt-[3.125rem] lg:mb-[7.5rem] lg:pt-0">
            <Container className="relative">
                <div className="flex min-h-[675px] flex-col-reverse items-center justify-center overflow-hidden lg:flex-row">
                    <div className="flex flex-1">
                        <picture className="-mt-10 flex lg:hidden">
                            <Image
                                src={leanne}
                                alt="leanne"
                                width={600}
                                height={620}
                                sizes="100vw"
                                className="aspect-auto scale-[1.3] object-contain"
                            />
                        </picture>
                    </div>

                    <div className="flex flex-1 justify-center">
                        <div className="flex w-full max-w-[497px] flex-1 flex-col items-center justify-center gap-6 text-center">
                            <h2>
                                Designed with the <br />
                                <span className="font-medium text-accent-green">
                                    earth in mind
                                </span>
                            </h2>

                            <p className="text-paragraph-4 lg:text-paragraph-2">
                                With a foundation deeply rooted in scientific
                                research, we transform cutting-edge nutritional.
                            </p>

                            <Link href={ShopUrls.getAllProducts()}>
                                <PrimaryButton
                                    align="left"
                                    className="h-[42px] w-[235px]">
                                    Shop our Vitamins
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>

                <picture className="absolute left-[-5rem] top-[8rem] hidden lg:block">
                    <Image
                        src={leanne}
                        alt="leanne"
                        width={600}
                        height={620}
                        sizes="100vw"
                        className="aspect-auto min-w-[729px] object-cover"
                    />
                </picture>
            </Container>
        </section>
    );
};

export default EarthMindSection;
