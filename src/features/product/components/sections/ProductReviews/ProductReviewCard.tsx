import { StarRating, Stars } from '@/components/Ratings';
import { ProductReview } from '@/features/product/types';
import { Review } from '@/lib/reviews/types';

export function ProductReviewCard({ review }: { review: Review }) {
    return (
        <li className="flex w-full flex-col gap-2 pb-6 md:pb-10">
            <StarRating score={review.rating}>
                <Stars />
            </StarRating>
            <div className="mb-2 text-sm font-bold">
                {review.reviewer.first_name}{' '}
                {review.reviewer.last_name.slice(0, 1)}.
            </div>
            <p className="">{review.review}</p>
        </li>
    );
}
