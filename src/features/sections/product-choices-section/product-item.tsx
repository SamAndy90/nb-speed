'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShopUrls } from '@/route-urls';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Product {
    id: string;
    name: string;
    label: string;
    image: string | ImageProps['src'];
    price: number;
    description: string;
    tags?: string[];
    category: string;
}
const ProductItem = ({
    product,
    contentClassName,
}: {
    product: Product;
    contentClassName?: string;
}) => {
    const { image, name, price, category, description } = product;

    return (
        <div className="flex w-full max-w-[350px] flex-col items-center">
            <picture>
                <Image
                    src={image}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="aspect-[1] w-[363px]"
                />
            </picture>

            <div
                className={cn(
                    'flex flex-1 flex-col items-center gap-6 text-center',
                    contentClassName
                )}>
                <div className="flex flex-1 flex-col gap-4">
                    <div className="text-paragraph-4 font-bold">{category}</div>
                    <h5>{name}</h5>
                    <p className="flex-1 text-paragraph-4 lg:text-paragraph-3">
                        {`“${description}”`}
                    </p>
                </div>

                <div className="text-paragraph-3 font-bold">{`from £${price}`}</div>

                <Link href={ShopUrls.getProduct(product.id)}>
                    <Button variant={'dark'} size="sm">
                        Go to product
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProductItem;
