import { graphql } from '@/gql/admin';

/*
Order status is made of orders, fulfilments and fulfilment orders

The FulfillmentOrder object represents either an item or a group of items in an Order that are expected to be fulfilled from the same location. 
There can be more than one fulfillment order for an order at a given location.
*/
export const orderFragment = graphql(`
    fragment Order on Order {
        id
        name
        processedAt
        displayFulfillmentStatus
        fulfillments(first: 100) {
            displayStatus
            status
            estimatedDeliveryAt
            deliveredAt
        }
        currentTotalPriceSet {
            presentmentMoney {
                amount
                currencyCode
            }
        }
        displayFinancialStatus
        displayFulfillmentStatus
        lineItems(first: 10) {
            edges {
                node {
                    id
                    image {
                        ...Image
                    }
                    product {
                        variants(first: 100) {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                    quantity
                }
            }
        }
        shippingAddress {
            formatted(withName: true)
        }
        tags
        transactions(first: 10) {
            status
            paymentDetails {
                ... on CardPaymentDetails {
                    paymentMethodName
                }
                ... on ShopPayInstallmentsPaymentDetails {
                    paymentMethodName
                }
            }
            paymentIcon {
                altText
                width
                height
                id
                url
            }
        }
    }
`);
