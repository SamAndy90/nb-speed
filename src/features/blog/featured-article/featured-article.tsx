'use client';

import Container from '@/components/container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import { Article, TBlog } from '../types';
import { useRouter } from 'next/navigation';
import { BLOG_ROUTE } from '../consts';
import BlogAuthor from '../blog-author/blog-author';
import { removeProductTemplateTag } from '../utils/utils';

interface FeaturedArticleProps {
    className?: string;
    contentClassName?: string;
    article: Article;
    as?: 'div' | 'section';
    isFixedRatio?: boolean;
}

const FeaturedArticle = ({
    article,
    className = '',
    contentClassName = '',
    as = 'div',
    isFixedRatio,
}: FeaturedArticleProps) => {
    const { title, image, blogHandle, handle, publishedAt, author } = article;
    const router = useRouter();
    //Format date as Short month, d, yyyy
    const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    const Component = as;

    const handleReadClick = () => {
        router.push(`${BLOG_ROUTE}/${blogHandle}/${handle}`);
    };

    return (
        <Component className={cn('py-[3.125rem] lg:py-[7.5rem]', className)}>
            <Container>
                <div
                    className={cn(
                        'flex flex-col-reverse items-center gap-0 lg:flex-row lg:gap-[3.75rem]',
                        contentClassName
                    )}>
                    <div className="w-full pt-5 lg:max-w-[30.2rem]">
                        <div className="flex flex-col gap-4">
                            {/* <div className="text-paragraph-3">
                                {formattedDate}
                            </div> */}

                            <h5 className="line-clamp-2 font-sans text-paragraph-1">
                                {title}
                            </h5>

                            <BlogAuthor authorName={author.name} />
                        </div>

                        {/* {contentHtml && (
                            <div
                                className="line-clamp clamp-3 mt-6 text-paragraph-4 md:text-paragraph-2"
                                dangerouslySetInnerHTML={{
                                    __html: removeProductTemplateTag(
                                        contentHtml
                                    ),
                                }}></div>
                        )} */}

                        <span
                            className="mt-4 flex cursor-pointer items-center gap-2 text-paragraph-3 font-bold lg:mt-8"
                            onClick={handleReadClick}>
                            Read article
                            <ArrowRight />
                        </span>
                    </div>

                    <picture className="w-full flex-1">
                        {image && (
                            <Image
                                className={cn(
                                    'h-auto w-full rounded-[0.625rem] object-cover',
                                    { 'lg:aspect-[1.441]': isFixedRatio }
                                )}
                                src={image.url}
                                alt={image.altText || ''}
                                width={0}
                                height={0}
                                sizes="100vw"
                            />
                        )}
                    </picture>
                </div>
            </Container>
        </Component>
    );
};

export default FeaturedArticle;
