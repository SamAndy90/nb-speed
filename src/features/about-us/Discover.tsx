import React from 'react';
import Image from 'next/image';
import { PrimaryButton } from '@/components/PrimaryButton';
import Container from '@/components/container';
import Link from 'next/link';
import { ShopUrls } from '@/route-urls';
import WellnesProductIMG from '@/assets/about-us/wellness-product.png';

export const Discover = () => {
    return (
        <section
            className={
                'overflow-hidden bg-gradient-section pt-[3.125rem] lg:pt-0'
            }>
            <Container>
                <div className="flex flex-col gap-y-8 lg:flex-row-reverse">
                    <div className="flex w-full items-center justify-center lg:mb-[8.375rem] lg:flex-1">
                        <div className="flex w-full max-w-[497px] flex-col items-center gap-4 text-center lg:gap-6">
                            <h2>
                                Discover our newest <br />
                                <span
                                    className={'font-medium text-accent-pink'}>
                                    wellness products
                                </span>
                            </h2>

                            <p className="text-paragraph-4 lg:px-2.5 lg:text-paragraph-2">
                                With a foundation deeply rooted in scientific
                                research, we transform cutting-edge nutritional.
                            </p>

                            <PrimaryButton
                                as="div"
                                align="left"
                                className="mt-4 h-[42px] w-[235px] md:h-auto lg:mt-0">
                                <Link href={ShopUrls.getAllProducts()}>
                                    Shop our Vitamins
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={'lG:mb-0 relative mb-4 lg:mt-4 lg:flex-1'}>
                        <Image
                            src={WellnesProductIMG}
                            alt={'Vitamin bottle'}
                            className="object-contain"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};
