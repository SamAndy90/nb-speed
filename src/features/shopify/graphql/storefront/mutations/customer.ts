import { graphql } from '@/gql/storefront';

export const customerAccessTokenCreateMutation = graphql(`
    mutation customerAccessTokenCreate($email: String!, $password: String!) {
        customerAccessTokenCreate(
            input: { email: $email, password: $password }
        ) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                field
                message
                code
            }
        }
    }
`);

export const customerCreateMutation = graphql(`
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer {
                ...Customer
            }
            customerUserErrors {
                field
                message
                code
            }
        }
    }
`);

export const customerAccessTokenRenewMutation = graphql(`
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
        customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            userErrors {
                field
                message
            }
        }
    }
`);

export const customerAccessTokenDeleteMutation = graphql(`
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
            deletedCustomerAccessTokenId
            userErrors {
                field
                message
            }
        }
    }
`);

export const customerRecoverMutation = graphql(`
    mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`);

export const customerResetMutation = graphql(`
    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
        customerReset(id: $id, input: $input) {
            customer {
                ...Customer
            }
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`);

export const customerResetByUrlMutation = graphql(`
    mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
        customerResetByUrl(password: $password, resetUrl: $resetUrl) {
            customer {
                firstName
                lastName
                email
                phone
                acceptsMarketing
            }
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`);

export const customerUpdateMutation = graphql(`
    mutation customerUpdate(
        $customer: CustomerUpdateInput!
        $customerAccessToken: String!
    ) {
        customerUpdate(
            customer: $customer
            customerAccessToken: $customerAccessToken
        ) {
            customer {
                ...Customer
            }
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`);
export const customerAddressUpdate = graphql(`
    mutation customerAddressUpdate(
        $address: MailingAddressInput!
        $customerAccessToken: String!
        $id: ID!
    ) {
        customerAddressUpdate(
            address: $address
            customerAccessToken: $customerAccessToken
            id: $id
        ) {
            customerAddress {
                ...MailingAddress
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`);
export const customerAddressCreate = graphql(`
    mutation customerAddressCreate(
        $address: MailingAddressInput!
        $customerAccessToken: String!
    ) {
        customerAddressCreate(
            address: $address
            customerAccessToken: $customerAccessToken
        ) {
            customerAddress {
                ...MailingAddress
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`);
export const customerDefaultAddressUpdate = graphql(`
    mutation customerDefaultAddressUpdate(
        $addressId: ID!
        $customerAccessToken: String!
    ) {
        customerDefaultAddressUpdate(
            addressId: $addressId
            customerAccessToken: $customerAccessToken
        ) {
            customer {
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

            customerUserErrors {
                code
                field
                message
            }
        }
    }
`);

export const customerAddressDelete = graphql(`
    mutation customerAddressDelete(
        $customerAccessToken: String!
        $addressId: ID!
    ) {
        customerAddressDelete(
            customerAccessToken: $customerAccessToken
            id: $addressId
        ) {
            customerUserErrors {
                code
                field
                message
            }
            deletedCustomerAddressId
        }
    }
`);
