import { graphql } from '@/gql/storefront';

export const imageFragment = graphql(`
    fragment Image on Image {
        url
        altText
        width
        height
    }
`);
