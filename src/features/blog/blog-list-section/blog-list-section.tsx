import Container from '@/components/container';
import { cn } from '@/lib/utils';
import React from 'react';
import ArticleCard from '../article-card/article-card';
import { Article } from '../types';

interface BlogListSectionProps {
    articles: Article[];
    className?: string;
    id: string;
}

const BlogListSection = ({ id, className, articles }: BlogListSectionProps) => {
    return (
        <section id={id} className={cn(className)}>
            <Container>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-[3.125rem]">
                    {articles.map((article) => (
                        <ArticleCard
                            key={`${id}-blog-${article.id}`}
                            article={article}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default BlogListSection;
