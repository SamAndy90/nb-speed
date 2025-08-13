import React from 'react';
import productGroup from '@/assets/nutribust-products-group.webp';
import Image from 'next/image';

const ProductShowcase = () => {
    return (
        <div className="w-full">
            <Image
                src={productGroup}
                width={0}
                height={0}
                sizes="100vw"
                alt="Ultra-D1000"
                className="mx-auto h-auto w-full max-w-[600px]"
            />
        </div>
    );
};

export default ProductShowcase;
