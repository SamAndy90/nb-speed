import Image from 'next/image';
import React from 'react';
import gum from '@/assets/gum.webp';
import { ARROWS } from '../consts';
import { cn } from '@/lib/utils';

const EasyToChew = () => {
    return (
        <div className="z-[1] flex flex-1 items-center justify-center">
            <Image
                src={gum}
                width={0}
                height={0}
                sizes="100vw"
                alt="gum"
                className="h-auto w-[150px] lg:w-[255px]"
            />
            <div className="absolute aspect-[1] w-[260px] lg:w-[380px]">
                {ARROWS.map((arrow, index) => {
                    const Icon = arrow.arrowIcon;

                    return (
                        <div
                            key={`arrow-${index}`}
                            className={cn(
                                'absolute flex items-center',
                                arrow.className
                            )}>
                            <Icon className="scale-75 lg:scale-100" />
                            <div
                                className={cn(
                                    'absolute whitespace-nowrap text-[9.5px] lg:text-paragraph-3 lg:font-bold',
                                    arrow.textClassName
                                )}>
                                Easy to chew
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EasyToChew;
