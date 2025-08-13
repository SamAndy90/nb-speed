import Image from 'next/image';
import React from 'react';

const BlogAuthor = ({
    authorSrc,
    authorName,
}: {
    authorSrc?: string;
    authorName: string;
}) => {
    return (
        <div className="paragraph-4 flex w-fit items-center gap-2 text-paragraph-4">
            <span>by</span>
            {authorSrc && (
                <Image
                    className="h-6 w-6 rounded-full object-cover"
                    src={authorSrc}
                    alt={authorName}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            )}
            <span>{authorName}</span>
        </div>
    );
};

export default BlogAuthor;
