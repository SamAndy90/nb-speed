import { graphql } from '@/gql/storefront';

export const customerQuery = graphql(`
    query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            acceptsMarketing
            email
            phone
        }
    }
`);

export const customerAddressesQuery = graphql(`
    query getCustomerAddresses($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            defaultAddress {
                ...MailingAddress
            }
            addresses(first: 10) {
                edges {
                    node {
                        ...MailingAddress
                    }
                }
            }
        }
    }
`);
