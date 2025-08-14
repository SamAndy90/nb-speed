'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import Container from '@/components/container';
import { useEffect, useRef, useState } from 'react';
import { Article } from '@/features/blog/types';
import BlogAuthor from '@/features/blog/blog-author/blog-author';
import { motion } from 'framer-motion';
import { MotionSpan } from '@/components/motion-components/MotionSpan';
import { MainUrls } from '@/route-urls';

export function BlogPosts({ articles }: { articles: Article[] }) {
    const [spacing, setSpacing] = useState<number>(0);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateSpacing = () => {
            const width = containerRef.current?.offsetWidth || 0;
            setSpacing((window.innerWidth - width) / 2);
        };

        // Initial calculation
        updateSpacing();

        // Set up ResizeObserver
        const observer = new ResizeObserver(updateSpacing);
        observer.observe(containerRef.current);

        // Clean up
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
            observer.disconnect();
        };
    }, []);

    return (
        <div
            id="blog"
            className="flex flex-col overflow-hidden pb-[45px] md:pb-0">
            <Container
                ref={containerRef}
                className="flex items-end justify-between">
                <h2>
                    <MotionSpan text={'Health & Wellness Hub'} />
                    <br />
                    <motion.b
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            ease: 'easeOut',
                            duration: 0.8,
                            delay: 0.6,
                        }}
                        viewport={{ once: true }}
                        className="inline-block bg-cooper-text-gradient bg-clip-text text-transparent">
                        See our latest news
                    </motion.b>
                </h2>
                <Button
                    asChild
                    variant="dark"
                    className="hidden text-base md:flex"
                    size="lg">
                    <Link href={MainUrls.getBlogs()}>Visit our Blog</Link>
                </Button>
            </Container>
            <div className="">
                <div className="blog-list flex gap-6 overflow-auto px-5 pb-8 pt-8 [-ms-overflow-style:'none'] [scrollbar-width:none] lg:gap-8 lg:pb-[120px] lg:pt-[60px] [&::-webkit-scrollbar]:hidden">
                    {articles.map((article, index) => (
                        <div
                            key={`blog-${article.id}`}
                            className="!min-w-[302px] lg:!min-w-[365px]"
                            style={{
                                marginLeft: index === 0 ? `${spacing}px` : 0,
                                marginRight:
                                    index === articles.length - 1
                                        ? `${spacing}px`
                                        : 0,
                            }}>
                            <BlogCarouselItem
                                title={article.title}
                                href={MainUrls.getBlog(
                                    article.blogHandle ?? '',
                                    article.handle
                                )}
                                src={article.image?.url || ''}
                                alt={article.title}
                                postedAt={article.publishedAt}
                                authorName={article.author?.name || ''}
                            />
                        </div>
                    ))}
                </div>
                <div className="px-5 pb-[50px] md:hidden">
                    <Button
                        asChild
                        variant="dark"
                        className="text-[0.875rem]"
                        size="lg">
                        <Link href={MainUrls.getBlogs()}>Visit our Blog</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

function BlogCarouselItem({
    title,
    src,
    alt,
    href,
    postedAt,
    authorName,
}: {
    title: string;
    src: ImageProps['src'];
    alt: ImageProps['alt'];
    href: string;
    postedAt: string;
    authorName: string;
}) {
    const formattedDate = new Date(postedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    return (
        <Link
            href={href}
            className="relative flex h-full w-full flex-col items-center justify-between overflow-clip rounded-lg bg-primary shadow-soft transition-all duration-500 hover:scale-[1.02] hover:shadow-soft-1">
            <div className="relative max-h-[14.5rem] min-h-[14.5rem] w-full">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 1024px) 320px, 365px"
                    className="object-cover"
                />
            </div>
            <div className="flex h-full w-full flex-col gap-4 p-5">
                {/* <div className="text-paragraph-4">{formattedDate}</div> */}
                <h3 className="line-clamp-3 flex-1 font-sans text-paragraph-1">
                    {title}
                </h3>

                <BlogAuthor authorName={authorName} />
            </div>
        </Link>
    );
}
