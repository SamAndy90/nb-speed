import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PropsWithClassName } from '@/types';
import { PropsWithChildren } from 'react';
import { StarRating } from '@/components/Ratings';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Stars } from '@/components/Ratings';
import { Product } from '@/features/product/types';

function HelpfulReviewCarouselItem({
    children,
    className,
}: PropsWithChildren & PropsWithClassName) {
    return (
        <CarouselItem className="pl-5">
            <div className="size-full px-page-mobile">
                <div className={className}>{children}</div>
            </div>
        </CarouselItem>
    );
}

function HelpfulReview({
    review,
    children,
    as: Comp,
}: {
    review: {
        reviewer: string;
        review: string;
    };
    as: React.ElementType;
} & PropsWithChildren) {
    // const suffix = review.votes === 1 ? 'person' : 'people';

    return (
        <Comp className="space-y-8 rounded-sm bg-primary p-8 pl-5 md:bg-[#F8F0E5]">
            <div className="space-y-2 text-[0.65rem]">
                <StarRating score={5} className="text-xs">
                    <Stars />
                </StarRating>
                <h4 className="font-sans text-base font-bold md:text-lg">
                    {review.reviewer}
                </h4>
            </div>
            <p className="text-sm md:text-base">{children}</p>
            {/* <p className="text-xs font-bold text-muted-foreground md:text-sm md:font-normal">
                {helpfulCount} {suffix} found this helpful
            </p> */}
        </Comp>
    );
}

function MostHelpfulReviews({
    reviews,
}: {
    reviews: Product['details']['reviews'];
}) {
    const desktop = useMediaQuery('md');
    if (!reviews || reviews.length < 1) return null;

    return (
        <section className="-mx-5 flex list-none flex-col gap-8 bg-theme-50 px-5 py-12 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
            <h3 className="px-page-mobile md:px-0">
                <b>Most helpful reviews</b>
            </h3>
            {desktop ? (
                reviews.map((review, i) => (
                    <HelpfulReview
                        key={`HelpfulReview${i}`}
                        review={review}
                        as="li">
                        {review.review}
                    </HelpfulReview>
                ))
            ) : (
                <Carousel className="w-full">
                    <CarouselContent className="-ml-5">
                        {reviews.map((review, i) => (
                            <HelpfulReview
                                key={`HelpfulReview${i}`}
                                review={review}
                                as={HelpfulReviewCarouselItem}>
                                {review.review}
                            </HelpfulReview>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}

            <Button
                asChild
                variant="dark"
                className="mx-page-mobile md:mx-0"
                size="sm"
                sizeDesktop="lg">
                <Link href="#reviews">{`Read more reviews`}</Link>
            </Button>
        </section>
    );
}

export default MostHelpfulReviews;
