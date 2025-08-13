import Container from '@/components/container';
import { cn } from '@/lib/utils';
import React from 'react';
import { removeProductTemplateTag } from '../utils/utils';

interface BlogDescriptionProps {
    className?: string;
    content: any;
}

const BlogDescription = ({ className = '', content }: BlogDescriptionProps) => {
    return (
        <section className={cn('py-[2.8125rem] lg:py-[5.625rem]', className)}>
            <Container className="max-w-[1020px]">
                <div className="flex flex-col gap-8">
                    <div
                        className="rich-content text-paragraph-3"
                        dangerouslySetInnerHTML={{
                            __html: removeProductTemplateTag(content),
                        }}
                    />
                </div>
            </Container>
        </section>
    );
};

export default BlogDescription;
