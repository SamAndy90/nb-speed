import { cn } from '@/lib/utils';
import React from 'react';
import handImage from '@/assets/nutriburst-hand-3.webp';
import Image from 'next/image';

const DrinkDailyVits = ({ className = '' }: { className?: string }) => {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-[20px] bg-[#FD6982] pl-5 pt-10 text-primary-white lg:pl-[40px] lg:pt-[60px]',
                className
            )}>
            <div className="relative z-[1]">
                <h3>
                    Or drink your daily <br /> Vits the easy way
                </h3>
                <p className="mt-[15px] text-paragraph-4 lg:max-w-[368px] lg:text-paragraph-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
            </div>

            <Image
                src={handImage}
                alt="handImage"
                sizes="100vw"
                width={0}
                height={0}
                className="absolute bottom-[-50px] right-[-10px] h-auto w-full max-w-[310px] rotate-[12.71deg] lg:bottom-[-80px] lg:right-[-130px] lg:max-w-full"
            />
        </div>
    );
};

export default DrinkDailyVits;
