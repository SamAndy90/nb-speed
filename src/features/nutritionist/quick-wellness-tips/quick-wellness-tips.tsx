'use client';

import React from 'react';
import { TIPS } from '../consts';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const QuickWellnessTips = () => {
    return (
        <section>
            <Marquee speed={50}>
                <div className="flex">
                    {[...TIPS, ...TIPS, ...TIPS].map((image, index) => (
                        <picture
                            key={`nutritionist-${index}`}
                            className="mx-1.5 md:mx-[14px]">
                            <Image
                                src={image}
                                alt={`top-${index}`}
                                width={0}
                                height={0}
                                className="h-[131px] w-[117px] rounded-[10px] object-cover md:h-[300px] md:w-[266px]"
                            />
                        </picture>
                    ))}
                </div>
            </Marquee>
        </section>
    );
};

export default QuickWellnessTips;
