import { graphql } from '@/gql/storefront';

export const cartFragment = graphql(`
    fragment Cart on Cart {
        id
        checkoutUrl
        cost {
            subtotalAmount {
                amount
                currencyCode
            }
            totalAmount {
                amount
                currencyCode
            }
            totalTaxAmount {
                amount
                currencyCode
            }
        }
        discountAllocations {
            discountedAmount {
                ...Money
            }
            targetType
            ... on CartAutomaticDiscountAllocation {
                title
            }
        }
        discountCodes {
            applicable
            code
        }
        lines(first: 100) {
            edges {
                node {
                    id
                    quantity
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                    }
                    merchandise {
                        ... on ProductVariant {
                            id
                            title
                            selectedOptions {
                                name
                                value
                            }
                            product {
                                ...Product
                            }
                        }
                    }
                    sellingPlanAllocation {
                        sellingPlan {
                            deliveryPolicy {
                                ... on SellingPlanRecurringDeliveryPolicy {
                                    __typename
                                    interval
                                    intervalCount
                                }
                            }
                            description
                            id
                            name
                        }
                    }
                    attributes {
                        key
                        value
                    }
                }
            }
        }
        totalQuantity
    }
`);
