import { getCollectionProductsByHandle } from '@/features/shopify/api/collection';
import { getFragmentData } from '@/gql/storefront';
import { productFragment } from '@/features/shopify/graphql/storefront/fragments/product';
import { parseProduct } from '@/features/product/utils';
import { Product } from '@/features/product/types';
import reviewsService from '@/lib/reviews/reviews-service';
import AllergyDiscount from './page.client';
import { ProductWithRatingsAndReviewCount } from './page.client';

export default async function AllergyPage() {
    const allergyCollection = await getCollectionProductsByHandle('allergy');

    const products: Product[] = allergyCollection?.edges
        ? allergyCollection.edges.map((edge) =>
              parseProduct(getFragmentData(productFragment, edge.node))
          )
        : [];

    const skus = products
        .map((product) => product.selectedOrFirstAvailableVariant?.sku)
        .join(';');

    const productRatings =
        await reviewsService.retrieveProductRatingBatch(skus);

    const getRating = (sku: string | null | undefined) => {
        if (!sku || !productRatings) return 0;
        const rating = productRatings.find((r) => r.sku === sku);
        return Number(rating?.average_rating || 0);
    };

    const getReviewCount = (sku: string | null | undefined) => {
        if (!sku || !productRatings) return 0;
        const rating = productRatings.find((r) => r.sku === sku);
        return rating?.num_ratings || 0;
    };

    const productsWithRatingsAndReviewCount: ProductWithRatingsAndReviewCount[] =
        products.map((product) => {
            const sku = product.selectedOrFirstAvailableVariant?.sku;
            return {
                ...product,
                rating: getRating(sku),
                reviewCount: getReviewCount(sku),
            };
        });

    return <AllergyDiscount products={productsWithRatingsAndReviewCount} />;
}
