import { ArticleFragment, BlogFragment } from '@/gql/storefront/graphql';

export function parseBlog(blogFragment: BlogFragment) {
    return {
        ...blogFragment,
        articles: blogFragment.articles.edges.map((edge) => ({
            ...edge.node,
            image: edge.node.image
                ? {
                      url: edge.node.image.url,
                      altText: edge.node.image.altText ?? null,
                  }
                : null,
            author: edge.node.author
                ? {
                      __typename: 'ArticleAuthor' as const,
                      name: edge.node.author.name,
                  }
                : { __typename: 'ArticleAuthor' as const, name: 'Unknown' },
            tags: edge.node.tags ?? [],
        })),
    };
}

export function parseArticle(articleFragment: ArticleFragment) {
    return {
        ...articleFragment,
        image: articleFragment.image
            ? {
                  url: articleFragment.image.url,
                  altText: articleFragment.image.altText ?? null,
              }
            : null,
        author: articleFragment.author
            ? {
                  __typename: 'ArticleAuthor' as const,
                  name: articleFragment.author.name,
              }
            : { __typename: 'ArticleAuthor' as const, name: 'Unknown' },
        tags: articleFragment.tags ?? [],
    };
}

export function extractProductHandles(contentHTML: any) {
    // Updated regex pattern to match the template tag more flexibly
    const regex = /\{\{\s*\[([^\]]+)\]\s*\}\}/;
    const match = contentHTML.match(regex);

    if (match && match[1]) {
        // Split the matched handles by comma, trim whitespace, and remove any quotes around handles
        const handles = match[1]
            .split(',')
            .map((handle: string) => handle.trim().replace(/["']/g, '')); // Remove quotes if present
        // Limit to the first 3 handles if more than 3 are found
        return handles;
    }
    return [];
}

export function removeProductTemplateTag(contentHTML: any) {
    // Define the regex pattern to match the {{[...]}} structure
    const regex = /\{\{\s*\[([^\]]+)\]\s*\}\}/;

    // Use replace to remove the matched pattern from the content
    const cleanedContent = contentHTML.replace(regex, '');
    return cleanedContent;
}
