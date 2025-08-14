'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_PRODUCT_IMAGES } from '../consts';
import Image from 'next/image';

const HeroProducts = () => {
    const images = HERO_PRODUCT_IMAGES;
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Create transforms for even and odd products
    const evenTransform = useTransform(
        scrollYProgress,
        [0, 1],
        [88, 0] // Start at 88px (your initial offset) and move to 0
    );

    const oddTransform = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 88] // Start at 0 and move up to 88px
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden pb-[8rem] pt-0 lg:pb-[11.25rem] lg:pt-4">
            <div className="flex items-center justify-center -space-x-[11rem] lg:-space-x-[13rem]">
                {images.map((image, index) => (
                    <motion.div
                        key={`hero-product-${index}`}
                        className="relative"
                        style={{
                            y: index % 2 === 0 ? evenTransform : oddTransform,
                        }}>
                        <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="aspect-[1] min-w-[24rem] max-w-[24rem] object-contain lg:min-w-[35.375rem] lg:max-w-[35.375rem]"
                        />

                        {index < images.length - 1 && (
                            <div className="absolute right-0 top-1/2 hidden w-8 border-t-2 border-dotted border-gray-300 md:block" />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HeroProducts;
