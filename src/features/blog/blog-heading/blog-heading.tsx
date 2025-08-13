import Container from '@/components/container';
import React from 'react';

const BlogHeading = () => {
    return (
        <section className="pt-[5.1875rem]">
            <Container>
                <div className="flex w-full flex-col gap-1 border-b border-neutral-300 pb-4 lg:pb-8">
                    <h1 className="font-medium">
                        <span className="font-light">Recent</span> News
                    </h1>
                    <p className="text-paragraph-4 md:text-paragraph-2">
                        Explore our recent posts regarding beauty & lifestyle.
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default BlogHeading;
