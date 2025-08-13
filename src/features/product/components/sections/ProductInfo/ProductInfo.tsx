'use client';

import { StarRating, ExactScore, ReviewCount } from '@/components/Ratings';
import { Stars } from '@/components/Ratings';
import { ProductCarousel } from '../../ProductCarousel';
import { Product } from '@/features/product/types';
import Container from '@/components/container';
import dynamic from 'next/dynamic';
import TwoDailyGummies from '../../TwoDailyGummies';
import { FormulatedWithCare } from '../../FormulatedWithCare';
import AccordionInfo from '../../AccordionInfo';
import { ProductReviewsResponse } from '@/lib/reviews/types';
import MostHelpfulReviews from './MostHelpfulReviews';

import { Radio, RadioGroup } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useVariantProduct } from '@/features/product/VariantProductProvider';

const PurchaseOptions = dynamic(() => import('../../PurchaseOptions'), {
    ssr: false,
});

export function ProductInfo({
    product,
    review,
}: {
    product: Product;
    review: ProductReviewsResponse | null;
}) {
    const pathname = usePathname();
    const isHydrationProduct = pathname.includes('hydration');

    const {
        type,
        size,
        flavour,
        setType,
        setSize,
        setFlavour,
        types,
        availableSizes,
        availableFlavours,
        images,
        hydrationImages,
        variantDetails,
    } = useVariantProduct();

    return (
        <section className="w-full">
            <Container className="flex w-full grid-cols-2 flex-col gap-8 lg:grid lg:gap-24 lg:pb-[106px]">
                <div className="h-fit lg:sticky lg:top-[170px]">
                    <ProductCarousel
                        images={isHydrationProduct ? hydrationImages : images}
                    />
                </div>

                <div className="w-full space-y-24">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <header className="space-y-2">
                                <h2 className="text-mobile-h1 md:text-desktop-h2">
                                    {product.title}
                                </h2>
                                {!isHydrationProduct && review && (
                                    <StarRating
                                        score={Number(review.stats.average) / 5}
                                        reviewCount={review.stats.count}
                                        className="gap-1 text-xs md:gap-2 md:text-sm">
                                        <ExactScore className="hidden md:inline" />
                                        <Stars
                                            colour="theme-v2"
                                            className="text-[13.38px] md:text-[20px]"
                                        />
                                        <ReviewCount />
                                    </StarRating>
                                )}
                                {isHydrationProduct &&
                                    variantDetails.reviews && (
                                        <StarRating
                                            score={Number(5) / 5}
                                            reviewCount={
                                                variantDetails.reviews.length
                                            }
                                            className="gap-1 text-xs md:gap-2 md:text-sm">
                                            <ExactScore className="hidden md:inline" />
                                            <Stars
                                                colour="theme-v2"
                                                className="text-[13.38px] md:text-[20px]"
                                            />
                                            <ReviewCount />
                                        </StarRating>
                                    )}
                            </header>
                            {!isHydrationProduct && (
                                <div
                                    className="list-check-gradient prose-sm text-paragraph-4 md:prose"
                                    dangerouslySetInnerHTML={{
                                        __html: product.descriptionHtml,
                                    }}
                                />
                            )}
                            {isHydrationProduct && (
                                <div className="list-check-gradient prose-sm text-paragraph-4 md:prose">
                                    {variantDetails.description}
                                </div>
                            )}
                            {/* oneSachetDailyBenefits */}
                            {!isHydrationProduct &&
                                product.details?.twoGummiesDailyBenefits
                                    ?.length > 0 && (
                                    <TwoDailyGummies
                                        values={
                                            product.details
                                                .twoGummiesDailyBenefits
                                        }
                                        isHydration={isHydrationProduct}
                                    />
                                )}
                            {isHydrationProduct &&
                                variantDetails.oneSachetDailyBenefits?.length >
                                    0 && (
                                    <TwoDailyGummies
                                        values={
                                            variantDetails.oneSachetDailyBenefits
                                        }
                                        isHydration={isHydrationProduct}
                                    />
                                )}
                        </div>

                        <div className="space-y-8">
                            {/* TYPE */}
                            {!!types.length && (
                                <div className="space-y-4">
                                    <label className="text-paragraph-4 font-bold text-primary-black">
                                        Choose The Pack Type
                                    </label>
                                    <RadioGroup
                                        value={type}
                                        onChange={setType}
                                        className="flex flex-wrap justify-start gap-3">
                                        {types.map((t) => (
                                            <Radio
                                                as="button"
                                                key={t}
                                                value={t}
                                                className={cn(
                                                    'group whitespace-nowrap rounded-xxs bg-border p-px text-sm font-bold text-neutral-300 transition-all data-[checked]:bg-gradient-3 data-[checked]:text-primary-foreground'
                                                )}>
                                                <div className="flex h-11 items-center justify-center gap-2.5 rounded-[calc(var(--radius)_-_13px);] bg-white px-6 transition-all duration-0 group-data-[checked]:bg-theme-50">
                                                    {t}
                                                </div>
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </div>
                            )}

                            {/* SIZE */}
                            {!!availableSizes.length && (
                                <div className="space-y-4">
                                    <label className="text-paragraph-4 font-bold text-primary-black">
                                        Choose The Pack Size
                                    </label>
                                    <RadioGroup
                                        value={size}
                                        onChange={setSize}
                                        className="flex flex-wrap justify-start gap-3">
                                        {availableSizes.map((s) => (
                                            <Radio
                                                as="button"
                                                key={s}
                                                value={s}
                                                className={cn(
                                                    'group whitespace-nowrap rounded-xxs bg-border p-px text-sm font-bold text-neutral-300 transition-all data-[checked]:bg-gradient-3 data-[checked]:text-primary-foreground'
                                                )}>
                                                <div className="flex h-11 items-center justify-center gap-2.5 rounded-[calc(var(--radius)_-_13px);] bg-white px-6 transition-all duration-0 group-data-[checked]:bg-theme-50">
                                                    {s}
                                                </div>
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </div>
                            )}

                            {/* FLAVOUR */}
                            {!!availableFlavours.length && (
                                <div className="space-y-4">
                                    <label className="text-paragraph-4 font-bold text-primary-black">
                                        Choose The Pack Flavour
                                    </label>
                                    <RadioGroup
                                        value={flavour}
                                        onChange={setFlavour}
                                        className="flex flex-wrap justify-start gap-3">
                                        {availableFlavours.map((f) => (
                                            <Radio
                                                as="button"
                                                key={f}
                                                value={f}
                                                className={cn(
                                                    'group whitespace-nowrap rounded-xxs bg-border p-px text-sm font-bold text-neutral-300 transition-all data-[checked]:bg-gradient-3 data-[checked]:text-primary-foreground'
                                                )}>
                                                <div className="flex h-11 items-center justify-center gap-2.5 rounded-[calc(var(--radius)_-_13px);] bg-white px-6 transition-all duration-0 group-data-[checked]:bg-theme-50">
                                                    {f}
                                                </div>
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </div>
                            )}
                        </div>

                        <PurchaseOptions product={product} />
                    </div>

                    <div>
                        {product.details?.formulatedWithCare?.length > 0 && (
                            <FormulatedWithCare
                                values={product.details.formulatedWithCare}
                            />
                        )}
                        <AccordionInfo
                            product={product}
                            variantDetails={variantDetails}
                        />
                    </div>

                    {!isHydrationProduct &&
                        product.details.reviews &&
                        product.details.reviews?.length > 0 && (
                            <MostHelpfulReviews
                                reviews={product.details.reviews}
                            />
                        )}
                    {isHydrationProduct &&
                        variantDetails.reviews &&
                        variantDetails.reviews?.length > 0 && (
                            <MostHelpfulReviews
                                reviews={variantDetails.reviews}
                            />
                        )}
                </div>
            </Container>
        </section>
    );
}
