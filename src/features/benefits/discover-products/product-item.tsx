'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import React from 'react';

interface Product {
    id: string;
    name: string;
    image: string | ImageProps['src'];
    description: string;
    category: string;
    benefit: string;
}

const ProductItem = ({
    product,
    className = '',
}: {
    product: Product;
    className?: string;
}) => {
    const { name, image, description, category, benefit } = product;
    return (
        <div
            className={cn(
                'overflow-hidden rounded-[20px] shadow-soft',
                className
            )}>
            <picture className="flex w-full">
                <Image
                    src={image}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-[232px] w-full object-contain lg:h-[220px]"
                />
            </picture>

            <div className="flex flex-col items-start gap-4 p-5 lg:gap-6 lg:p-8">
                <h4>{name}</h4>
                <p className="line-clamp-4 flex-1 text-paragraph-5 lg:text-paragraph-4">
                    {description}
                </p>
                <div className="line-clamp-1 flex-1 text-paragraph-5 font-bold lg:text-paragraph-4 lg:font-bold">{`Benefit: ${benefit}`}</div>

                <span className="flex items-center gap-3 rounded-full border border-[#2C2C2C] px-3 py-2 text-paragraph-5 font-bold text-neutral-500">
                    <Switch size="sm" /> Geek Mood
                </span>
            </div>
        </div>
    );
};

export default ProductItem;
