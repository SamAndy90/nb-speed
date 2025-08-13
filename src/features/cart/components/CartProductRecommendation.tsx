'use client';
import { getProductRecommendationsAction } from '../actions';
import { useQuery } from '@tanstack/react-query';
import { getFragmentData } from '@/gql/storefront';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { CartItemImage } from './CartItemImage';
import { currencyFormatter } from '@/lib/utils';
import { InnerAddToCartButton } from './AddToCart';
import Link from 'next/link';
import { useCart } from '../context/cart';

/**
 * Displays a recommended product in the cart.
 */
export function CartProductRecommendation({
    productId,
}: {
    productId: string;
}) {
    const { setIsOpen } = useCart();
    // Given a product, gets the first recommendation
    const { data, isSuccess } = useQuery({
        queryKey: ['productRecommendations', productId],
        queryFn: async () => {
            const res = await getProductRecommendationsAction(productId);
            if (res.success) return res.data ?? [];
            throw res.error;
        },
    });
    if (!isSuccess) return null;
    const recommendation = data[0];
    const image = getFragmentData(imageFragment, recommendation.featuredImage);
    const formattedPrice = currencyFormatter.format(
        recommendation.priceRange.minVariantPrice.amount
    );

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex w-full flex-col gap-8 py-8">
            <p>
                Customers who bought <br /> this item also bought
            </p>
            <div className="relative flex h-20 w-full items-center justify-center gap-1">
                {image && <CartItemImage image={image} />}
                <div className="flex-1 space-y-1">
                    <Link
                        href={`/products/${recommendation.handle}`}
                        onClick={handleLinkClick}
                        className="hover:underline">
                        <div className="text-sm sm:text-base">
                            {recommendation.title}
                        </div>
                    </Link>

                    <div className="text-sm font-semibold">
                        {formattedPrice}
                    </div>
                </div>
                <div>
                    {/* <AddToCartButton
                        product={recommendation}
                        variant="dark"
                        size="sm"
                        className="rounded-full"
                    /> */}
                    <InnerAddToCartButton
                        product={recommendation}
                        variant="dark"
                        size="sm"
                        className="rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}
