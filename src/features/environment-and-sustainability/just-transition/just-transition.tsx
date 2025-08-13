'use client';

import Container from '@/components/container';
import React, { useState, useEffect } from 'react';
import IconRight from '@/assets/icons/icon-right.svg';
import SustainabilityCircle from './sustainability-circle';
import { HOLISTCI_APPROACH } from '../consts';
import { motion, AnimatePresence } from 'framer-motion';

const JustTransitionSection = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const activeItem = HOLISTCI_APPROACH[activeIndex];

    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === HOLISTCI_APPROACH.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(timer);
    }, [isHovered]);

    const fadeUpVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    return (
        <section
            id={'full-circle-approach'}
            className="pt-[3.125rem] lg:pt-[7.5rem]">
            <Container>
                <div>
                    <h2 className="mx-auto mb-10 w-full max-w-[790px] text-center lg:mb-[5.625rem]">
                        Our Full-Circle Approach <br />
                        <span className="font-medium text-accent-green">
                            to Sustainability
                        </span>
                    </h2>

                    <div className="flex flex-col-reverse items-center gap-10 lg:flex-row">
                        <div
                            onMouseOver={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onTouchStart={() => setIsHovered(true)}
                            onTouchEnd={() => setIsHovered(false)}
                            onTouchCancel={() => setIsHovered(false)}
                            className="w-full lg:max-w-[525px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`title-${activeIndex}`}
                                    variants={fadeUpVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit">
                                    <h4 className="mb-3 lg:mb-8">
                                        {activeItem.title}
                                    </h4>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex flex-col gap-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`approach-${activeIndex}`}
                                        variants={fadeUpVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 py-3 text-paragraph-2 font-bold lg:text-paragraph-1">
                                            Our Approach
                                            <IconRight className="w-[15px]" />
                                        </div>
                                        <p className="text-paragraph-4 lg:text-paragraph-3">
                                            {activeItem.approach.text}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`progress-${activeIndex}`}
                                        variants={fadeUpVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 py-3 text-paragraph-2 font-bold lg:text-paragraph-1">
                                            Our Progress
                                            <IconRight className="w-[15px]" />
                                        </div>
                                        <p className="text-paragraph-4 lg:text-paragraph-3">
                                            {activeItem.progress.text}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="flex w-full flex-1 justify-center p-6 lg:justify-end">
                            <SustainabilityCircle
                                activeIndex={activeIndex}
                                onChange={setActiveIndex}
                                setIsHovered={setIsHovered}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default JustTransitionSection;
