'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductSection } from '@/features/product/components/ProductSection';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import bursting from '@/assets/landing-accordion/hand-holding-gummy.webp';
import burstingCropped from '@/assets/landing-accordion/hand-holding-gummy-cropped.webp';
import easy from '@/assets/landing-accordion/triple-immunity.webp';
import easyCropped from '@/assets/landing-accordion/triple-immunity-cropped.webp';
import highly from '@/assets/landing-accordion/collagen-revive.webp';
import highlyCropped from '@/assets/landing-accordion/collagen-revive-cropped.webp';
import { cn } from '@/lib/utils';
import Container from '@/components/container';
import { motion } from 'framer-motion';
import { MotionSpan } from '@/components/motion-components/MotionSpan';

const images: Record<string, ImageProps & { srcMobile: ImageProps['src'] }> = {
    bursting: {
        src: bursting,
        srcMobile: burstingCropped,
        alt: 'Bursting',
        className: 'md:scale-[1.5] md:-mb-[20%] md:-ml-[20%]',
    },
    easy: {
        src: easy,
        srcMobile: easyCropped,
        alt: 'Bursting',
        className: 'scale-[1.6] -mb-[43%] ml-[20%]',
    },
    highly: {
        src: highly,
        srcMobile: highlyCropped,
        alt: 'Bursting',
    },
};
function AccordionImage({ className, ...props }: ImageProps) {
    return (
        <div className="relative mt-4 w-full overflow-clip md:hidden">
            <Image
                {...props}
                className={cn('size-full object-cover', className)}
            />
        </div>
    );
}
export function GummiesRedefined() {
    const [selected, setSelected] = useState<string | undefined>('bursting');

    return (
        <Container>
            <ProductSection className="flex flex-col gap-8 px-0 py-[100px] md:px-0 lg:py-[120px]">
                <div>
                    <h2 className="font-medium text-theme-v2">
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                ease: 'easeOut',
                                duration: 0.8,
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className={
                                'self-start bg-cooper-text-gradient bg-clip-text text-transparent'
                            }>
                            The Nutriburst Formula:
                        </motion.span>{' '}
                        <br />
                        <MotionSpan
                            text={'Power, Taste, & Science'}
                            className="font-light text-primary-black"></MotionSpan>
                    </h2>
                </div>
                <div className="flex w-full overflow-clip rounded-bl-[30px] rounded-br-[30px] bg-gradient-15 px-page-mobile md:h-[614px] md:grid-cols-2 md:gap-24 md:pl-20 md:pr-0">
                    <div className="z-10 flex w-full flex-col justify-center pb-7 pt-10 md:py-30">
                        <Accordion
                            type="single"
                            value={selected}
                            variant="landing-lg"
                            defaultValue="bursting"
                            onValueChange={setSelected}>
                            <AccordionItem value="bursting">
                                <AccordionTrigger className="flex-1 text-paragraph-2 font-bold md:text-paragraph-0 md:font-bold [&>p]:max-md:max-w-full [&_svg]:ml-0">
                                    Nothing Unnecessary, Everything Essential
                                </AccordionTrigger>
                                <AccordionContent className="text-paragraph-4 lg:text-paragraph-3 lg:font-bold">
                                    We believe better nutrition starts with
                                    better choices. That’s why every Nutriburst
                                    gummy is 100% plant-based, sugar-free, and
                                    free from synthetic fillers and unnecessary
                                    additives. No animal products, no hidden
                                    nasties but pure, effective nutrition
                                    designed to fuel your wellness. Every
                                    ingredient is carefully selected for its
                                    purpose, so you’re getting exactly what you
                                    need, and nothing you don’t.
                                    {/* <Link
                                        href="/"
                                        className="mt-4 flex w-fit items-center justify-center gap-2 font-bold">
                                        Find out about Benefits{' '}
                                        <ChevronRight className="mt-0.5 size-4" />
                                    </Link> */}
                                    <AccordionImage
                                        src={images.bursting.srcMobile}
                                        alt={images.bursting.alt}
                                        sizes={'100vw'}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="easy">
                                <AccordionTrigger className="flex-1 text-paragraph-2 font-bold md:text-paragraph-0 md:font-bold [&>p]:max-md:max-w-full [&_svg]:ml-0">
                                    Because healthy should taste good too.
                                </AccordionTrigger>
                                <AccordionContent className="text-paragraph-4 lg:text-paragraph-3 lg:font-bold">
                                    We believe wellness should taste as good as
                                    it feels. That’s why every Nutriburst gummy
                                    is crafted with natural, delicious flavors
                                    and no weird aftertastes. Just gummies
                                    you’ll actually look forward to. Because
                                    when something tastes good, it’s easier to
                                    stick with it. It’s about making your daily
                                    nutrition feel effortless and enjoyable, so
                                    supporting your health becomes a moment you
                                    enjoy, not a chore.
                                    {/* <Link
                                        href="/"
                                        className="mt-4 flex w-fit items-center justify-center gap-2 font-bold">
                                        Find out about Benefits{' '}
                                        <ChevronRight className="mt-0.5 size-4" />
                                    </Link> */}
                                    <AccordionImage
                                        src={images.easy.srcMobile}
                                        alt={images.easy.alt}
                                        sizes={'100vw'}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="highly">
                                <AccordionTrigger className="flex-1 text-paragraph-2 font-bold md:text-paragraph-0 md:font-bold [&>p]:max-md:max-w-full [&_svg]:ml-0">
                                    Powered by the Super 7 for results that
                                    stick.
                                </AccordionTrigger>
                                <AccordionContent className="text-paragraph-4 lg:text-paragraph-3 lg:font-bold">
                                    Each Nutriburst formula is backed by seven
                                    of the most powerful, clinically-studied
                                    ingredients in the supplement world such as
                                    Ashwaghanda KSM-66, natural B12, Liposomal
                                    Vitamin C, enXtra®, and GutGard®. Combined
                                    with superior absorption technology, every
                                    gummy is designed for results that actually
                                    last.
                                    {/* <Link
                                        href="/"
                                        className="mt-4 flex w-fit items-center justify-center gap-2 font-bold">
                                        Find out about Benefits{' '}
                                        <ChevronRight className="mt-0.5 size-4" />
                                    </Link> */}
                                    <AccordionImage
                                        src={images.highly.srcMobile}
                                        alt={images.highly.alt}
                                        sizes={'100vw'}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="relative hidden w-full md:block">
                        {Object.keys(images).map((key) => {
                            const image = images[key];
                            return (
                                <Image
                                    key={key}
                                    src={image.src}
                                    alt={image.alt}
                                    sizes={'50vw'}
                                    className={cn(
                                        'absolute bottom-0 h-full object-cover transition-opacity duration-300',
                                        image.className,
                                        {
                                            'opacity-0': selected !== key,
                                            'opacity-100': selected === key,
                                        }
                                    )}
                                />
                            );
                        })}
                    </div>
                </div>
            </ProductSection>
        </Container>
    );
}
