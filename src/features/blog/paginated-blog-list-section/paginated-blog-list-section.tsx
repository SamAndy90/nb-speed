'use client';
import React, { useState } from 'react';
import { Article } from '../types';
import BlogListSection from '../blog-list-section/blog-list-section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginatedBlogListSectionProps {
    articles: Article[];
    id: string;
    className?: string;
    defaultPage?: number;
}

const PaginatedBlogListSection = ({
    id,
    className,
    articles,
    defaultPage = 6,
}: PaginatedBlogListSectionProps) => {
    const [visibleArticles, setVisibleArticles] = useState<number>(defaultPage); // Initial number of articles to show

    // Load more articles handler
    const loadMoreArticles = () => {
        setVisibleArticles((prev) => prev + defaultPage); // Increase by the desired number of articles
    };

    const showMoreBtn = articles.length > visibleArticles;

    return (
        <div className={cn('w-full', className)}>
            <BlogListSection
                className="py-[7.5rem]"
                id={id}
                articles={articles.slice(0, visibleArticles)}
            />
            {showMoreBtn && (
                <section className="flex justify-center pb-[3.125rem] pt-[3.125rem] lg:pb-[5.625rem] lg:pt-0">
                    <Button
                        variant="dark"
                        className="w-fit px-5"
                        onClick={loadMoreArticles}>
                        View all articles
                    </Button>
                </section>
            )}
        </div>
    );
};

export default PaginatedBlogListSection;
