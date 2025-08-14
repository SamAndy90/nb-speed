import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import React from 'react';

const QualificationCard = ({
    className = '',
    badge,
    name,
    description,
}: {
    name: string;
    description: string;
    className?: string;
    badge: ImageProps['src'];
}) => {
    return (
        <div
            className={cn(
                'flex min-w-[302px] flex-col items-center gap-8 rounded-[0.625rem] px-5 py-10 text-center shadow-soft md:min-w-[345px] bg-primary-white min-h-[375px]',
                className
            )}>
            <picture>
                <Image
                    src={badge}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={name}
                    className="h-[123px] w-auto"
                />
            </picture>

            <div className="flex flex-col gap-4">
                <div className="text-paragraph-2 font-bold md:text-paragraph-1">
                    {name}
                </div>

                <p className="text-paragraph-4 md:text-paragraph-3">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default QualificationCard;
