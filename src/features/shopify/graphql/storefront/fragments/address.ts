import { graphql } from '@/gql/storefront';

export const addressFragment = graphql(`
    fragment MailingAddress on MailingAddress {
        id
        formatted
        firstName
        lastName
        zip
        address1
        city
        country
    }
`);
