import { Footer } from '@/components/Footer';
import { getArticleWithMetafieldsAction } from '@/features/blog/actions';
import {
    BlogDetail,
    TwrBlogHero,
    TwrBlogSection,
    TwrBlogStackedSection,
} from '@/features/blog/blog-detail/blog-detail';
import { extractProductHandles } from '@/features/blog/utils/utils';
import { processArticleMetafields } from '@/features/blog/utils/metafield-mapper';
import { getProductByHandle } from '@/features/shopify/api/product';
import {
    DESKTOP_FOOTER_MENU_ITEMS,
    MOBILE_FOOTER_MENU_ITEMS,
} from '@/features/shopify/consts';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogAuthor from '@/features/blog/blog-author/blog-author';

const ProductRecommendation = dynamic(
    () =>
        import('@/features/blog/product-recommendation/product-recommendation'),
    { ssr: false }
);

export default async function BlogPage(props: {
    params: Promise<{ blogHandle: string; handle: string }>;
}) {
    const params = await props.params;

    console.log('params is this guys ', params);
    // Get blogs using existing action
    const article = await getArticleWithMetafieldsAction(params.handle).then(
        (res) => {
            return res.success ? res.data : [];
        }
    );

    // Process metafields to convert custom HTML-like tags
    if (article.metafields) {
        article.metafields = processArticleMetafields(article.metafields);
    }

    // Extract meta fields for TWR blog content
    const getMetaField = (key: string) => {
        return (
            article.metafields?.find((field: any) => field.key === key)
                ?.value || article[key as keyof typeof article]
        );
    };

    const getMetaFieldWithImage = (key: string) => {
        return (
            article.metafields?.find((field: any) => field.key === key)
                ?.reference.image.url || article[key as keyof typeof article]
        );
    };

    const blogImages = [
        getMetaFieldWithImage('twr_image_1'),
        getMetaFieldWithImage('twr_image_2'),
        getMetaFieldWithImage('twr_image_3'),
        getMetaFieldWithImage('twr_image_4'),
    ];

    const blogTexts = [
        getMetaField('twr_textfield_1'),
        getMetaField('twr_textfield_2'),
        getMetaField('twr_textfield_3'),
        getMetaField('twr_textfield_4'),
    ];

    console.log(article.metafields, '<------------ new metafield ');

    // Extract product handles from all text content
    const allTextContent = blogTexts.filter(Boolean).join(' ');
    const productHandles = extractProductHandles(allTextContent);

    const products = [];
    for (const handle of productHandles) {
        const product = await getProductByHandle(handle);
        if (product) products.push(product);
    }

    // Prepare content sections
    const contentSections = [
        { image: blogImages[0], text: blogTexts[0] },
        { image: blogImages[1], text: blogTexts[1] },
        { image: blogImages[2], text: blogTexts[2] },
        { image: blogImages[3], text: blogTexts[3] },
    ].filter((section) => section.image || section.text);

    const lastLinearContent = contentSections.pop();

    const stackedSections = [
        {
            image: getMetaFieldWithImage('twr_stacked_image_1'),
            text1: getMetaField('twr_stacked_textfield_1'),
            text2: getMetaField('twr_stacked_textfield_2'),
        },
        {
            image: getMetaFieldWithImage('twr_stacked_image_2'),
            text1: getMetaField('twr_stacked_textfield_3'),
            text2: getMetaField('twr_stacked_textfield_4'),
        },
    ];

    return (
        <>
            <main className="w-full overflow-x-hidden">
                {/* Hero Section */}
                <TwrBlogHero
                    title={article.title}
                    excerpt={article.excerpt}
                    publishedAt={article.publishedAt}
                    featuredImage={
                        getMetaField('featuredImage') || article.image?.url
                    }
                    authorName={article.author.name}
                />

                {/* Content Sections */}
                <div className="relative">
                    {contentSections.map((section, index) => (
                        <TwrBlogSection
                            key={index}
                            image={section.image}
                            text={section.text}
                            sectionIndex={index}
                        />
                    ))}
                </div>

                {stackedSections.map((section, index) => (
                        <TwrBlogStackedSection
                            image={section.image}
                            text1={section.text1}
                            text2={section.text2}
                    />
                ))}

                {
                    lastLinearContent && (
                        <TwrBlogSection
                            image={lastLinearContent.image}
                            text={lastLinearContent.text}
                            sectionIndex={4}
                        />
                    )
                }
            </main>
            <Footer
                desktopMenu={DESKTOP_FOOTER_MENU_ITEMS}
                mobileMenu={MOBILE_FOOTER_MENU_ITEMS}
            />
        </>
    );
}
