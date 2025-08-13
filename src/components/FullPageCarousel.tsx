import { ComponentProps } from 'react';
import { CarouselPrevious, CarouselNext } from './ui/carousel';
import { cn } from '@/lib/utils';
export function FullPageCarouselControls({
    className,
    ...props
}: ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'absolute -top-20 right-page-desktop hidden space-x-3 md:block',
                className
            )}
            {...props}>
            <CarouselPrevious className="static bg-gradient-2" />
            <CarouselNext className="static bg-gradient-2" />
        </div>
    );
}
