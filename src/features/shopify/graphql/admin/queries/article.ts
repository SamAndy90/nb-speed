// src/features/shopify/graphql/admin/articles.ts
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

export const getArticleWithMetafieldsQuery = `
query getArticleWithMetafields($handle: String!) {
  articles(first: 1, query: $handle) {
    edges {
      node {
        id
        title
        handle
        createdAt
        updatedAt
        publishedAt
        author {
            name
            
        }
        image {
          url
          altText
          width
          height
        }
        metafields(first: 20) {
          edges {                           
            node {
              namespace
              key
              value
              type
              id
              reference {
                ... on MediaImage {
                  id
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
