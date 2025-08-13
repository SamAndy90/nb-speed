'use client';

import Container from '@/components/container';
import React, { useEffect, useRef } from 'react';
import hands from '@/assets/nutriburst_hands_2.webp';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const HeroSection = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const animation = gsap.to(imageRef.current, {
            scale: 1.15,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: imageRef.current,
                start: 'top center', // when the top of the image hits the center of the viewport
                end: '+=500', // 500px after the start
                scrub: 1, // smooth scrubbing
                // markers: true, // Enable for debugging
            },
        });

        // Cleanup
        return () => {
            animation.kill();
        };
    }, []);

    return (
        <section className="flex flex-col gap-[72px] overflow-hidden bg-gradient-12 pt-[8.125rem] lg:gap-[60px] lg:pt-[11.25rem]">
            <Container className="flex flex-col items-center gap-4 text-center lg:gap-6">
                <div className="text-paragraph-4 font-bold md:text-paragraph-1">
                    BENEFITS
                </div>
                <h1>
                    Pure Ingredients. <br />
                    <span className="font-medium text-accent-pink">
                        Pure Power.
                    </span>
                </h1>
            </Container>

            <div className="flex justify-center">
                <Image
                    ref={imageRef}
                    src={hands}
                    alt="Nutriburst hands"
                    priority
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="ml-8 h-auto w-full min-w-[945px] rotate-[-1.55deg] lg:ml-0 lg:rotate-[2.77deg] lg:scale-110"
                />
            </div>
        </section>
    );
};

export default HeroSection;
