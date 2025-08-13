import { graphql } from '@/gql/admin/gql';

export const customerOrdersQuery = graphql(`
    query getCustomerOrders($customerId: ID!) {
        customer(id: $customerId) {
            orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
                edges {
                    node {
                        ...Order
                    }
                }
            }
        }
    }
`);

export const orderQuery = graphql(`
    query getOrder($orderId: ID!) {
        order(id: $orderId) {
            ...Order
        }
    }
`);