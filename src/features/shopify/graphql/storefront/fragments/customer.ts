import { graphql } from '@/gql/storefront';

export const customerFragment = graphql(`
    fragment Customer on Customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
    }
`);
