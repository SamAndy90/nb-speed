import Container from '@/components/container';
import Image from 'next/image';
import React from 'react';
import Globe from '@/assets/sustainability/earth.webp';

const AchievementBadge = () => {
    return (
        <section className="bg-gradient-section pt-[3.125rem] lg:py-[7.5rem]">
            <Container>
                <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-[78px]">
                    <picture className="mx-auto flex w-full max-w-[36.25rem] justify-center lg:mx-0">
                        <Image
                            src={Globe}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="zw gold"
                            className="-mb-16 aspect-[1] w-[800.59px] object-contain md:w-[1100px] lg:mb-0"
                        />
                    </picture>

                    <div className="w-full text-center lg:text-left">
                        <div className="mb-4 text-paragraph-4 font-bold uppercase md:font-bold lg:mb-6 lg:text-paragraph-1">
                            We are proud
                        </div>

                        <h2 className="mb-4 lg:mb-8">
                            Achieving a{' '}
                            <span className="font-medium text-accent-green">
                                net-zeroplastic footprint
                            </span>
                        </h2>

                        <p className="mx-auto max-w-[481px] text-paragraph-4 lg:mx-0 lg:text-paragraph-2">
                            In 2022, we were the first brand in our industry to
                            attain certification for 'Net Zero Plastic to
                            Nature.’ For 2025, we continue to commit to this
                            work and renewed our Net Zero Footprint by measuring
                            our plastic footprint by recovering an equivalent
                            amount of Ocean Bound Plastic Waste with Clime Co
                            through the TONTOTON project.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AchievementBadge;
