import Container from '@/components/container';
import React from 'react';
import ProductItem from './product-item';
import { cn } from '@/lib/utils';

const ProductChoicesSection = ({
    title,
    highlightTextClassName = '',
    products,
}: {
    title: string;
    highlightTextClassName?: string;
    products: any[];
}) => {
    return (
        <section
            id={'recommended-products'}
            className="py-[3.125rem] lg:py-[7.5rem]">
            <Container className="flex flex-col gap-[60px]">
                <div className="flex flex-col items-center gap-4 text-center lg:gap-6">
                    <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                        HER FAVOURITES
                    </div>

                    <h2>
                        {title} <br />
                        <span
                            className={cn(
                                'font-medium text-accent-pink',
                                highlightTextClassName
                            )}>
                            product choices
                        </span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ProductChoicesSection;
