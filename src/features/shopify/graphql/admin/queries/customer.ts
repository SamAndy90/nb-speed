import { graphql } from '@/gql/admin';

export const customersQuery = graphql(`
    query getCustomers {
        customers(first: 10) {
            edges {
                node {
                    id
                }
            }
        }
    }
`);
