'use client';

import Container from '@/components/container';
import React from 'react';
import Image from 'next/image';
import InputWithButton from '@/components/input-width-button';
import LeftImage from '@/features/landing/assets/news-letter-section/left-1.webp';
import RightImage from '@/features/landing/assets/news-letter-section/right-1.webp';
import Avatar1 from '@/features/landing/assets/news-letter-section/avatar-1.webp';
import Avatar2 from '@/features/landing/assets/news-letter-section/avatar-2.webp';
import Avatar3 from '@/features/landing/assets/news-letter-section/avatar-3.webp';
import Avatar4 from '@/features/landing/assets/news-letter-section/avatar-4.webp';
import Avatar5 from '@/features/landing/assets/news-letter-section/avatar-5.webp';
import NewsletterInputWithButton from '@/components/newsletter-input-width-button';
import { MotionDiv } from '@/components/motion-components/MotionDiv';
import { MotionParagraph } from '@/components/motion-components/MotionParagraph';
import { m } from 'framer-motion';

export const LeftSection = () => {
    return (
        <div className="flex aspect-[1.27] w-full max-w-[562px] gap-4 md:gap-8">
            <div className="relative flex-1">
                <MotionDiv
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.5,
                        type: 'spring',
                        bounce: 0.4,
                        delay: 0.5,
                    }}
                    viewport={{ once: true }}>
                    <Image
                        src={LeftImage}
                        className="aspect-[0.8] w-full rounded-[8px] object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        alt="left-image"
                    />
                </MotionDiv>
                <m.span
                    initial={{ opacity: 0, x: '100%', y: -70 }}
                    whileInView={{ opacity: 1, x: '100%', y: 0 }}
                    transition={{
                        duration: 0.8,
                        type: 'spring',
                        bounce: 0.6,
                        delay: 2,
                    }}
                    viewport={{ once: true }}
                    className="absolute left-4 top-[1.5rem] translate-x-full whitespace-nowrap rounded-[8px] bg-white p-3 text-[14px] md:text-[20px]"
                    style={{
                        boxShadow: '0px 6.69px 17.24px 0px #B1B1B140',
                    }}>
                    Receive 10% off
                </m.span>
                <m.div
                    initial={'hidden'}
                    whileInView={'visible'}
                    transition={{
                        delayChildren: 0.9,
                        duration: 2,
                        staggerChildren: 0.1,
                    }}
                    viewport={{ once: true }}
                    className="absolute bottom-12 left-[65px] flex -space-x-4 bg-transparent md:-space-x-6">
                    <m.span
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            bounce: 0.4,
                        }}
                        className="size-[40px] rounded-full bg-gradient-2 p-0.5 md:size-[67px]">
                        <Image
                            src={Avatar1}
                            alt="avatar-1"
                            sizes="80px"
                            className="inset-1 h-full w-full rounded-full object-cover"
                        />
                    </m.span>
                    <m.span
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            bounce: 0.4,
                        }}
                        className="size-[40px] rounded-full bg-gradient-2 p-0.5 md:size-[67px]">
                        <Image
                            src={Avatar2}
                            alt="avatar-2"
                            sizes="80px"
                            className="inset-1 h-full w-full rounded-full object-cover"
                        />
                    </m.span>
                    <m.span
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            bounce: 0.4,
                        }}
                        className="size-[40px] rounded-full bg-gradient-2 p-0.5 md:size-[67px]">
                        <Image
                            src={Avatar3}
                            alt="avatar-3"
                            sizes="80px"
                            className="inset-1 h-full w-full rounded-full object-cover"
                        />
                    </m.span>
                    <m.span
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            bounce: 0.4,
                        }}
                        className="size-[40px] rounded-full bg-gradient-2 p-0.5 md:size-[67px]">
                        <Image
                            src={Avatar4}
                            alt="avatar-4"
                            sizes="80px"
                            className="inset-1 h-full w-full rounded-full object-cover"
                        />
                    </m.span>
                    <m.span
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            bounce: 0.4,
                        }}
                        className="size-[40px] rounded-full bg-gradient-2 p-0.5 md:size-[67px]">
                        <Image
                            src={Avatar5}
                            alt="avatar-5"
                            sizes="80px"
                            className="inset-1 h-full w-full rounded-full object-cover"
                        />
                    </m.span>
                </m.div>
            </div>
            <div className="flex flex-1 items-end overflow-hidden">
                <MotionDiv
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        type: 'spring',
                        bounce: 0.4,
                        delay: 0.7,
                    }}
                    viewport={{ once: true }}
                    className={'w-full'}>
                    <Image
                        src={RightImage}
                        className="aspect-[0.8] w-full rounded-[8px] object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        alt="left-image"
                    />
                </MotionDiv>
            </div>
        </div>
    );
};

const JoinTheCommunity = () => {
    return (
        <section className="w-full pb-[3.125rem] pt-[90px] md:pt-[6.25rem] lg:py-[7.5rem]">
            <Container>
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-[97px]">
                    <div className="w-full max-w-[562px]">
                        <LeftSection />
                    </div>

                    <div className="flex w-full flex-col items-center gap-[1.5625rem]">
                        <div className="text-center">
                            <MotionDiv
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.7,
                                    ease: 'easeOut',
                                    delay: 0.6,
                                }}
                                viewport={{ once: true }}>
                                <h2>
                                    Join the community <br />
                                    <span className="font-medium">
                                        & receive 10% off!
                                    </span>
                                </h2>
                            </MotionDiv>
                            <MotionParagraph
                                text={
                                    'Sign up for emails and save 10% OFF on your first gummy vitamins'
                                }
                                className="mt-4 max-w-[450px] text-paragraph-4 lg:text-paragraph-2"
                            />
                        </div>

                        <NewsletterInputWithButton placeholder="Your best email" />
                        {/*<InputWithButton placeholder="Your best email" />*/}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default JoinTheCommunity;
