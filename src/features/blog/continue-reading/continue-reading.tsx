import React from 'react';
import { Article } from '../types';
import Container from '@/components/container';
import BlogListSection from '../blog-list-section/blog-list-section';

const ContinueReadingSection = ({ articles }: { articles: Article[] }) => {
    return (
        <div className="flex w-full flex-col gap-[3.75rem]">
            <Container>
                <h2 className="font-light">
                    <span className="font-medium text-accent-ocean-blue">
                        Continue
                    </span>{' '}
                    reading:
                </h2>
            </Container>

            <BlogListSection id="continue-reading-blogs" articles={articles} />
        </div>
    );
};

export default ContinueReadingSection;
