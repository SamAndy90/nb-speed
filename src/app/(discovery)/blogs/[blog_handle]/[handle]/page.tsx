import { Footer } from '@/components/Footer';
import { getArticleByIdAction, getBlogsAction } from '@/features/blog/actions';
import BlogDescription from '@/features/blog/blog-description/blog-description';
import { BlogDetail } from '@/features/blog/blog-detail/blog-detail';
import ContinueReadingSection from '@/features/blog/continue-reading/continue-reading';
import { extractProductHandles } from '@/features/blog/utils/utils';
import { getProductByHandle } from '@/features/shopify/api/product';
import {
    DESKTOP_FOOTER_MENU_ITEMS,
    MOBILE_FOOTER_MENU_ITEMS,
} from '@/features/shopify/consts';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
const ProductRecommendation = dynamic(
    () =>
        import('@/features/blog/product-recommendation/product-recommendation'),
    { ssr: false }
);
export default async function BlogPage(props: {
    params: Promise<{ blogHandle: string; handle: string }>;
}) {
    const params = await props.params;

    // Get blogs
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

    const article = articles.find((a) => a.handle === params.handle);
    if (!article) return notFound();

    const sortedArticles = articles
        .sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        )
        .filter((a) => a.handle !== article.handle);
    // Get recommendation products
    const productHandles = extractProductHandles(article.contentHtml);

    const products = [];
    for (const handle of productHandles) {
        const product = await getProductByHandle(handle);
        if (product) products.push(product);
    }
    const recommendationThree = products.slice(0, 3);

    return (
        <>
            <main className="w-full overflow-x-hidden py-[3.125rem] lg:py-[7.5rem]">
                <BlogDetail article={article} />
                <BlogDescription
                    className="pt-8"
                    content={article.contentHtml}
                />
                {recommendationThree.length > 0 && (
                    <>
                        <ProductRecommendation
                            className="mb-0"
                            products={recommendationThree}
                        />
                        <BlogDescription
                            className="pt-8"
                            content={article.contentHtml}
                        />
                    </>
                )}
                <ContinueReadingSection articles={sortedArticles.slice(0, 6)} />
            </main>
            <Footer
                desktopMenu={DESKTOP_FOOTER_MENU_ITEMS}
                mobileMenu={MOBILE_FOOTER_MENU_ITEMS}
            />
        </>
    );
}
