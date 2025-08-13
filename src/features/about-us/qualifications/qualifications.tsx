'use client';

import React, { useEffect, useRef, useState } from 'react';
import Container from '@/components/container';
import { QUALIFICATIONS } from '../consts';
import QualificationCard from './qualification-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Qualifications = ({
    highlight = 'text-accent-pink',
}: {
    highlight?:
        | 'text-accent-pink'
        | 'text-accent-ocean-blue'
        | 'text-theme-v2'
        | 'text-transparent bg-cooper-text-gradient bg-clip-text';
}) => {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [spacing, setSpacing] = useState<number>(0);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateSpacing = () => {
            const width = containerRef.current?.offsetWidth || 0;
            setSpacing((window.innerWidth - width) / 2);
        };

        // Initial calculation
        updateSpacing();

        // Set up ResizeObserver
        const observer = new ResizeObserver(updateSpacing);
        observer.observe(containerRef.current);

        // Clean up
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!scrollContainerRef.current) return;

        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current;
            setIsBeginning(scrollLeft <= 10);
            setIsEnd(scrollLeft >= scrollWidth - clientWidth - 10);
        };

        scrollContainerRef.current.addEventListener('scroll', handleScroll);

        return () => {
            scrollContainerRef.current?.removeEventListener(
                'scroll',
                handleScroll
            );
        };
    }, []);

    const handlePrev = () => {
        if (!scrollContainerRef.current) return;

        const cardWidth = 345; // Approximate width of a card + gap
        scrollContainerRef.current.scrollBy({
            left: -cardWidth,
            behavior: 'smooth',
        });
    };

    const handleNext = () => {
        if (!scrollContainerRef.current) return;

        const cardWidth = 345; // Approximate width of a card + gap
        scrollContainerRef.current.scrollBy({
            left: cardWidth,
            behavior: 'smooth',
        });
    };

    return (
        <section className="w-full overflow-hidden py-[3.125rem] lg:py-[7.5rem]">
            <div className="w-full">
                <Container ref={containerRef}>
                    <h2>
                        <span className={cn('font-medium', highlight)}>
                            Qualifications
                        </span>{' '}
                        <br className="block md:hidden" /> you can trust
                    </h2>

                    <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row">
                        <p className="w-full max-w-[490px] text-paragraph-4 lg:text-paragraph-2">
                            Our Gummies have been certified by international
                            standards. We want to ensure top notch quality for
                            you.
                        </p>

                        <div className="hidden flex-1 items-end justify-end gap-3 md:flex">
                            <Button
                                disabled={isBeginning}
                                className="h-[34px] w-[34px] bg-gradient-2 p-0"
                                onClick={handlePrev}>
                                <ChevronLeft size={16} />
                            </Button>
                            <Button
                                disabled={isEnd}
                                className="h-[34px] w-[34px] bg-gradient-2 p-0"
                                onClick={handleNext}>
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
                </Container>

                <div
                    ref={scrollContainerRef}
                    className="mt-[60px] flex gap-5 overflow-auto px-5 pb-8 [-ms-overflow-style:'none'] [scrollbar-width:none] lg:gap-8 lg:pb-[72px] [&::-webkit-scrollbar]:hidden">
                    {QUALIFICATIONS.map((qualification, index) => (
                        <div
                            style={{
                                marginLeft: index === 0 ? `${spacing}px` : 0,
                                marginRight:
                                    index === QUALIFICATIONS.length - 1
                                        ? `${spacing}px`
                                        : 0,
                            }}
                            key={`qualification-${index}`}
                            className="!w-[250px] min-[350px]:!w-[302px] md:!w-[345px]">
                            <QualificationCard {...qualification} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Qualifications;
