'use client';

import { ProductReviewCard } from './ProductReviewCard';
import { Separator } from '@/components/ui/separator';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import Container from '@/components/container';
import { ProductReviewsResponse } from '@/lib/reviews/types';
import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useVariantProduct } from '@/features/product/VariantProductProvider';
import { StarRating, Stars } from '@/components/Ratings';

export function ProductReviews({ review }: { review: ProductReviewsResponse }) {
    const [show, setShow] = useState(false);
    const firstReviews = review.reviews.data.slice(0, 3);

    const pathname = usePathname();
    const isHydrationProduct = pathname.includes('hydration');

    const { variantDetails } = useVariantProduct();
    const variantReviews = variantDetails.reviews ?? [];

    return (
        <section id="reviews" className="w-full pb-[50px] lg:pb-[120px]">
            <Container className="space-y-8">
                <h2>
                    <b>Product</b> Reviews
                </h2>
                <div>
                    <ul>
                        {!isHydrationProduct &&
                            (show ? review.reviews.data : firstReviews).map(
                                (r, i, arr) => (
                                    <Fragment key={r.product_review_id}>
                                        <ProductReviewCard
                                            review={r}
                                            key={`ProductReviewCard-${i}`}
                                        />
                                        {i !== arr.length - 1 && (
                                            <Separator className="mb-6 md:mb-10" />
                                        )}
                                    </Fragment>
                                )
                            )}
                        {isHydrationProduct &&
                            (show
                                ? variantReviews
                                : variantReviews.slice(0, 3)
                            ).map((r, i, arr) => (
                                <Fragment key={`${r.reviewer}+${i}`}>
                                    <li className="flex w-full flex-col gap-2 pb-6 md:pb-10">
                                        <StarRating score={5}>
                                            <Stars />
                                        </StarRating>
                                        <div className="mb-2 text-sm font-bold">
                                            {r.reviewer}
                                        </div>
                                        <p>{r.review}</p>
                                    </li>
                                    {i !== arr.length - 1 && (
                                        <Separator className="mb-6 md:mb-10" />
                                    )}
                                </Fragment>
                            ))}
                    </ul>

                    <button
                        onClick={() => setShow(true)}
                        className="flex w-fit items-center justify-center gap-1 self-start text-base font-bold hover:underline">
                        See all{' '}
                        {isHydrationProduct
                            ? variantReviews.length
                            : review.stats.count}{' '}
                        reviews <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </Container>
        </section>
    );
}
