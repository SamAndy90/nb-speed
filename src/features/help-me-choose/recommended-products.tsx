'use client';

import { Product } from '@/features/product/types';
import Link from 'next/link';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { getFragmentData } from '@/gql/storefront';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type RecommendedProductsProps = {
    data: string[];
    products: Product[];
};

export default function RecommendedProducts({
    data,
    products,
}: RecommendedProductsProps) {
    const recommendedProducts = products.filter((p) => data.includes(p.handle));

    return (
        <div className={'md:mx-auto md:max-w-[calc(84%)]'}>
            <ul className="flex w-full gap-x-4 md:gap-x-6 lg:gap-x-8">
                {recommendedProducts?.map((p) => {
                    const image = p
                        ? getFragmentData(imageFragment, p.featuredImage)
                        : null;
                    return (
                        <li key={p.id} className={'w-full max-w-sm'}>
                            <Link href={`products/${p.handle}`}>
                                <div className={cn('relative aspect-[3/4]')}>
                                    {image && (
                                        <Image
                                            src={image.url}
                                            alt={image.altText ?? ''}
                                            fill
                                            className="object-contain md:object-cover"
                                        />
                                    )}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
