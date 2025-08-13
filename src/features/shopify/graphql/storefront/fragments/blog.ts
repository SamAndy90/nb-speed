import { graphql } from '@/gql/storefront';

export const blogFragment = graphql(`
    fragment Blog on Blog {
        title
        handle
        articles(first: 100) {
            edges {
                node {
                    id
                    handle
                    title
                    contentHtml
                    publishedAt
                    tags
                    author {
                        name
                    }
                    image {
                        url
                        altText
                    }
                }
            }
        }
    }
`);

export const articleFragment = graphql(`
    fragment Article on Article {
        id
        title
        handle
        contentHtml
        publishedAt
        tags
        author {
            name
        }
        image {
            url
            altText
        }
    }
`);
