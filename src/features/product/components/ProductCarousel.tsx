'use client';
import {
    CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import { ImageFragment } from '@/gql/storefront/graphql';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ProductCarouselProps = { images: ImageFragment[] };

export function ProductCarousel({ images }: ProductCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const onSlideChange = useCallback((api: any) => {
        const current = api?.selectedScrollSnap();
        setCurrent(current);
    }, []);

    useEffect(() => {
        api?.on('select', onSlideChange);
        return () => {
            api?.off('select', onSlideChange);
        };
    }, [api]);
    return (
        <div className="space-y-4 md:space-y-11">
            <Carousel
                className="w-full max-w-xl"
                opts={{ loop: true }}
                setApi={setApi}>
                <CarouselContent>
                    {images.map((image, i) => (
                        <CarouselItem key={`CarouselItem-product-image-${i}`}>
                            <div className="relative aspect-square w-full overflow-clip">
                                <Image
                                    src={image.url}
                                    alt={image.altText ?? ''}
                                    className="rounded-md object-cover"
                                    fill
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious
                    className={
                        'z-0 ml-[-65px] size-[34px] bg-gradient-2 p-0 disabled:opacity-50 max-md:hidden'
                    }
                    variant={'secondary'}
                    inner
                />
                <CarouselNext
                    className={
                        'z-0 mr-[-65px] size-[34px] bg-gradient-2 p-0 disabled:opacity-50 max-md:hidden'
                    }
                    variant={'secondary'}
                    inner
                />
            </Carousel>
            <div className="flex w-full flex-row justify-center gap-2.5 md:justify-start md:gap-3">
                {images.map((image, i) => (
                    <Button
                        className={cn(
                            'relative aspect-square size-1.5 max-w-24 overflow-clip rounded-xxs bg-theme-400 px-0 py-0 transition-all md:h-auto md:w-full',
                            current === i &&
                                'border-neutral-200 bg-primary-foreground md:border md:bg-none'
                        )}
                        key={image.url}
                        variant="ghost"
                        onClick={() => api?.scrollTo(i)}>
                        <Image
                            src={image.url}
                            alt={image.altText ?? ''}
                            className="hidden size-full rounded-xxs object-cover md:block"
                            fill
                        />
                    </Button>
                ))}
            </div>
        </div>
    );
}
