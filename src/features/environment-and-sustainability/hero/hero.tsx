'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import forestTrees from '@/assets/sustainability/Hero.webp';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PrimaryButton } from '@/components/PrimaryButton';
import Container from '@/components/container';
import Link from 'next/link';

const HeroSection = () => {
    const heroRef = useRef(null);
    const firstContentRef = useRef(null);
    const secondContentRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Hero section timeline
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: [0, 1], // Only two snap points now
                        delay: 0,
                        duration: 0.2,
                    },
                },
            });

            // Animate first content out and up
            heroTl.to(firstContentRef.current, {
                opacity: 0,
                y: -50,
                delay: 0.2,
                duration: 0.1,
                ease: 'none',
            });

            // Animate second content in from bottom
            heroTl.fromTo(
                secondContentRef.current,
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.1,
                    ease: 'none',
                },
                '>-0' // Start slightly before first animation ends
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative mt-[-83px] flex h-screen w-full items-center justify-center overflow-hidden">
            {/* Fixed Background Image Container */}
            <picture className="absolute inset-0 top-0 h-full w-full">
                <div className="absolute left-0 top-0 z-[1] h-full w-full bg-gradient-sustainability-hero" />
                <Image
                    src={forestTrees}
                    alt="forest trees"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="z-0 mt-10 h-full w-full object-cover"
                />
            </picture>

            {/* First Content */}
            <div ref={firstContentRef} className="relative z-10">
                <Container>
                    <div className="mx-auto mb-20 flex w-full max-w-[690px] flex-col items-center gap-6">
                        <div className="text-center">
                            <div className="mb-4 text-paragraph-4 font-bold md:text-paragraph-1 lg:mb-6">
                                SUSTAINABILITY
                            </div>
                            <h1 className="mb-4 lg:mb-3">
                                Wellness starts with <br />
                                <span className="font-medium text-accent-green">
                                    the world we live in
                                </span>
                            </h1>
                            <p className="text-paragraph-4 lg:text-paragraph-2">
                                Making an impact means doing things differently.
                                We’re investing in technology that reduces
                                energy and waste without compromising quality.
                            </p>
                        </div>
                        <Link href={'#full-circle-approach'}>
                            <PrimaryButton
                                align="left"
                                className="h-[42px] w-[200px] md:h-auto">
                                What we do
                            </PrimaryButton>
                        </Link>
                    </div>
                </Container>
            </div>

            {/* Second Content */}
            <div
                ref={secondContentRef}
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0">
                <Container>
                    <div className="mx-auto mb-40 w-full max-w-[685px] text-center text-paragraph-4 font-normal lg:text-paragraph-3 lg:font-normal">
                        Transparency isn’t optional. It’s the standard.
                        <br />
                        <br />
                        {/* <br/> */}
                        At Nutriburst, we believe you deserve to know not only
                        what’s in your vitamins but the footprint they leave
                        behind.
                        <br />
                        <br />
                        {/* <br/> */}
                        We still have work to do, but we’re proud of the steps
                        we’ve already taken. We’re offsetting CO2 emissions from
                        packaging, partnering with impact- driven organisations,
                        and designing for less waste through smarter tech and
                        cleaner supply chains. We are currently reducing the
                        size of our pots to avoid empty space and using
                        unnecessary amount of plastic. For our daily range, we
                        are moving the single moulded colour caps to a single
                        material white caps as they are the most easily
                        recyclable form.
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default HeroSection;
