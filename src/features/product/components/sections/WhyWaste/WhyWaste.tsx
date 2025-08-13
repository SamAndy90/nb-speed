'use client';

import {
    ProductSectionHeading,
    ProductSectionSubtitle,
    ProductSectionTitle,
} from '../../ProductHeading/ProductHeading';
import Image, { ImageProps } from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
// import informed from '@/assets/qualifications/informed-sport.webp';
import informed from '@/assets/qualifications/informed-sport-certified.png';
import CheckGreen from '@/assets/icons/check-green.svg';
import CrossRed from '@/assets/icons/cross-red.svg';
import { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import Container from '@/components/container';
import CheckIcon from '@/assets/icons/check.svg';
import ImageIcon from '@/assets/icons/image.svg';
import { Product } from '@/features/product/types';
import Star from '@/assets/icons/nutriburst-star.svg';
import { usePathname } from 'next/navigation';
import {
    extractImageData,
    useVariantProduct,
} from '@/features/product/VariantProductProvider';

function QualificationsCarousel() {
    return (
        <Carousel className="px-0">
            <CarouselContent className="gap-6 py-16 first:*:ml-page-mobile lg:first:*:ml-page-desktop">
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
                <QualificationCard>
                    <QualificationCardImage src={informed} alt="" />
                    <QualificationCardTitle>
                        Informed Sports
                    </QualificationCardTitle>
                    <QualificationCardText>
                        A global quality assurance program that certifies sports
                        supplements and nutritional products as free from banned
                        substances, ensuring safe, tested products to provide
                        safe, reliable options.
                    </QualificationCardText>
                </QualificationCard>
            </CarouselContent>
            <div className="absolute right-36 top-0 hidden space-x-3 lg:block">
                <CarouselPrevious className="static bg-gradient-2" />
                <CarouselNext className="static bg-gradient-2" />
            </div>
        </Carousel>
    );
}
function QualificationCard({ children }: PropsWithChildren) {
    return (
        <CarouselItem className="h-[423px] basis-80 pl-page-mobile text-center lg:basis-[346px] lg:px-0">
            <div
                className="flex flex-col items-center justify-center gap-4 rounded-xl bg-background px-5 py-10"
                style={{
                    boxShadow: '0px 4px 24px 0px rgba(171, 167, 157, 0.25)',
                }}>
                {children}
            </div>
        </CarouselItem>
    );
}
function QualificationCardImage({ alt, ...props }: ImageProps) {
    return <Image {...props} alt={alt ?? ''} className="mb-4" />;
}

function QualificationCardTitle({ className, ...props }: ComponentProps<'h3'>) {
    return (
        <h3
            className={cn('font-sans text-xl font-bold lg:text-xl', className)}
            {...props}
        />
    );
}
function QualificationCardText({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('px-[2px]', className)} {...props} />;
}

function ComparisonPoint({
    children,
    icon = 'pro',
}: { icon?: 'pro' | 'con' } & PropsWithChildren) {
    const Icon = icon === 'pro' ? CheckGreen : CrossRed;
    return (
        <li className="flex items-center gap-3">
            {icon === 'con' && (
                <CrossRed className="size-3 min-w-3 lg:size-[18px] lg:min-w-[18px]" />
            )}
            {icon === 'pro' && (
                <span className="flex size-3 min-w-3 items-center justify-center rounded-full bg-cooper-gradient lg:size-[18px] lg:min-w-[18px]">
                    <CheckIcon className="w-2 text-primary-white" />
                </span>
            )}
            {children}
        </li>
    );
}
export function WhyWaste({ data }: { data: Product['details']['whySettle'] }) {
    const image = data.image;

    const pathname = usePathname();
    const isHydrationProduct = pathname.includes('hydration');
    const { variant } = useVariantProduct();
    const hydroImage = extractImageData(variant.comparison_image?.reference);

    return (
        <section className="flex w-full flex-col gap-8 pt-[50px] lg:gap-[56px] lg:pt-[120px]">
            <Container className="flex flex-col-reverse justify-between gap-8 lg:flex-row">
                <div className="relative mx-auto flex w-full max-w-[580px] items-center justify-center overflow-hidden rounded-[10px] bg-[#F8F0E5] lg:mx-0">
                    {image ? (
                        <>
                            <div className="z-[1] min-h-full w-full p-8 md:p-10">
                                <h4 className="mb-4">
                                    The Nutriburst Difference
                                </h4>
                                <ul className="max-w-[280px] space-y-2">
                                    <li>
                                        <p className="flex items-center gap-2">
                                            <Star className="w-2" />
                                            High quality & Powerful ingredients
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-2">
                                            <Star className="w-2" />
                                            Science-backed formulations that
                                            deliver real results.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-2">
                                            <Star className="w-2" />
                                            Sugar-free and Vegan
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-2">
                                            <Star className="w-2" />
                                            No artificial flavours or colours
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-2">
                                            <Star className="w-2" />
                                            Faster absorption into your
                                            bloodstream
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-2">
                                            <Star className="w-2" />
                                            Natural and delicious taste
                                        </p>
                                    </li>
                                </ul>
                                <div className="h-[130px] md:h-[200px]"></div>
                            </div>

                            {isHydrationProduct ? (
                                <Image
                                    src={hydroImage?.url ?? image}
                                    alt={hydroImage?.alt ?? 'Image'}
                                    sizes="100vw"
                                    width={0}
                                    height={0}
                                    className={
                                        'absolute bottom-0 right-0 h-full w-full max-w-[50%] object-contain object-right-bottom sm:max-w-[58%]'
                                    }
                                />
                            ) : (
                                <Image
                                    src={image}
                                    sizes="100vw"
                                    width={0}
                                    height={0}
                                    alt=""
                                    className="object-fit rounded-inherit absolute bottom-0 left-0 right-0 top-0 h-full w-full object-contain object-bottom"
                                />
                            )}
                        </>
                    ) : (
                        <ImageIcon />
                    )}
                </div>

                <div className="flex max-w-[414px] items-center justify-center">
                    <ProductSectionHeading className="flex max-w-md items-center justify-center">
                        <ProductSectionTitle className="">
                            {'Why Settle for Ineffective Vitamins?'}
                        </ProductSectionTitle>
                        <ProductSectionSubtitle className="text-paragraph-4 lg:text-paragraph-3">
                            {
                                'Nutriburst stands out as the only brand that delivers certified, high-potency vitamins designed to transform your energy, focus, and overall health - all in one delicious, plant-based bite.'
                            }
                        </ProductSectionSubtitle>
                    </ProductSectionHeading>
                </div>
            </Container>
        </section>
    );
}
