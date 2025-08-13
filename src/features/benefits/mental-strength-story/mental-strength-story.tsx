'use client';

import Container from '@/components/container';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import MaryBadge from './hero-badge';
import { MENTAL_FOCUS_DATA } from '../consts';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const MentalStrengthStory = () => {
    const containerRef = useRef<HTMLElement>(null);
    const rowsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const qualificationsSection = rowsRef.current;
        if (!qualificationsSection || !container) return;
        const finalPosition =
            (MENTAL_FOCUS_DATA.length - 1) * window.innerWidth;

        let ctx = gsap.context(() => {
            const tl = gsap.to(rowsRef.current, {
                x: -finalPosition,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: `+=${finalPosition}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            return () => tl.kill();
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="flex min-h-[660px] overflow-hidden bg-gradient-13 pt-[3.125rem] lg:py-[7.5rem]">
            <div ref={rowsRef} className="flex">
                {MENTAL_FOCUS_DATA.map((data, index) => (
                    <div
                        className="min-w-[100vw]"
                        key={`mental-focus-${index}`}>
                        <Container className="flex flex-col items-center gap-8 lg:flex-row lg:gap-[78px]">
                            <picture className="relative flex w-full max-w-[580px] overflow-hidden rounded-[10px]">
                                <Image
                                    src={data.image}
                                    sizes="100vw"
                                    width={0}
                                    height={0}
                                    alt="mary"
                                    className="object-fit rounded-inherit aspect-[1.2] w-full object-cover"
                                />

                                <MaryBadge
                                    image={data.badgeImage}
                                    fullName={data.fullName}
                                    position={data.position}
                                    className="absolute bottom-5 right-5"
                                />
                            </picture>

                            <div className="flex w-full max-w-[453px] flex-col gap-3 text-center lg:gap-6">
                                <h2>{data.title}</h2>
                                <p className="text-paragraph-4 md:text-paragraph-3">
                                    {data.description}
                                </p>
                            </div>
                        </Container>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MentalStrengthStory;
