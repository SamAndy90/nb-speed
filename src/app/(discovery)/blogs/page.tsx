import BlogListSection from '@/features/blog/blog-list-section/blog-list-section';
import BlogHeading from '@/features/blog/blog-heading/blog-heading';
import BlogPartnersSection from '@/features/blog/blog-partners/blog-partners';
import FeaturedArticle from '@/features/blog/featured-article/featured-article';
import FeaturedArticleWithCategories from '@/features/blog/featured-article-with-categories/featured-article-with-categories';
import AnimatedTextCarousel from '@/features/blog/animated-text-carousel/animated-text-carousel';
import JoinTheCommunity from '@/features/blog/join-the-community/join-the-community';
import {
    DESKTOP_FOOTER_MENU_ITEMS,
    MOBILE_FOOTER_MENU_ITEMS,
} from '@/features/shopify/consts';
import { Footer } from '@/components/Footer';
import { getBlogsAction } from '@/features/blog/actions';
import { notFound } from 'next/navigation';
import PaginatedBlogListSection from '@/features/blog/paginated-blog-list-section/paginated-blog-list-section';

export default async function BlogPage() {
    // Get first 5 blogs and first 100 articles per blog
    const blogs = await getBlogsAction(10).then((res) => {
        return res.success ? res.data : [];
    });

    if (!blogs) return notFound();
    const articles = blogs.flatMap((blog) =>
        blog.articles.map((article) => ({
            ...article,
            blogHandle: blog.handle,
        }))
    );

    const sortedArticles = articles.sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
    );

    const randomArticle = articles[Math.floor(Math.random() * articles.length)];

    return (
        <>
            <main className="w-full overflow-x-hidden">
                <BlogHeading />
                <BlogPartnersSection />
                <FeaturedArticleWithCategories blogs={blogs} />
                <BlogListSection
                    className="my-[3.125rem] lg:my-[7.5rem]"
                    id="top-blog-list-section"
                    articles={sortedArticles.slice(0, 3)}
                />
                <AnimatedTextCarousel />
                <FeaturedArticle
                    as="section"
                    article={randomArticle}
                    className="bg-gradient-section"
                    contentClassName="lg:flex-row-reverse"
                />
                <JoinTheCommunity />
                <BlogListSection
                    className="mb-[7.5rem]"
                    id="blog-list-section-2"
                    articles={sortedArticles.slice(0, 6)}
                />
                <AnimatedTextCarousel />
                <FeaturedArticle
                    as="section"
                    article={randomArticle}
                    className="bg-gradient-section"
                    contentClassName="lg:flex-row-reverse"
                />
                <PaginatedBlogListSection
                    id={'paginated-blog-list'}
                    className="hidden lg:block"
                    articles={sortedArticles}
                />
            </main>
            <Footer
                desktopMenu={DESKTOP_FOOTER_MENU_ITEMS}
                mobileMenu={MOBILE_FOOTER_MENU_ITEMS}
            />
        </>
    );
}
