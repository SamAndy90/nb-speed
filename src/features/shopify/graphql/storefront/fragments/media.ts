import { graphql } from '@/gql/storefront';

export const mediaFragment = graphql(`
    fragment Media on Media {
        id
        alt
        previewImage {
            ...Image
        }
        mediaContentType
        presentation {
            id
            asJson(format: IMAGE)
        }       
    }
`);
