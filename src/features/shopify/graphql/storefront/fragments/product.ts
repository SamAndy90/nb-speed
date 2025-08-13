import { graphql } from '@/gql/storefront';

export const productFragment = graphql(`
    fragment Product on Product {
        id
        handle
        availableForSale
        title
        description
        descriptionHtml
        priceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
        collections(first: 10) {
            nodes {
                handle
                title
                image {
                    ...Image
                }
            }
        }
        selectedOrFirstAvailableVariant {
            sku
        }
        shortDescription: metafield(
            namespace: "product"
            key: "short_description"
        ) {
            value
        }
        benefits: metafield(namespace: "product", key: "benefits") {
            value
        }
        details: metafield(namespace: "product", key: "details") {
            value
        }

        variants(first: 250) {
            edges {
                node {
                    id
                    title
                    availableForSale
                    selectedOptions {
                        name
                        value
                    }
                    price {
                        amount
                        currencyCode
                    }
                    variant_image_6: metafield(
                        namespace: "custom"
                        key: "variant_image_6"
                    ) {
                        reference {
                            __typename
                            ... on MediaImage {
                                image {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                    variant_image: metafield(
                        namespace: "custom"
                        key: "variant_image"
                    ) {
                        reference {
                            __typename
                            ... on MediaImage {
                                image {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                    pain_image: metafield(
                        namespace: "custom"
                        key: "pain_image"
                    ) {
                        reference {
                            __typename
                            ... on MediaImage {
                                image {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                    ingredients_image: metafield(
                        namespace: "custom"
                        key: "ingredients_image"
                    ) {
                        reference {
                            __typename
                            ... on MediaImage {
                                image {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                    comparison_image: metafield(
                        namespace: "custom"
                        key: "comparison_image"
                    ) {
                        reference {
                            __typename
                            ... on MediaImage {
                                image {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                    faq_image: metafield(
                        namespace: "custom"
                        key: "faq_image"
                    ) {
                        reference {
                            __typename
                            ... on MediaImage {
                                image {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                    product_type: metafield(
                        namespace: "custom"
                        key: "product_type"
                    ) {
                        value
                    }
                    light_bg_color: metafield(
                        namespace: "custom"
                        key: "light_bg_color"
                    ) {
                        value
                    }
                    ingredients: metafield(
                        namespace: "custom"
                        key: "ingredients"
                    ) {
                        value
                    }
                    details: metafield(namespace: "custom", key: "details") {
                        value
                    }
                    nutrition_information: metafield(
                        namespace: "custom"
                        key: "nutrition_information"
                    ) {
                        value
                    }
                    unique_input_id: metafield(
                        namespace: "custom"
                        key: "unique_input_id"
                    ) {
                        value
                    }
                    variant_color: metafield(
                        namespace: "custom"
                        key: "variant_color"
                    ) {
                        value
                    }
                    subscription_info_meta: metafield(
                        namespace: "custom"
                        key: "subscription_info_meta"
                    ) {
                        value
                    }
                }
            }
        }
        featuredImage {
            ...Image
        }
        images(first: 20) {
            edges {
                node {
                    ...Image
                }
            }
        }
        media(first: 20) {
            edges {
                node {
                    ...Media
                }
            }
        }
        tags
        updatedAt
        seo {
            ...Seo
        }
        sellingPlanGroups(first: 10) {
            nodes {
                sellingPlans(first: 10) {
                    edges {
                        node {
                            id
                            name
                            description
                            recurringDeliveries
                            priceAdjustments {
                                adjustmentValue {
                                    ... on SellingPlanFixedPriceAdjustment {
                                        __typename
                                        price {
                                            amount
                                            currencyCode
                                        }
                                    }
                                    ... on SellingPlanPercentagePriceAdjustment {
                                        __typename
                                        adjustmentPercentage
                                    }
                                    ... on SellingPlanFixedAmountPriceAdjustment {
                                        __typename
                                        adjustmentAmount {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                            deliveryPolicy {
                                ... on SellingPlanRecurringDeliveryPolicy {
                                    __typename
                                    interval
                                    intervalCount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
