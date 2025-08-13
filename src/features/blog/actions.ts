import { getFragmentData } from '@/gql/storefront';
import { getArticleById, getArticleWithMetafields, getBlogs } from '../shopify/api/blog';
import {
    articleFragment,
    blogFragment,
} from '../shopify/graphql/storefront/fragments/blog';
import { parseArticle, parseBlog } from './utils/utils';

export async function getBlogsAction(first: number) {
    try {
        const res = await getBlogs(first);
        return {
            success: true,
            data: res.map((e) =>
                parseBlog(getFragmentData(blogFragment, e.node))
            ),
        };
    } catch (e) {
        console.error('Failed to fetch blogs:', e);
        return { success: false, error: e as string };
    }
}

export async function getArticleByIdAction(id: string) {
    try {
        const res = await getArticleById(id);
        if (!res) return { success: false, error: 'No response received' };

        return {
            success: true,
            data: parseArticle(getFragmentData(articleFragment, res)),
        };
    } catch (e) {
        console.error('Failed to fetch blogs:', e);
        return { success: false, error: e as string };
    }
}

export const getArticleWithMetafieldsAction = async (articleHandle: string) => {
    try {

      const response = await getArticleWithMetafields(articleHandle);

      if (!response.data) {
        return { success: false, data: null };
      }
  
      const article = {
        ...response.data,
        metafields: response.data.metafields.map((edge: any) => edge)
      };

      return { success: true, data: article };
    } catch (error) {
      console.error('Error fetching article with metafields:', error);
      return { success: false, data: null };
    }
  };

