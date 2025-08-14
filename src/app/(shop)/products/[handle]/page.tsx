import { notFound } from 'next/navigation';

import { TrustedByExperts } from '@/features/product/components/sections/TrustedByExperts/TrustedByExperts';

import { YouMayAlsoLike } from '@/features/product/components/sections/YouMayAlsoLike';
import { getProductRecommendationsAction } from '@/features/cart/actions';
import { ProductReviews } from '@/features/product/components/sections/ProductReviews';
import { GotQuestions } from '@/features/product/components/sections/GotQuestions';
import { PlantBased } from '@/features/product/components/sections/PlantBased';
import { WhyWaste } from '@/features/product/components/sections/WhyWaste';
import { ProductInfo } from '@/features/product/components/sections/ProductInfo/ProductInfo';
import { YourBody } from '@/features/product/components/sections/YourBody';
import { getProductByHandle } from '@/features/shopify/api/product';
import { MeetOurNutritionist } from '@/features/landing/components/sections/MeetOurNutritionist';
import { GradientBackground } from '@/features/landing/components/GradientBackground';
import dynamic from 'next/dynamic';
import reviewsService from '@/lib/reviews/reviews-service';
import { VariantProductProvider } from '@/features/product/VariantProductProvider';

const Qualifications = dynamic(
    () => import('@/features/about-us/qualifications/qualifications'),
    {
        ssr: false,
    }
);

export default async function ProductPage(props: {
    params: Promise<{ handle: string }>;
}) {
    const params = await props.params;
    const product = await getProductByHandle(params.handle, 'no-store');

    if (!product) return notFound();

    const productRecommendations = await getProductRecommendationsAction(
        product.id
    ).then((res) => (res.success ? (res.data ?? []) : []));

    const review = product.selectedOrFirstAvailableVariant?.sku
        ? await reviewsService.getProductReviews(
              product.selectedOrFirstAvailableVariant?.sku,
              1,
              500
          )
        : null;

    const ratings = await reviewsService.retrieveProductRatingBatch(
        productRecommendations
            .map((p) => p.selectedOrFirstAvailableVariant?.sku)
            .join(';')
    );

    return (
        <VariantProductProvider product={product}>
            <div className="mx-auto flex w-full flex-col items-center pt-0 text-sm lg:pt-[90px] lg:text-base">
                <ProductInfo product={product} review={review} />
                {product.details.problemKillerFact && (
                    <YourBody
                        problemKillerFact={product.details.problemKillerFact}
                    />
                )}
                {product.details.solutionToProductSpecific && (
                    <PlantBased
                        solutionToProductSpecific={
                            product.details.solutionToProductSpecific
                        }
                    />
                )}
                {product.details.whySettle && (
                    <WhyWaste data={product.details.whySettle} />
                )}

                <GradientBackground variant="section-3">
                    <Qualifications highlight="text-transparent bg-cooper-text-gradient bg-clip-text" />
                </GradientBackground>

                {product.details.faq && product.details.faq.length > 0 && (
                    <GotQuestions
                        faq={product.details.faq}
                        faqImage={product.details.faqImage}
                    />
                )}

                <GradientBackground>
                    <MeetOurNutritionist />
                </GradientBackground>

                <div className="w-full bg-gradient-to-b from-primary to-theme-50">
                    <TrustedByExperts />
                    {review && <ProductReviews review={review} />}
                </div>
                <YouMayAlsoLike
                    recommendations={productRecommendations}
                    ratings={ratings || []}
                />
            </div>
        </VariantProductProvider>
    );
}
