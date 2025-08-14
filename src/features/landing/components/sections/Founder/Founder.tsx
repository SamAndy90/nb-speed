import Container from '@/components/container';
import Image from 'next/image';
import React from 'react';
import founderImage from '@/assets/founder.webp';
import founderMobileImage from '@/assets/founder-mobile.webp';
import { Button } from '@/components/ui/button';
import { m } from 'framer-motion';
import { MotionTitle } from '@/components/motion-components/MotionTitle';
import { MotionParagraph } from '@/components/motion-components/MotionParagraph';
import { MotionDiv } from '@/components/motion-components/MotionDiv';

const Founder = () => {
    return (
        <section className="relative w-full">
            <MotionDiv
                className="absolute left-0 top-0 z-[-1] hidden h-full overflow-hidden lg:block"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                viewport={{ once: true }}>
                <Image
                    src={founderImage}
                    sizes={'100vw'}
                    alt="founder"
                    className="h-full w-auto object-cover"
                />
            </MotionDiv>
            <div className="relative z-[1] flex w-full items-center pb-0 pt-[3.125rem] md:py-[3.125rem] lg:aspect-[1439/651] lg:bg-gradient-10 lg:py-[8.75rem]">
                <Container>
                    <div className="lg:gap4 mx-auto flex w-full max-w-[335px] flex-col gap-10 text-center md:max-w-[563px] lg:mr-[40px] lg:gap-4">
                        <div className="flex flex-col items-center gap-4">
                            {/* <h2>Meet our Founder</h2> */}
                            <MotionTitle
                                component={'h2'}
                                text={'Meet our Founder'}
                            />
                            <MotionParagraph
                                text={
                                    'As a busy mum always on the go, Simran Kanwar struggled to find vitamins that were both effective and free from unnecessary sugars and fillers. Determined to create a better alternative, she founded Nutriburst—delicious, science-backed, and completely sugar-free gummies made with clean, plant-based ingredients. Today, Nutriburst is trusted by thousands, making daily wellness simple, effective, and enjoyable.'
                                }
                            />
                            {/* <p className="text-paragraph-4 lg:text-paragraph-2">
                                As a busy mum always on the go, Simran Kanwar
                                struggled to find vitamins that were both
                                effective and free from unnecessary sugars and
                                fillers. Determined to create a better
                                alternative, she founded Nutriburst—delicious,
                                science-backed, and completely sugar-free
                                gummies made with clean, plant-based
                                ingredients. Today, Nutriburst is trusted by
                                thousands, making daily wellness simple,
                                effective, and enjoyable.
                            </p> */}
                            {/* <Button className="mt-1 lg:mt-2" variant={'dark'}>
                                Shop Mary’s choices
                            </Button> */}
                        </div>
                        <Image
                            src={founderMobileImage}
                            alt="founder"
                            sizes={'50vw'}
                            className="left-0 top-0 mx-auto h-auto min-h-[317px] w-full rounded-[10px] object-cover lg:hidden"
                        />
                    </div>
                </Container>
            </div>
        </section>
    );
};

export { Founder };
