import Image, { ImageProps } from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';
import Check from '@/assets/icons/check.svg';

const MaryBadge = ({
    className,
    image,
    fullName,
    position,
}: {
    className?: string;
    image: ImageProps['src'];
    fullName: string;
    position: string;
}) => {
    return (
        <div
            className={cn(
                'flex items-center gap-2.5 rounded-full bg-white/70 p-2 pr-5 drop-shadow-hero-badge backdrop-blur-[29.1]',
                className
            )}>
            <div className="border-grad-2 relative inline-block aspect-[1] h-auto w-[47px] rounded-full bg-white lg:w-[64px]">
                <Image
                    src={image}
                    alt={fullName}
                    className="h-full w-full rounded-full object-cover"
                />

                <div className="absolute -right-1 -top-1 size-[17.4px] rounded-full bg-gradient-2 p-1 md:size-6 md:p-1.5">
                    <Check className="size-full text-success-600" />
                </div>
            </div>
            <div className="flex flex-col gap-1 lg:gap-0">
                <div className="text-paragraph-5 font-bold lg:text-paragraph-3 lg:font-bold">
                    {fullName}
                </div>
                <div className="text-paragraph-5 font-normal lg:text-paragraph-3 lg:font-normal">
                    {position}
                </div>
            </div>
        </div>
    );
};

export default MaryBadge;
