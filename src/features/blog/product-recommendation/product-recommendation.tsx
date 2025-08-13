'use client';

import Container from '@/components/container';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useCart } from '@/features/cart/context/cart';
import { Product } from '@/features/product/types';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { getFragmentData } from '@/gql/storefront';
import { cn, currencyFormatter } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface ProductRecommendationProps {
    products: Product[];
    className?: string;
}

const ProductRecommendation = ({
    products,
    className,
}: ProductRecommendationProps) => {
    const count = products.length;
    const isSingle = count === 1;

    const { addCartItem } = useCart();

    const productImage = (product: Product) => {
        return getFragmentData(imageFragment, product.featuredImage);
    };

    return (
        <section className={cn('mb-12', className)}>
            <Container className="max-w-[1020px]">
                <div className="flex flex-col gap-[2.8125rem] lg:gap-12">
                    <h2 className="text-center lg:text-left">
                        <span className="lg:hidden">We have a </span>
                        {`${count} product`}{' '}
                        <span className="font-medium text-accent-ocean-blue">
                            Recommendation
                        </span>
                    </h2>
                    <div
                        className={cn({
                            'grid grid-cols-1 gap-[2.8125rem] lg:grid-cols-3 lg:gap-0':
                                !isSingle,
                        })}>
                        {products.map((product) => {
                            const image = productImage(product);
                            const price =
                                product.priceRange.maxVariantPrice.amount;
                            const formattedPrice =
                                currencyFormatter.format(price);
                            const defaultVariant = product?.variants[0];

                            return (
                                <div
                                    key={product.id}
                                    className={cn(
                                        'flex flex-col gap-8 lg:gap-10',
                                        {
                                            'lg:flex-row lg:gap-0': isSingle,
                                        }
                                    )}>
                                    <picture className="h-[278px] lg:h-[348px]">
                                        {image && (
                                            <Image
                                                src={image.url}
                                                alt={image.altText ?? ''}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="h-full w-full object-contain"
                                            />
                                        )}
                                    </picture>

                                    <div
                                        className={cn(
                                            'flex flex-col items-center gap-4 text-center lg:gap-6',
                                            { 'flex-1': !isSingle },
                                            {
                                                'lg:items-start lg:text-left':
                                                    isSingle,
                                            }
                                        )}>
                                        <div
                                            className={cn(
                                                'flex flex-col gap-3',
                                                { 'flex-1': !isSingle }
                                            )}>
                                            {product.title && (
                                                <h3>{product.title}</h3>
                                            )}
                                            {product.shortDescription
                                                ?.value && (
                                                <p className="line-clamp-3 text-paragraph-3 lg:text-paragraph-4">
                                                    {product.shortDescription
                                                        ?.value || ''}
                                                </p>
                                            )}
                                        </div>

                                        <p className="text-paragraph-3 font-bold lg:text-paragraph-4 lg:font-bold">
                                            {`from ${formattedPrice}`}
                                        </p>

                                        {/* Button width is not match with Figma design. when I try to adjust its width, style is broken. 
                                            So just made it as 240px since it looks good with this size.
                                        */}
                                        <PrimaryButton
                                            className="h-auto w-60 flex-row items-center justify-center rounded-full bg-transparent p-0"
                                            align="left"
                                            onClick={() =>
                                                addCartItem(
                                                    defaultVariant,
                                                    product
                                                )
                                            }>
                                            Add to cart
                                        </PrimaryButton>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ProductRecommendation;
