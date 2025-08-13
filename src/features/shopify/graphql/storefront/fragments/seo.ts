import { graphql } from '@/gql/storefront';

export const seoFragment = graphql(`
    fragment Seo on SEO {
        description
        title
    }
`);
