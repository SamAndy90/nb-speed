// src/features/shopify/graphql/storefront/articles.ts
import { graphql } from '@/gql/storefront';

export const getBlogsQuery = graphql(`
    query getBlogs($first: Int = 5) {
        blogs(first: $first) {
            edges {
                node {
                    ...Blog
                }
            }
        }
    }
`);

export const getArticleByIdQuery = graphql(`
    query getArticleByBlogHandleAndArticleId($id: ID!) {
        article(id: $id) {
            ...Article
        }
    }
`);