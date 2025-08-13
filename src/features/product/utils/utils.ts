import { ProductFragment } from '@/gql/storefront/graphql';
import { Product, ProductBenefitSchema } from '../types';

export function parseProduct(productFragment: ProductFragment): Product {
    const benefitsObject = JSON.parse(productFragment.benefits?.value ?? '[]');

    return {
        ...productFragment,
        benefits: ProductBenefitSchema.parse(benefitsObject),
        details: JSON.parse(productFragment.details?.value ?? '{}'),
        variants: productFragment.variants.edges.map((edge) => edge.node),
        images: productFragment.images.edges.map((edge) => edge.node),
        media: productFragment.media.edges.map((edge) => edge.node),
    };
}

export function getFirstSubscriptionPlan(product: Product) {
    return product.sellingPlanGroups.nodes
        .map((plan) => plan.sellingPlans.edges[0]?.node)
        .filter((plan) => Boolean(plan))
        .sort((a, b) => a.name.localeCompare(b.name))[0];
}

export function getDiscountPercentage(product: Product) {
    // Get discount percentage from the first price adjustment if available
    const subscriptionPlan = getFirstSubscriptionPlan(product);
    const hasSubscription = Boolean(subscriptionPlan);
    const discountPercentage =
        hasSubscription &&
        subscriptionPlan.priceAdjustments?.length > 0 &&
        subscriptionPlan.priceAdjustments[0]?.adjustmentValue?.__typename ===
            'SellingPlanPercentagePriceAdjustment'
            ? subscriptionPlan.priceAdjustments[0].adjustmentValue
                  .adjustmentPercentage
            : 0;
    return discountPercentage;
}
