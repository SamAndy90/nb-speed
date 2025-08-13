'use client';

import Image, { ImageProps } from 'next/image';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Stars } from '@/components/Ratings';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Container from '@/components/container';
import ReviewsBadgeRibbon from './ReviewsBadgeRibbon';
import { MotionSpan } from '@/components/motion-components/MotionSpan';
import { motion } from 'framer-motion';
import { MotionParagraph } from '@/components/motion-components/MotionParagraph';
import { TESTIMONIALS } from '@/lib/data/testimonials';

type VideoReviewCardProps = {
    name: string;
    rating: number;
    thumbnail: Pick<ImageProps, 'src' | 'alt'>;
    category?: string;
    imageClassName?: string;
    className?: string;
} & PropsWithChildren;

function VideoReviewCard({
    name,
    rating,
    thumbnail,
    children,
    category = 'Hair, Skin & Nails',
    imageClassName = '',
    className = '',
}: VideoReviewCardProps) {
    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    x: 25,
                },
                visible: {
                    opacity: 1,
                    x: 0,
                },
            }}
            transition={{ ease: 'easeOut', duration: 0.8 }}
            className={cn(
                'flex h-full w-full flex-col overflow-clip rounded-md bg-beige',
                className
            )}>
            <div className="relative h-[225px] min-h-[225px] w-full object-cover">
                <Image
                    src={thumbnail.src}
                    alt={thumbnail.alt}
                    className={cn('object-cover', imageClassName)}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* <div className="absolute bottom-3 left-5 w-fit rounded-full bg-[#65656545] px-3 py-2 text-[10px] text-white backdrop-blur-xl">
                    {category}
                </div> */}
            </div>
            <div className="flex grow flex-col gap-4 px-5 py-8 text-primary-black">
                <Stars
                    colour="primary"
                    className="text-sm leading-[1]"
                    score={rating}
                />
                <p className="grow text-paragraph-4">{children}</p>
                <p className="text-paragraph-3 font-bold">{name}</p>
            </div>
        </motion.div>
    );
}

function VideoReviewCarouselCard({
    name,
    rating,
    thumbnail,
    children,
    category = 'Hair, Skin & Nails',
    imageClassName = '',
    className,
}: VideoReviewCardProps) {
    return (
        <CarouselItem
            className={cn(
                'flex min-h-full w-[calc(270px+24px)] max-w-[calc(270px+24px)] pl-6 drop-shadow-card',
                className
            )}>
            <div className="w-full overflow-hidden rounded-md bg-beige">
                <div className="relative h-[215px] min-h-[215px] w-full overflow-hidden object-cover">
                    <Image
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        className={cn(
                            'rounded-t-md object-cover',
                            imageClassName
                        )}
                        width={0}
                        height={0}
                        sizes="300px"
                    />
                    {/* <div className="absolute bottom-3 left-5 w-fit rounded-full bg-[#65656545] px-3 py-2 text-[10px] text-white backdrop-blur-xl">
                        {category}
                    </div> */}
                </div>
                <div className="flex h-full flex-col gap-4 px-5 py-8 text-primary-black">
                    <Stars
                        colour="primary"
                        score={rating}
                        className="text-sm leading-[1]"
                    />
                    <p className="flex-1 text-sm">{children}</p>
                    <p className="font-bold">{name}</p>
                </div>
            </div>
        </CarouselItem>
    );
}

function ReviewsList() {
    return (
        <motion.div
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.3 },
                },
            }}
            initial={'hidden'}
            whileInView={'visible'}
            viewport={{ once: true }}
            className="hidden gap-6 drop-shadow-card grid-auto-fit grid-max-fr grid-min-60 md:grid">
            {TESTIMONIALS.map((review, index) => (
                <VideoReviewCard
                    key={index}
                    name={review.name}
                    rating={review.rating}
                    thumbnail={review.thumbnail}
                    category={review.category}
                    imageClassName={review.imageClassName}
                    className={review.cardClassName}>
                    {review.content}
                </VideoReviewCard>
            ))}
        </motion.div>
    );
}

function ReviewsCarousel() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const onSlideChange = useCallback((api: any) => {
        const current = api?.selectedScrollSnap();
        setCurrent(current);
    }, []);
    const slideCount = TESTIMONIALS.length;

    useEffect(() => {
        api?.on('select', onSlideChange);
        return () => {
            api?.off('select', onSlideChange);
        };
    }, [api, onSlideChange]);

    return (
        <Carousel className="md:hidden" setApi={setApi}>
            <CarouselContent
                containerClassName="overflow-visible"
                className="-ml-6 pb-20 pl-page-mobile">
                {TESTIMONIALS.map((review, index) => (
                    <VideoReviewCarouselCard
                        key={index}
                        name={review.name}
                        rating={review.rating}
                        thumbnail={review.thumbnail}
                        category={review.category}
                        imageClassName={review.imageClassName}
                        className={review.cardClassName}>
                        {review.content}
                    </VideoReviewCarouselCard>
                ))}
            </CarouselContent>
            <div className="absolute bottom-12 flex w-full items-center justify-center gap-4">
                {[...new Array(slideCount)].map((_, i) => (
                    <div
                        className={cn(
                            'h-[5px] w-[5px] rounded-full bg-theme-400 transition-all',
                            current === i && 'w-10'
                        )}
                        key={`carousel-dot-${i}`}
                    />
                ))}
            </div>
        </Carousel>
    );
}

export function LovedBy() {
    return (
        <section
            id="reviews"
            className="flex w-full flex-col gap-10 overflow-hidden pt-[50px] md:pb-[50px] lg:gap-[60px] lg:py-[120px]">
            <Container>
                <div className="flex flex-col items-center justify-center gap-3 text-center lg:gap-4">
                    <h2 className="flex flex-col">
                        <MotionSpan text={'Real Stories. Real Results'} />
                        {/* <br /> */}
                        <motion.b
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3,
                                ease: 'easeOut',
                                duration: 0.5,
                            }}
                            viewport={{ once: true }}
                            className="self-start bg-cooper-text-gradient bg-clip-text text-transparent">
                            See why customers choose Nutriburst
                        </motion.b>
                    </h2>
                    <MotionParagraph
                        text={
                            'Discover how our entire range of products has transformed lives, with real stories of health and wellness from our satisfied customers.'
                        }
                        className="max-w-[556px]"></MotionParagraph>
                    <div className="flex flex-col items-center justify-center gap-4">
                        {/* <div className="flex items-center gap-3">
                            <Stars
                                score={5 / 5}
                                colour="primary"
                                className="gap-[3px]"
                            />{' '}
                            <p className="text-xs font-bold">(771 reviews)</p>{' '}
                            <ReviewsIo />
                        </div> */}
                        <ReviewsBadgeRibbon />
                        {/* <ChevronLink href="/">See all reviews</ChevronLink> */}
                    </div>
                </div>
            </Container>

            <ReviewsCarousel />

            <Container>
                <ReviewsList />
            </Container>
        </section>
    );
}
