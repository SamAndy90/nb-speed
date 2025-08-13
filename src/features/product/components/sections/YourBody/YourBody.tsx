'use client';

import Image from 'next/image';
import frustrated from '@/assets/frustrated.webp';
import frustrated2 from '@/assets/frustrated-mobile.webp';
import Container from '@/components/container';
import { Product } from '@/features/product/types';
import {
    extractImageData,
    useVariantProduct,
} from '@/features/product/VariantProductProvider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
export function YourBody({
    problemKillerFact,
}: {
    problemKillerFact: Product['details']['problemKillerFact'];
}) {
    const pathname = usePathname();
    const { variantDetails, variant } = useVariantProduct();
    const { problemKillerFact: variantPain } = variantDetails;

    let variantImg = extractImageData(variant.pain_image?.reference)?.url;

    const image = pathname.includes('hydration')
        ? variantImg || frustrated
        : problemKillerFact?.image || frustrated;

    const mobileImage = pathname.includes('hydration')
        ? variantImg || frustrated2
        : problemKillerFact?.mobileImage || frustrated;

    return (
        <section className="relative flex w-full flex-col gap-6 py-[50px] lg:aspect-[1440/650] lg:py-0">
            <div className="absolute aspect-[1440/650] w-full">
                <Image
                    src={image}
                    alt="Woman at laptop looking frustrated"
                    className="absolute z-[0] hidden h-full w-full object-cover lg:block"
                    width={0}
                    height={0}
                    sizes="100vw"
                />

                <div className="absolute z-[1] h-full w-full bg-your-body" />
            </div>

            <Container className="z-[1] flex h-full flex-col gap-6">
                <h2 className="font-light lg:hidden">
                    {pathname.includes('hydration')
                        ? variantPain?.title
                        : problemKillerFact.title}
                </h2>

                <div className="flex h-full w-full flex-col items-center justify-center lg:items-end lg:text-center">
                    <div className="flex max-w-[515px] flex-col gap-6 lg:gap-8">
                        <h2 className="hidden font-light lg:block">
                            {pathname.includes('hydration')
                                ? variantPain?.title
                                : problemKillerFact.title}
                        </h2>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            {pathname.includes('hydration')
                                ? variantPain?.description
                                : problemKillerFact.description}
                        </p>
                    </div>
                </div>

                <Image
                    src={mobileImage}
                    alt="Woman at laptop looking frustrated"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={cn(
                        'aspect-[335/317] h-auto w-full rounded-[10px] object-cover object-center lg:hidden',
                        {
                            'object-left': pathname.includes('hydration'),
                        }
                    )}
                />
            </Container>
        </section>
    );
}
