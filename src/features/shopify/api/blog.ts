import { ensureStartsWith } from '@/lib/utils';
import { getArticleWithMetafieldsQuery } from '../graphql/admin/queries/article';
import {
    getArticleByIdQuery,
    getBlogsQuery,
} from '../graphql/storefront/queries/blog';

import { shopifyFetch } from './fetch';

export async function getBlogs(first: number) {
    const { status, body } = await shopifyFetch({
        query: getBlogsQuery,
        variables: { first },
    });

    return body.blogs.edges;
}

export async function getArticleById(id: string) {
    const { status, body } = await shopifyFetch({
        query: getArticleByIdQuery,
        variables: { id: `gid://shopify/Article/${id}` },
    });

    return body.article;
}

export async function getArticleWithMetafields(articleHandle: string) {
    try {

        const domain = process.env.SHOPIFY_STORE_DOMAIN
            ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
            : '';

        const { status, body } = await shopifyFetch({
            query: getArticleWithMetafieldsQuery as any,
            variables: { handle: "handle:" + articleHandle },
            endpoint: `${domain}/admin/api/2025-04/graphql.json`,
            admin: true,
            cache: 'no-cache',
            log: true,
        });

        // ✅ Fixed: Check the correct response path
        const articles = (body as any)?.articles?.edges;
        if (!articles || articles.length === 0) {
            console.log('No article found for articleHandle:', articleHandle);
            return { success: false, data: null };
        }

        // ✅ Fixed: Get article from articles.edges[0].node
        const articleNode = articles[0].node;
        const article = {
            ...articleNode,
            metafields:
                articleNode.metafields?.edges?.map((edge: any) => edge.node) ||
                [],
        };

        console.log(
            'Processed article with metafields:',
            JSON.stringify(article, null, 2)
        );
        return { success: true, data: article };
    } catch (error) {
        console.error('Error fetching article with metafields:', error);
        return { success: false, data: null };
    }
}
