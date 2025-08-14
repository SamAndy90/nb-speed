'use client';

import { HeroOption } from '@/features/landing/types';
import { ProductSection } from '@/features/product/components/ProductSection';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import {
    ComponentProps,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from 'react';
import theTimes from '@/assets/the-times.webp';
import womensFitness from '@/assets/womens-fitness.webp';
import lllFabric from '@/assets/lll-fabric.webp';
import sheerluxe from '@/assets/sheerluxe.webp';

import Link from 'next/link';
// import informedSport from '@/assets/qualifications/informed-sport.webp';
import InformedSport from '@/assets/qualifications/informed-sport-certified.png';
import SugarFree from '@/assets/icons/v3/SugarFree.svg';
import GlutenFree from '@/assets/icons/v3/GlutenFree.svg';
import Koscher from '@/assets/icons/v3/KoscherSertified.svg';
import Halal from '@/assets/icons/v3/HalalSertified.svg';

import SugarFree2 from '@/assets/icons/v3/SugarFree2.svg';
import GlutenFree2 from '@/assets/icons/v3/GlutenFree2.svg';
import Koscher2 from '@/assets/icons/v3/KoscherSertified2.svg';
import Halal2 from '@/assets/icons/v3/HalalSertified2.svg';
import HeroSalesBadge from '@/assets/hero-bundles/sales-badge.svg';
import { DiscountBadge } from '../DiscountBadge';
import {
    AnimatePresence,
    m,
    useMotionValueEvent,
    useScroll,
} from 'framer-motion';
import { PropsWithClassName } from '@/types';
import { forwardRef } from 'react';
import {
    FadeInVariants,
    HeroHeadingVariants,
} from '@/features/motion/variants';
import { HeroMarquee } from '../../HeroMarquee';
import Container from '@/components/container';
import { PrimaryButton } from '@/components/v2/PrimaryButton';
import { MotionDiv } from '@/components/motion-components/MotionDiv';
import { MotionParagraph } from '@/components/motion-components/MotionParagraph';
// import { ExpertBadge, HeroExpertBadge } from '../../ExpertBadge';
function HeroBrandImage({
    className,
    ...props
}: ImageProps & { i: number; count: number }) {
    return (
        <div className="relative h-6 md:h-9">
            <Image
                {...props}
                className={cn(
                    'h-full w-auto max-w-full object-contain',
                    className
                )}
            />
        </div>
    );
}

const HeroHeading = forwardRef<HTMLHeadingElement, ComponentProps<'h1'>>(
    ({ className, ...props }, ref) => {
        return (
            <h1
                {...props}
                ref={ref}
                className={cn(
                    'flex flex-col gap-1 text-center md:gap-2 md:text-start',
                    className
                )}
            />
        );
    }
);

HeroHeading.displayName = 'HeroHeading';
const MotionHeroHeading = m.create(HeroHeading);

function HeroIconImage({ className, ...props }: ImageProps) {
    return (
        <Image
            {...props}
            className={cn('size-[32px] object-cover md:size-[42px]', className)}
        />
    );
}
function HeroIconLabel({ children }: PropsWithChildren<{}>) {
    return <p className="px-2">{children}</p>;
}
function HeroIconCard({
    children,
    className,
}: PropsWithClassName & PropsWithChildren) {
    return (
        <m.li
            variants={{
                start: { scale: 1.3, opacity: 0 },
                end: { scale: 1, opacity: 1 },
            }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className={cn(
                'flex w-16 flex-col items-center justify-center gap-1 text-center text-xs first:*:size-11 md:w-20 md:gap-2.5 md:text-sm',
                className
            )}>
            {children}
        </m.li>
    );
}
const MotionProductSection = m.create(ProductSection);

function useElementBoundingRect(ref: React.RefObject<HTMLElement>) {
    const [rect, setRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const updateRect = () => {
            if (ref.current) {
                setRect(ref.current.getBoundingClientRect());
            }
        };

        updateRect();
        window.addEventListener('resize', updateRect);

        return () => {
            window.removeEventListener('resize', updateRect);
        };
    }, [ref]);

    return rect;
}
const HERO_TICK_RATE = 6000;

//TODO: Responsiveness notes
/*
    Should the hero keep the same aspect ratio
    If it just stays as the screen size, what should happen with the extra space
*/
export function Hero({ options }: { options: HeroOption[] }) {
    const [curr, setCurr] = useState(0);
    const {
        productImage: image,
        headingColour,
        expertName,
        expertImage,
        coloredText,
        plainText,
    } = options[curr];

    const [badgeShown, setBadgeShown] = useState(false);
    const { scrollYProgress } = useScroll();
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (v > 0.8) setBadgeShown(false);
    });
    useEffect(() => {
        const interval = setInterval(() => {
            setCurr((value) => (value + 1) % options.length);
        }, HERO_TICK_RATE);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <MotionProductSection
                className="relative flex w-full flex-col gap-[37px] p-0 pt-[40px] md:p-0 md:pt-[65px] lg:gap-[87px] lg:pb-[70px] lg:pt-12"
                onViewportEnter={() => setBadgeShown(false)}
                onViewportLeave={() => setBadgeShown(true)}>
                <div className="flex flex-col items-center justify-start md:justify-between lg:mb-6 lg:w-full lg:flex-row lg:gap-[74px]">
                    <div className="max-h-[95px] grow md:hidden" />
                    <div className="relative z-10 flex flex-col items-center justify-center lg:min-w-[475px] lg:items-start">
                        <MotionDiv
                            initial={{ opacity: 0, y: -25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.8,
                                ease: 'easeOut',
                                duration: 0.7,
                            }}
                            className={
                                'mb-3 text-paragraph-4 lg:text-paragraph-1'
                            }>
                            SCIENCE MADE SWEET
                        </MotionDiv>
                        <MotionDiv
                            initial={{ opacity: 0, x: -25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.2,
                                ease: 'easeOut',
                                duration: 1,
                            }}>
                            <AnimatePresence mode="popLayout">
                                <MotionHeroHeading
                                    className="mb-1.5 gap-0 text-4xl leading-tight sm:text-[2.75rem] md:gap-0 md:whitespace-nowrap lg:mb-4 lg:text-[61.8px]"
                                    variants={HeroHeadingVariants}
                                    key={`hero-heading-${curr}`}
                                    initial="hide"
                                    animate="show"
                                    exit="exit"
                                    transition={{
                                        duration: 1.7,
                                        delay: 0.1,
                                        ease: 'easeOut',
                                        times: [0, 0.25, 0.5, 1],
                                    }}>
                                    <div
                                        className={cn(
                                            'font-medium',
                                            headingColour
                                        )}>
                                        {coloredText}
                                    </div>
                                    <p className="text-nowrap text-center text-[2rem] sm:text-4xl lg:text-start lg:text-[57px]">
                                        {plainText}
                                    </p>
                                </MotionHeroHeading>
                            </AnimatePresence>
                        </MotionDiv>

                        <MotionParagraph
                            text={
                                'No more slipping up: a wellness routine that sticks with you'
                            }
                            className="mb-6 text-center text-paragraph-3 md:mb-5 md:text-[18.25px] md:font-normal lg:whitespace-nowrap lg:text-start"
                        />
                        <m.ul
                            className="hidden md:mb-5 md:flex md:gap-3"
                            variants={{
                                start: {},
                                end: {
                                    transition: {
                                        staggerChildren: 0.2,
                                    },
                                },
                            }}
                            initial={'start'}
                            animate={'end'}>
                            <HeroIconCard>
                                <HeroIconImage
                                    src={InformedSport}
                                    alt=""
                                    className="object-top"
                                />
                                <HeroIconLabel>Informed Sport</HeroIconLabel>
                            </HeroIconCard>
                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <SugarFree2 />
                                </div>
                                <HeroIconLabel>Sugar Free</HeroIconLabel>
                            </HeroIconCard>
                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <GlutenFree2 />
                                </div>
                                <HeroIconLabel>Gluten Free</HeroIconLabel>
                            </HeroIconCard>
                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <Halal2 />
                                </div>
                                <HeroIconLabel>Halal Certified</HeroIconLabel>
                            </HeroIconCard>
                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <Koscher2 />
                                </div>
                                <HeroIconLabel>Kosher Permitted</HeroIconLabel>
                            </HeroIconCard>
                        </m.ul>
                        <m.ul
                            className="mb-7 flex md:hidden"
                            variants={{
                                start: {},
                                end: {
                                    transition: {
                                        staggerChildren: 0.2,
                                    },
                                },
                            }}
                            initial={'start'}
                            animate={'end'}>
                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <Halal />
                                </div>
                                <HeroIconLabel>Halal Certified</HeroIconLabel>
                            </HeroIconCard>

                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <SugarFree />
                                </div>
                                <HeroIconLabel>Sugar Free</HeroIconLabel>
                            </HeroIconCard>
                            <HeroIconCard>
                                <HeroIconImage
                                    src={InformedSport}
                                    alt=""
                                    className="object-top"
                                />
                                <HeroIconLabel>Informed Sport</HeroIconLabel>
                            </HeroIconCard>
                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <GlutenFree />
                                </div>
                                <HeroIconLabel>Gluten Free</HeroIconLabel>
                            </HeroIconCard>

                            <HeroIconCard>
                                <div className={'flex w-full justify-center'}>
                                    <Koscher />
                                </div>
                                <HeroIconLabel>Kosher Permitted</HeroIconLabel>
                            </HeroIconCard>
                        </m.ul>
                        <MotionDiv
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2, type: 'spring' }}
                            className={
                                'md:w-full md:text-center lg:text-start'
                            }>
                            <PrimaryButton
                                type="submit"
                                className="relative h-[42px] w-fit flex-row items-center justify-center text-sm md:h-[46px] md:w-full md:max-w-[297px]"
                                href="/collections/all-products"
                                as={Link}
                                animateText
                                align="left">
                                Shop our Vitamins
                            </PrimaryButton>
                        </MotionDiv>
                    </div>
                    <div className="grow-[0.5] md:hidden" />
                    <div className="relative -mt-1.5 aspect-[388/350] w-full max-w-[388px] lg:min-w-[700px] lg:max-w-full">
                        <AnimatePresence mode="popLayout">
                            <m.div
                                className="relative h-full w-full"
                                variants={FadeInVariants}
                                initial="hide"
                                animate="show"
                                exit="exit"
                                transition={{ duration: 1 }}
                                key={`hero-image-${image.url}`}>
                                <Image
                                    src={image.url}
                                    alt={
                                        image.altText ?? 'Nutriburst collection'
                                    }
                                    fill
                                    priority
                                    sizes={'(min-width: 1024px) 700px, 90vw'}
                                    className="h-auto w-full scale-[1.1] object-contain md:scale-[1.3] lg:scale-100"
                                />
                            </m.div>
                        </AnimatePresence>
                        {/* <HeroExpertBadge
                            expertName={expertName}
                            expertImage={expertImage}
                        /> */}
                        <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.7 }}
                            className={
                                'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] scale-75 select-none rounded-[15px] shadow-[0_4px_21px_rgba(139,139,139,0.25)] backdrop-blur-lg lg:-translate-x-[15%] lg:-translate-y-3/4 lg:scale-100'
                            }>
                            <HeroSalesBadge className={'scale-[1.008]'} />
                        </MotionDiv>
                    </div>
                </div>

                <p className="text-paragraph-4 font-bold">As seen in</p>
                <div className="flex w-full overflow-clip">
                    <HeroMarquee>
                        <HeroBrandImage
                            src={womensFitness}
                            alt=""
                            className="pb-1.5"
                            i={0}
                            sizes={'(min-width: 1024px) 25vw, 33vw'}
                            count={4}
                        />
                        <HeroBrandImage
                            src={sheerluxe}
                            alt=""
                            className="pb-1.5 pt-1"
                            i={1}
                            sizes={'(min-width: 1024px) 25vw, 33vw'}
                            count={4}
                        />
                        <HeroBrandImage
                            src={lllFabric}
                            alt=""
                            className="pb-1.5"
                            i={2}
                            sizes={'(min-width: 1024px) 25vw, 33vw'}
                            count={4}
                        />
                        <HeroBrandImage
                            src={theTimes}
                            alt="Badge"
                            i={3}
                            sizes={'(min-width: 1024px) 25vw, 33vw'}
                            count={4}
                        />
                    </HeroMarquee>
                </div>

                <DiscountBadge
                    badgeShown={badgeShown}
                    setBadgeShown={setBadgeShown}
                />
            </MotionProductSection>
        </Container>
    );
}
