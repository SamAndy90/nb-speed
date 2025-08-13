import { graphql } from '@/gql/storefront';

export const moneyFragment = graphql(`
    fragment Money on MoneyV2 {
        amount
        currencyCode
    }
`);
