import { HeroMarquee } from '@/features/landing/components/HeroMarquee';
import Image, { ImageProps } from 'next/image';
import React from 'react';
import womensFitness from '@/assets/womens-fitness.webp';
import sheerluxe from '@/assets/sheerluxe.webp';
import lllFabric from '@/assets/lll-fabric.webp';
import theTimes from '@/assets/the-times.webp';
import { cn } from '@/lib/utils';

function HeroBrandImage({
    className,
    ...props
}: ImageProps & { i: number; count: number }) {
    return (
        <div className="relative h-6 md:h-9">
            <Image
                {...props}
                className={cn(
                    'h-full w-auto max-w-full object-contain',
                    className
                )}
            />
        </div>
    );
}

const FeaturedIn = () => {
    return (
        <div className="flex w-full flex-col gap-3 rounded-[0.625rem] bg-white px-4 py-6 shadow-soft lg:gap-5 lg:py-8">
            <div className="text-paragraph-5 font-semibold uppercase lg:text-paragraph-3 lg:font-semibold">
                As seen in
            </div>
            <div className="flex w-full overflow-clip">
                <HeroMarquee gradient={false}>
                    <HeroBrandImage
                        src={womensFitness}
                        alt=""
                        i={0}
                        count={5}
                    />
                    <HeroBrandImage src={sheerluxe} alt="" i={1} count={5} />
                    <HeroBrandImage src={lllFabric} alt="" i={2} count={5} />
                    <HeroBrandImage src={theTimes} alt="" i={3} count={4} />
                </HeroMarquee>
            </div>
        </div>
    );
};

export default FeaturedIn;
