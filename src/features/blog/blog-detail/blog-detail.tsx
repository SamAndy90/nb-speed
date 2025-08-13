import React from 'react';
import Container from '@/components/container';
import BlogAuthor from '../blog-author/blog-author';
import Image from 'next/image';
import { ArticleFragment } from '@/gql/storefront/graphql';
import dynamic from 'next/dynamic';
const Sharing = dynamic(() => import('@/components/Sharing'), { ssr: false });

const BlogDetail = ({ article }: { article: ArticleFragment }) => {
    const formattedDate = new Date(article.publishedAt)
        .toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
        .toUpperCase();

    return (
        <section>
            <Container>
                <div className="mx-auto flex w-full max-w-[833px] flex-col items-center justify-center gap-4 text-center lg:gap-6">
                    <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                        {formattedDate}
                    </div>

                    <h1>{article.title}</h1>

                    <BlogAuthor authorName={article.author?.name || ''} />
                </div>

                <div className="relative pt-[3.75rem] lg:pt-8">
                    <div className="absolute right-0 top-8 cursor-pointer lg:top-0">
                        <Sharing />
                    </div>

                    <picture className="w-full">
                        {article.image && (
                            <Image
                                src={article.image.url}
                                alt={article.image?.altText || ''}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-auto w-full rounded-[0.625rem]"
                            />
                        )}
                    </picture>
                </div>
            </Container>
        </section>
    );
};

// TWR Blog Hero Section
function TwrBlogHero({
    title,
    excerpt,
    publishedAt,
    featuredImage,
    authorName,
}: {
    title: string;
    excerpt?: string;
    publishedAt?: string;
    featuredImage?: string;
    authorName?: string;
}) {
    return (
        <section className="relative mx-auto w-full max-w-6xl px-4">
            {/* Hero Image */}
            {featuredImage && (
                <div className="relative mt-6 h-[60vh] w-full overflow-hidden rounded-md lg:mt-12">
                    <Image
                        src={featuredImage}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            )}

            <div className="mt-4 lg:mt-8">
                <h3 className="mb-6 text-4xl font-bold text-gray-900 lg:text-6xl">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <p>{authorName}</p>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>

                    <p>
                        {publishedAt &&
                            new Date(publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                    </p>
                </div>
            </div>
        </section>
    );
}

// TWR Blog Content Section with Enhanced Design
function TwrBlogSection({
    image,
    text,
    sectionIndex
}: {
    image?: string;
    text?: string;
    sectionIndex: number;
    isLast?: boolean;
}) {
    if (!image && !text) return null;

    const isImageLeft = sectionIndex % 2 === 0;
    const isImageOnly = image && !text;
    const isTextOnly = text && !image;

    return (
        <section
            className={
                'relative py-6 lg:py-10 ' +
                (sectionIndex == 0 ? 'mt-8 lg:mt-16' : '')
            }>
            <div className="mx-auto max-w-6xl px-4">
                {/* Full-width image section */}
                {isImageOnly && (
                    <div className="relative h-[70vh] w-full overflow-hidden rounded-3xl shadow-2xl">
                        <Image
                            src={image}
                            alt={`TWR Blog Section ${sectionIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                    </div>
                )}

                {/* Full-width text section */}
                {isTextOnly && (
                    <div className="mx-auto max-w-4xl">
                        <div className="text-base prose prose-xl prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-li:marker:text-gray-500">
                            <div dangerouslySetInnerHTML={{ __html: text }} />
                        </div>
                    </div>
                )}

                {/* Image + Text section */}
                {image && text && (
                    <div
                        className={`grid items-center gap-2 lg:grid-cols-2 lg:gap-20 ${
                            isImageLeft ? '' : 'lg:grid-flow-dense'
                        }`}>
                        {/* Image */}
                        <div
                            className={`relative ${isImageLeft ? '' : 'lg:col-start-2'}`}>
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl">
                                <Image
                                    src={image}
                                    alt={`TWR Blog Section ${sectionIndex + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Text */}
                        <div
                            className={`${isImageLeft ? '' : 'lg:col-start-1'}`}>
                            <div className="mt-5 text-base prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-li:marker:text-gray-500">
                                <div
                                    dangerouslySetInnerHTML={{ __html: text }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

// TWR Blog Content Section with Enhanced Design
function TwrBlogStackedSection({
    image,
    text1,
    text2,
}: {
    image?: string;
    text1?: string;
    text2?: string;
}) {
    if (!image && !text1 && !text2) return null;

    return (
        <section className={'relative py-8 lg:py-12'}>
            <div className="mx-auto max-w-7xl px-4">
                {/* Vertical layout - Text1, Image, Text2 */}
                <div className="flex flex-col gap-12 lg:gap-16 mx-auto max-w-6xl px-4">
                    {/* Text1 - Full Width */}
                    {text1 && <div className="w-full text-base">
                        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-li:marker:text-gray-500">
                            <div
                                dangerouslySetInnerHTML={{ __html: text1 }}
                            />
                        </div>
                    </div>}

                    {/* Image - 16:9 and Centered */}
                    {image && <div className="flex w-full justify-center">
                        <div className="relative aspect-[16/4] w-full overflow-hidden rounded-2xl shadow-xl">
                            <Image
                                src={image}
                                alt={`TWR Blog Footer`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 1000px"
                            />
                        </div>
                    </div>}

                    {/* Text2 - Full Width */}
                    {text2 && <div className="w-full text-base">
                        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-li:marker:text-gray-500">
                            <div
                                dangerouslySetInnerHTML={{ __html: text2 }}
                            />
                        </div>
                    </div>}
                </div>
            
            </div>
        </section>
    );
}

export { TwrBlogHero, TwrBlogSection, TwrBlogStackedSection, BlogDetail };
