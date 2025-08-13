import { BlogFragment, GetBlogsQuery } from '@/gql/storefront/graphql';

export type TBlog = {
    id: string;
    title: string;
    src: string;
    postedAt: string;
    authorSrc: string;
    authorName: string;
    description?: string;
    slug: string;
};

export type Article = BlogFragment['articles']['edges'][number]['node'] & {
    handle?: string;
    blogHandle?: string;
};
export type Blog = Omit<BlogFragment, 'articles'> & {
    articles: Array<BlogFragment['articles']['edges'][number]['node']>;
};
