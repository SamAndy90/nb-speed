import React from 'react';
import { PRODUCT_IMAGES } from '../consts';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductShowcase = ({ className = '' }: { className?: string }) => {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-[20px] bg-beige',
                className
            )}>
            <div className="p-5 pb-0 text-paragraph-4 font-semibold lg:p-[60px] lg:pb-0 lg:text-paragraph-3 lg:font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                seThrough our partnership with Clime Co, we're proud to support
                the TONTOTON project, an initiative with significant co-benefits
                for economically stressed local workers who voluntarily remove
                plastic in Vietnam and Cambodia. Under this program, these
                workers, who are primarily female, receive above-average pay,
                personal protective equipment, and primary health insurance.
            </div>

            <div className="mb-[-4rem] mt-8 flex justify-center space-x-[-5rem] lg:mb-[-12rem] lg:mt-10 lg:space-x-[-12rem]">
                {PRODUCT_IMAGES.map((image, index) => (
                    <Image
                        key={`product-${index}`}
                        src={image}
                        alt={`product${index}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="aspect-[1] min-w-[197px] lg:min-w-[423px]"
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductShowcase;
