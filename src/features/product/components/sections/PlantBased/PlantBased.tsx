'use client';

import Image from 'next/image';
import plant from '@/assets/plant.webp';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Container from '@/components/container';
import { Product } from '@/features/product/types';
import CheckIcon from '@/assets/icons/check.svg';
import { cn } from '@/lib/utils';
import {
    extractImageData,
    useVariantProduct,
} from '@/features/product/VariantProductProvider';
import { usePathname } from 'next/navigation';

export function PlantBased({
    solutionToProductSpecific,
}: {
    solutionToProductSpecific: Product['details']['solutionToProductSpecific'];
}) {
    const pathname = usePathname();
    const isHydrationProduct = pathname.includes('hydration');
    const { variant, variantDetails } = useVariantProduct();
    const { solutionToProductSpecific: solution } = variantDetails;

    const image = isHydrationProduct
        ? extractImageData(variant.ingredients_image?.reference)?.url || plant
        : solutionToProductSpecific?.image || plant;

    return (
        <section className="w-full bg-gradient-section-3 py-[50px] lg:py-[120px]">
            <Container className="flex grid-cols-2 flex-col gap-10 lg:grid lg:gap-[56px]">
                <div className="contents flex-col items-start gap-8 last:*:mt-2 md:flex">
                    <div className="flex max-w-xl flex-col gap-4">
                        {isHydrationProduct && (
                            <h2>
                                {solution?.heading}
                                {solution?.accentHeading && (
                                    <>
                                        <br />
                                        <b className="bg-cooper-text-gradient bg-clip-text text-transparent">
                                            {solution.accentHeading}
                                        </b>
                                    </>
                                )}
                            </h2>
                        )}
                        {!isHydrationProduct && (
                            <h2>
                                {solutionToProductSpecific.heading.replace(
                                    ' Formula',
                                    ''
                                )}
                                {solutionToProductSpecific.accentHeading && (
                                    <>
                                        <br />
                                        <b className="bg-cooper-text-gradient bg-clip-text text-transparent">
                                            {
                                                solutionToProductSpecific.accentHeading
                                            }
                                        </b>
                                    </>
                                )}
                            </h2>
                        )}
                        <p className="w-full text-paragraph-4 lg:text-paragraph-3">
                            {isHydrationProduct
                                ? solution?.description
                                : solutionToProductSpecific.description}
                        </p>
                    </div>
                    <div className="relative flex flex-col items-center md:hidden">
                        <Image
                            src={image}
                            alt=""
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={cn(
                                'top-20 aspect-[484/318] h-auto w-full rounded-[20px] object-contain md:sticky',
                                {
                                    'object-cover':
                                        solutionToProductSpecific?.image &&
                                        !isHydrationProduct,
                                },
                                {
                                    'object-cover': isHydrationProduct,
                                }
                            )}
                        />
                    </div>
                    {isHydrationProduct && solution?.product && (
                        <div className="w-full">
                            <h3>{solution.product.title}</h3>
                            {solution.product.description && (
                                <p className="mb-6 mt-2 w-full text-paragraph-4 lg:text-paragraph-3">
                                    {solution.product.description}
                                </p>
                            )}
                            <ul className="space-y-3 text-paragraph-4 lg:text-paragraph-3">
                                {solution.product.benefits.map((benefit, i) => (
                                    <li
                                        key={`product-benefit-${i}`}
                                        className="flex gap-3">
                                        <span className="flex size-6 min-w-6 items-center justify-center rounded-full bg-cooper-gradient">
                                            <CheckIcon className="w-3 text-primary-white" />
                                        </span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {!isHydrationProduct &&
                        solutionToProductSpecific.product && (
                            <div className="w-full">
                                <h3>
                                    {solutionToProductSpecific.product.title}
                                </h3>
                                {solutionToProductSpecific.product
                                    .description && (
                                    <p className="mb-6 mt-2 w-full text-paragraph-4 lg:text-paragraph-3">
                                        {
                                            solutionToProductSpecific.product
                                                .description
                                        }
                                    </p>
                                )}
                                <ul className="space-y-3 text-paragraph-4 lg:text-paragraph-3">
                                    {solutionToProductSpecific.product.benefits.map(
                                        (benefit, i) => (
                                            <li
                                                key={`product-benefit-${i}`}
                                                className="flex gap-3">
                                                <span className="flex size-6 min-w-6 items-center justify-center rounded-full bg-cooper-gradient">
                                                    <CheckIcon className="w-3 text-primary-white" />
                                                </span>
                                                {benefit}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full font-sans">
                        {(isHydrationProduct
                            ? solution?.ingredients
                            : solutionToProductSpecific.ingredients
                        )?.map((ingredient, i) => (
                            <AccordionItem
                                key={`ingredient-${i}`}
                                value={`ingredient-${i}`}>
                                <AccordionTrigger className="py-4 font-sans text-paragraph-4 font-bold md:py-4 lg:text-paragraph-3 lg:font-bold">
                                    {ingredient.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {ingredient.description && (
                                        <p className="mb-4">
                                            {ingredient.description}
                                        </p>
                                    )}
                                    {ingredient.benefits &&
                                        ingredient.benefits.length > 0 && (
                                            <ul className="space-y-3 text-paragraph-4 lg:text-paragraph-3">
                                                {ingredient.benefits.map(
                                                    (benefit, i) => (
                                                        <li
                                                            key={`product-ingredient-benefit-${i}`}
                                                            className="flex gap-3">
                                                            <span className="flex size-6 min-w-6 items-center justify-center rounded-full bg-cooper-gradient">
                                                                <CheckIcon className="w-3 text-primary-white" />
                                                            </span>
                                                            {benefit}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="relative hidden flex-col items-center md:flex">
                    <Image
                        src={image}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={cn(
                            'top-20 aspect-[484/318] h-auto w-full rounded-[20px] object-contain md:sticky',
                            {
                                'object-cover':
                                    solutionToProductSpecific?.image &&
                                    !isHydrationProduct,
                            },
                            {
                                'object-cover': isHydrationProduct,
                            }
                        )}
                    />
                </div>
            </Container>
        </section>
    );
}
