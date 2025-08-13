import { MainUrls } from '@/route-urls';
import { TBlog } from './types';

export const MOCK_BLOG: TBlog = {
    id: `${new Date().toISOString()}-1`,
    title: 'How to integrate Minions Kids’ Vitamins into everyday nutrition',
    src: 'https://i.ibb.co/Ry05LnC/316be834517fa41ec5bb2089e1c3dac9.png',
    postedAt: new Date().toISOString(),
    authorSrc: 'https://i.ibb.co/F48DrRD/366f915b8c4a0966b24727caa34da003.png',
    authorName: 'Mišel Saban',
    description: `Lorem ipsum dolor sit amet, consectetur adip-iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    slug: 'minions-kids',
};

export const MOCK_CATEGORIES = [
    {
        label: 'All articles',
        value: 'all',
    },
    {
        label: 'Health & Beauty',
        value: 'health_beauty',
    },
];

export const BLOG_ROUTE = process.env.BLOG_ROUTE ?? MainUrls.getBlogs();
