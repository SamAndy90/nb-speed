import HelpHero from '@/features/help-me-choose/hero';
import Quiz from '@/features/help-me-choose/quiz';
import { getProducts } from '@/features/shopify/api/product';
import reviewsService from '@/lib/reviews/reviews-service';
import { Product } from '@/features/product/types';

export default async function HelpMeChoosePage() {
    const products: Product[] = await getProducts();

    const skus = products
        .map((product) => product.selectedOrFirstAvailableVariant?.sku)
        .filter((item) => Boolean(item))
        .join(';');

    const productRatingBatch =
        await reviewsService.retrieveProductRatingBatch(skus);

    return (
        <main className={'w-full'}>
            <HelpHero />
            <Quiz data={products} ratings={productRatingBatch || []} />
        </main>
    );
}
