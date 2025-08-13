import { graphql } from '@/gql/storefront';

export const getMetaobject = graphql(`
    query getMetaobject($handle: MetaobjectHandleInput!) {
        metaobject(handle: $handle) {
            handle
            fields {
                key
                type
                value
            }
        }
    }
`);

