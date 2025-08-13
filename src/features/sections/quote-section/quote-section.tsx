'use client';
interface QuoteSectionProps {
    quote: string;
    name: string;
    title: string;
    imageSrc: ImageProps['src'];
    signatureImageSrc?: ImageProps['src'];
    imageAlt?: string;
    signatureAlt?: string;
    direction?: 'right' | 'left';
    className?: string;
    imageClassName?: string;
    backgroundColor?: string;
}

// QuoteSection.tsx
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { StaticImageData } from 'next/image';
import Container from '@/components/container';
import PlusCircle from '@/assets/icons/plus-circle-no-color.svg';
import { cn } from '@/lib/utils';

const QuoteSection: React.FC<QuoteSectionProps> = ({
    quote,
    name,
    title,
    imageSrc,
    signatureImageSrc,
    imageAlt,
    signatureAlt,
    direction = 'right',
    className = '',
    imageClassName = '',
    backgroundColor = 'bg-gradient-section',
}) => {
    const containerClasses =
        direction === 'right'
            ? 'flex flex-col items-center gap-8 lg:flex-row lg:gap-[78px]'
            : 'flex flex-col items-center gap-8 lg:flex-row-reverse lg:gap-[78px]';
    const [showMore, setShowMore] = useState<boolean>(false);

    const toggleShowMore = () => {
        setShowMore((prev) => !prev);
    };

    return (
        <section
            className={`${backgroundColor} py-[3.125rem] lg:py-[7.5rem] ${className}`}>
            <Container>
                <div className={containerClasses}>
                    {/* Quote Section */}
                    <div className="flex w-full max-w-[501px] justify-center">
                        <div className="relative w-full pl-[29px] pt-[50px] lg:max-w-[383px]">
                            {/* Quote Mark */}
                            <span
                                className="absolute left-0 top-[-4.5rem] bg-cooper-gradient bg-clip-text text-[225.75px] font-semibold text-transparent"
                                aria-hidden="true">
                                “
                            </span>

                            {/* Quote Text */}
                            <p className="relative z-[1] mb-2 text-[20px] font-semibold italic leading-[1.71] lg:text-[24px]">
                                {quote}
                            </p>

                            {/* Signature Image */}
                            {signatureImageSrc && (
                                <Image
                                    src={signatureImageSrc}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt={signatureAlt ?? 'Image'}
                                    className="mb-2 h-auto lg:max-w-[255px]"
                                    priority
                                />
                            )}

                            {/* Name and Title */}
                            <div>
                                <div className="text-paragraph-3 font-bold lg:text-paragraph-2 lg:font-bold">
                                    {name}
                                </div>
                                <div className="text-paragraph-5 lg:text-paragraph-4">
                                    {title}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative flex w-full max-w-[580px]">
                        <Image
                            src={imageSrc as StaticImageData | string}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt={imageAlt || name}
                            className={`aspect-[1.2] w-full rounded-[10px] object-cover ${imageClassName}`}
                            priority
                        />

                        <span
                            className="absolute bottom-4 right-2 z-[2] cursor-pointer *:transition-all hover:*:scale-110 lg:bottom-8 lg:right-6"
                            onClick={toggleShowMore}>
                            <PlusCircle
                                className={cn(
                                    'h-8 text-primary-white lg:h-[45px]',
                                    {
                                        'rotate-45 text-base-100': showMore,
                                    }
                                )}
                            />
                        </span>

                        <div
                            className={cn(
                                'absolute left-0 top-0 z-[-1] flex h-full w-full flex-col gap-6 rounded-[10px] bg-[#f4f4f4d6] p-8 opacity-0 transition-all duration-300 lg:gap-8',
                                { 'z-[1] opacity-100': showMore }
                            )}>
                            <div className="text-paragraph-3 font-bold lg:text-paragraph-2 lg:font-bold">
                                {'About Christianna'}
                            </div>
                            <div className="text-paragraph-5 lg:text-paragraph-4">
                                {`Christianna runs a private clinical nutrition practice, supporting clients worldwide with tailored nutrition plans. She's also the esteemed food editor and columnist for London's cherished publication, Cherubs, where she shares her passion for healthy seasonal recipes and offers valuable insights into the world of nutrition.`}
                            </div>
                            <div className="text-paragraph-5 lg:text-paragraph-4">
                                {`Christianna loves supplementing her diet with Nutriburst vitamin gummies. She appreciates the high-quality ingredients and the brand's commitment to rigorous standards like Informed-Sport certification. Nutriburst gummies are vegan, sugar-free, easy to take, and easy to love. Christianna particularly enjoys the vitamins for her kids, ensuring their nutritional needs are met with trusted, delicious supplements.`}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default QuoteSection;
