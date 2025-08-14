import { getBlogsAction } from '@/features/blog/actions';
import BlogListSection from '@/features/blog/blog-list-section/blog-list-section';
import { notFound } from 'next/navigation';
import React from 'react';

const AllArticlesPage = async () => {
    // Get first 5 blogs and first 100 articles per blog
    // TODO: implement pagination to get all blogs and articles.

    const blogs = await getBlogsAction(5).then((res) => {
        return res.success ? res.data : [];
    });
    if (!blogs) return notFound();
    const articles = blogs.flatMap((blog) =>
        blog.articles.map((article) => ({
            ...article,
            handle: blog.handle,
        }))
    );

    return (
        <main className="w-full overflow-x-hidden py-[3.125rem] lg:py-[7.5rem]">
            <BlogListSection id="top-blog-list-section" articles={articles} />
        </main>
    );
};

export default AllArticlesPage;
