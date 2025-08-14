'use client';

import { ChevronLink } from '@/components/ChevronLink';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import advancedSupport from '../../../assets/advanced-support-bg.webp';
import dailyEssentials from '../../../assets/daily-essentials-bg.webp';
import kids from '../../../assets/kids-bg.webp';
import hydrationDesktop from '@/assets/hydration-bg-desktop.jpg';
import hydrationMobile from '@/assets/hydration-bg-mobile.jpg';
import Image from 'next/image';
import Container from '@/components/container';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { m } from 'framer-motion';
import { MotionSpan } from '@/components/motion-components/MotionSpan';
import { ShopUrls } from '@/route-urls';
import { useMediaQuery } from '@/hooks/useMediaQuery';

function DiscoverCarouselItem({
    children,
    title,
    subtitle,
    shopNowLink,
    learnMoreLink,
}: PropsWithChildren & {
    title: string;
    subtitle: string;
    shopNowLink: string;
    learnMoreLink?: string;
}) {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-start px-5 pt-5 md:px-10 lg:pt-20">
            <div className="relative z-10 mb-1 flex flex-col items-center justify-center text-center">
                <h3 className={'text-3xl font-light'}>{title}</h3>
                <p className="mb-2 mt-1 text-sm md:max-w-[400px] md:text-base lg:mb-4 lg:mt-3">
                    {subtitle}
                </p>
                <div className="flex gap-3 *:text-xs md:*:text-xs">
                    <Button variant="dark" size="sm">
                        <Link href={shopNowLink}>Shop now</Link>
                    </Button>
                    {learnMoreLink && (
                        <ChevronLink href={learnMoreLink}>
                            Learn more
                        </ChevronLink>
                    )}
                </div>
            </div>
            <div className="absolute inset-0 size-full overflow-clip rounded-sm">
                {children}
            </div>
        </div>
    );
}
export function DiscoverOurCollections() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [spacing, setSpacing] = useState<number>(0);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    const isDesktop = useMediaQuery('lg');

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

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.25,
            },
        },
    };
    const cardVariants = {
        hidden: { opacity: 0, x: 25 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <section className="flex w-full flex-col overflow-hidden pb-[50px] lg:pb-[120px]">
            <Container ref={containerRef}>
                <div className="flex">
                    <h2>
                        <MotionSpan text={'Explore our range.'} />
                        <br className="hidden lg:block" />{' '}
                        <MotionSpan
                            text={'Find the solution tailored to your goals'}
                            className="font-medium"
                        />
                    </h2>
                    <div className="hidden flex-1 items-end justify-end gap-3 md:flex">
                        <Button
                            variant="secondary"
                            disabled={isBeginning}
                            className="h-[34px] w-[34px] bg-gradient-2 p-0 disabled:opacity-50"
                            onClick={handlePrev}
                            aria-label="Previous slide">
                            <ChevronLeft size={16} />
                        </Button>
                        <Button
                            variant="secondary"
                            disabled={isEnd}
                            className="h-[34px] w-[34px] bg-gradient-2 p-0 disabled:opacity-50"
                            onClick={handleNext}
                            aria-label="Next slide">
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </Container>

            <m.div
                variants={containerVariants}
                initial={'hidden'}
                whileInView={'visible'}
                viewport={{ once: true }}
                ref={scrollContainerRef}
                className="mt-10 flex gap-5 overflow-auto px-5 [-ms-overflow-style:'none'] [scrollbar-width:none] lg:mt-[60px] lg:gap-8 [&::-webkit-scrollbar]:hidden">
                <m.div
                    variants={cardVariants}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="aspect-[0.9] !min-w-[302px] lg:!min-w-[500px]"
                    style={{
                        marginLeft: spacing,
                    }}>
                    <DiscoverCarouselItem
                        title="Advanced"
                        subtitle="Designed to deliver high-strength, clinically studied formulations for maximum  results."
                        shopNowLink="/collections/all-products?benefit=advanced">
                        <Image
                            src={advancedSupport}
                            alt="Advanced Support"
                            className="size-full object-cover"
                            sizes={'(max-width: 1024px) 320px, 500px'}
                        />
                    </DiscoverCarouselItem>
                </m.div>
                <m.div
                    variants={cardVariants}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="!min-w-[302px] lg:!min-w-[500px]">
                    <DiscoverCarouselItem
                        title="Daily Essentials"
                        subtitle="Designed to support everyday wellness with essential nutrients for energy, immunity, and balance."
                        shopNowLink="/collections/all-products?benefit=daily">
                        <Image
                            src={dailyEssentials}
                            alt="Advanced Support"
                            className="size-full object-cover"
                            sizes={'(max-width: 1024px) 320px, 500px'}
                        />
                    </DiscoverCarouselItem>
                </m.div>
                <m.div
                    variants={cardVariants}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="!min-w-[302px] lg:!min-w-[500px]">
                    <DiscoverCarouselItem
                        title="Kids Support"
                        subtitle="Designed to give growing bodies the key nutrients they need: delicious, effective, and parent-approved."
                        shopNowLink="/collections/all-products?benefit=kids">
                        <div className="flex size-full flex-col items-center justify-end bg-gradient-to-b from-[#FFF4D5] to-[#FFEBB4]">
                            <Image
                                src={kids}
                                alt="Kids Gummies"
                                className="size-full object-cover"
                                sizes={'(max-width: 1024px) 320px, 500px'}
                            />
                        </div>
                    </DiscoverCarouselItem>
                </m.div>
                <m.div
                    variants={cardVariants}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="!min-w-[302px] lg:!min-w-[500px]"
                    style={{
                        marginRight: spacing,
                    }}>
                    <DiscoverCarouselItem
                        title="Hydration"
                        subtitle="Designed to replenish, restore, and rehydrate with electrolyte-enhanced formulas tailored for every need."
                        shopNowLink={ShopUrls.getProduct('hydration')}>
                        <Image
                            src={isDesktop ? hydrationDesktop : hydrationMobile}
                            alt="Hydration"
                            sizes={'(max-width: 1024px) 320px, 500px'}
                            className="size-full object-cover object-[center_65%] lg:object-center"
                        />
                    </DiscoverCarouselItem>
                </m.div>
            </m.div>
        </section>
    );
}
