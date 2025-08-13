import Container from '@/components/container';
import React from 'react';
import womensFitness from '@/assets/womens-fitness.webp';
import sheerluxe from '@/assets/sheerluxe.webp';
import lllFabric from '@/assets/lll-fabric.webp';
import theTimes from '@/assets/the-times.webp';
import theTelegraph from '@/assets/the-telegraph.webp';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { HeroMarquee } from '@/features/landing/components/HeroMarquee';

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

const BlogPartnersSection = () => {
    return (
        <section className="w-screen py-10 lg:pb-[3.5625rem] lg:pt-8">
            <Container className="overflow-auto min-[1200px]:overflow-hidden">
                <div className="flex w-full overflow-clip">
                    <HeroMarquee>
                        <HeroBrandImage
                            src={womensFitness}
                            alt=""
                            className="pb-1.5"
                            i={0}
                            count={5}
                        />
                        <HeroBrandImage
                            src={sheerluxe}
                            alt=""
                            className="pb-1.5 pt-1"
                            i={1}
                            count={5}
                        />
                        <HeroBrandImage
                            src={lllFabric}
                            alt=""
                            className="pb-1.5"
                            i={2}
                            count={5}
                        />
                        <HeroBrandImage src={theTimes} alt="" i={3} count={4} />
                        <HeroBrandImage
                            src={theTelegraph}
                            alt=""
                            i={4}
                            count={5}
                        />
                    </HeroMarquee>
                </div>
            </Container>
        </section>
    );
};

export default BlogPartnersSection;
