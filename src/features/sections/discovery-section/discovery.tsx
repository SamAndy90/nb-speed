import React from 'react';
import Image, { ImageProps } from 'next/image';
import { PrimaryButton } from '@/components/PrimaryButton';
import Container from '@/components/container';
import Link from 'next/link';

type DiscoverSectionProps = {
    title: string;
    highlightedText: string;
    highlightColor?: string; // e.g., 'text-accent-pink', 'text-accent-orange'
    description: string;
    buttonText: string;
    buttonLink?: string;
    imageSrc: ImageProps['src'];
    imageAlt?: string;
    className?: string;
};

const DiscoverSection = ({
    title,
    highlightedText,
    highlightColor = 'text-accent-pink',
    description,
    buttonText,
    buttonLink = '#',
    imageSrc,
    imageAlt = '',
    className = '',
}: DiscoverSectionProps) => {
    return (
        <section
            className={`relative mb-0 overflow-hidden bg-gradient-section pt-[3.125rem] lg:mb-[7.5rem] lg:pt-0 ${className}`}>
            <Container>
                <div className="flex h-[590px] flex-col lg:h-[675px] lg:flex-row">
                    {/* Content Column */}
                    <div className="flex w-full lg:flex-1 items-center justify-center">
                        <div className="flex w-full max-w-[497px] flex-col items-center gap-4 text-center lg:gap-6">
                            <h2>
                                {title} <br />
                                <span
                                    className={`font-medium ${highlightColor}`}>
                                    {highlightedText}
                                </span>
                            </h2>

                            <p className="text-paragraph-4 lg:text-paragraph-2">
                                {description}
                            </p>

                            <PrimaryButton
                                as="div"
                                align="left"
                                className="mt-4 h-[42px] md:h-auto w-[235px] lg:mt-0">
                                <Link href={buttonLink}>{buttonText}</Link>
                            </PrimaryButton>
                        </div>
                    </div>

                    {/* Mobile Image */}
                    <div className="mb-[-12rem] flex flex-1 lg:mb-0">
                        <Image
                            src={imageSrc}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt={imageAlt}
                            className="absolute bottom-[-15rem] left-[-3.5rem] right-0 mx-auto h-auto min-w-[585px] max-w-[585px] object-contain sm:left-20 lg:hidden"
                        />
                    </div>
                </div>

                {/* Desktop Image */}
                <picture className="absolute left-[25rem] top-[-62px] hidden lg:block">
                    <Image
                        src={imageSrc}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt={imageAlt}
                        className="aspect-[1] min-w-[1185px] max-w-[1185px]"
                    />
                </picture>
            </Container>
        </section>
    );
};

export default DiscoverSection;
