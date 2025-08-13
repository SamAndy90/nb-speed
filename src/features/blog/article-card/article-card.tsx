import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../types';
import BlogAuthor from '../blog-author/blog-author';
import { MainUrls } from '@/route-urls';

interface BlogEntryCardProps {
    article: Article;
}

export default function ArticleCard(props: BlogEntryCardProps) {
    const { article } = props;
    const { title, image, publishedAt, author, handle, blogHandle } = article;

    //Format date as Short month, d, yyyy
    const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Link
            href={MainUrls.getBlog(blogHandle ?? '', handle)}
            className={cn(
                'flex w-full flex-col gap-1 rounded-[1.25rem] shadow-soft transition-all duration-500 hover:scale-[1.02] hover:shadow-soft-1'
            )}>
            <picture className="flex h-[14.5rem]">
                <Image
                    className="h-full w-full rounded-t-[0.625rem] object-cover"
                    src={image?.url}
                    alt={image?.altText || ''}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            </picture>

            <div className="flex flex-col gap-4 p-5">
                {/* <div className="text-paragraph-4">{formattedDate}</div> */}
                <h5 className="font-sans text-paragraph-1">{title}</h5>

                <BlogAuthor authorName={author.name} />
            </div>
        </Link>
    );
}
