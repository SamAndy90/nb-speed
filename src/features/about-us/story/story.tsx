'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import officeWorkersTeam from '@/assets/office-workers-team.webp';
import Container from '@/components/container';

const StorySection = () => {
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
                    end: '+=130%',
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: [0, 1], // Only two snap points now
                        delay: 0,
                        duration: 0.5,
                    },
                },
            });

            // Animate first content out and up
            heroTl.to(firstContentRef.current, {
                opacity: 0,
                y: -50,
                delay: 0.2,
                duration: 0.3,
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
                    duration: 0.3,
                    ease: 'none',
                },
                '>-0' // Start slightly before first animation ends
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            id={'story'}
            ref={heroRef}
            className="relative flex h-screen w-full items-center overflow-hidden">
            {/* Fixed Background Image Container */}
            <picture className="absolute inset-0 h-full w-full">
                <div className="absolute left-0 top-0 z-[1] h-full w-full bg-gradient-5" />
                <Image
                    src={officeWorkersTeam}
                    alt="office workers team"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="z-0 h-full w-full object-cover"
                />
            </picture>

            {/* First Content */}
            <div
                ref={firstContentRef}
                className="relative z-10 w-full text-primary-white">
                <Container className="w-full">
                    <div>
                        <h2>
                            The Story behind <br />
                            <span className="font-medium">Nutriburst</span>
                        </h2>
                        <p className="mt-6 w-full max-w-[480px] text-paragraph-2">
                            Nutriburst was founded on a quiet, powerful
                            realisation: most people don’t struggle with knowing
                            they need to take care of their health; they
                            struggle with routines that don’t feel realistic or
                            rewarding. For Simran Kanwar, a busy working mum,
                            the problem was personal. Between work, parenting,
                            and the pressure to ‘do it all,’ supplements felt
                            like one more chore, especially when they were
                            packed with sugar, confusingly labelled, or simply
                            unappealing.
                        </p>
                    </div>
                </Container>
            </div>

            {/* Second Content */}
            <div
                ref={secondContentRef}
                className="absolute inset-0 z-10 flex items-center text-primary-white opacity-0">
                <Container className="w-full">
                    <p className="mt-6 w-full max-w-[480px] text-paragraph-2">
                        So she set out to build something different: a brand
                        that respects science, prioritises quality, and brings
                        joy back into daily wellness. Nutriburst was born from a
                        mission to take the guesswork out of health and replace
                        it with trust, taste, and results you can feel.
                        <br />
                        <br />
                        What began as a better way to take vitamins is now a
                        growing movement redefining what wellness can feel like:
                        one delicious and powerful gummy at a time.
                    </p>
                </Container>
            </div>
        </section>
    );
};

export default StorySection;
