'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PropsWithChildren, ReactNode } from 'react';
import Marquee from 'react-fast-marquee';

export function HeroMarquee({
    children,
    gradient = true,
}: {
    children?: ReactNode;
    gradient?: boolean;
}) {
    return (
        <Marquee
            className="relative flex gap-6 md:gap-20 [&>.rfm-marquee]:gap-6 md:[&>.rfm-marquee]:gap-20 [&_.rfm-initial-child-container]:gap-6 md:[&_.rfm-initial-child-container]:gap-20"
            pauseOnClick
            gradient={gradient}
            gradientColor={gradient ? '#FCFCFA' : 'transparent'}>
            {children}
        </Marquee>
    );
}

export function FindUsInMarquee({ children }: PropsWithChildren) {
    const desktop = useMediaQuery('md');
    if (desktop)
        return (
            <div className="relative flex w-full grid-cols-5 justify-center gap-5 grayscale md:justify-between md:gap-6 [&>img]:h-10 [&>img]:w-auto [&>img]:object-contain md:[&>img]:h-20">
                {children}
            </div>
        );

    return (
        <Marquee
            className="relative flex gap-6 overflow-y-clip md:hidden md:gap-20 [&>.rfm-marquee]:gap-6 md:[&>.rfm-marquee]:gap-20 [&_.rfm-initial-child-container]:gap-6 md:[&_.rfm-initial-child-container]:gap-20"
            pauseOnClick
            gradient
            gradientWidth={'100px'}
            gradientColor="#FCFCFA">
            {children}
        </Marquee>
    );
}
