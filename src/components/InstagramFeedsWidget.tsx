'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/container';
import { Socials } from '@/components/Socials';
import { Skeleton } from '@/components/ui/skeleton';
import { instagramPosts, InstagramPost } from '@/actions/instagram';

const InstagramFeedsWidget = () => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hover state
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Initialize video refs array when posts change
    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, posts.length);
    }, [posts]);

    // Fetch posts using server action
    useEffect(() => {
        async function loadPosts() {
            setIsLoading(true);
            // const { posts, error } = await fetchInstagramPosts();
            const posts = instagramPosts.slice(0, 6);
            setPosts(posts);
            setError(error || null);
            setIsLoading(false);
        }

        loadPosts();
    }, [error]);

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index); // Show video on hover
        const video = videoRefs.current[index];
        if (video) {
            video.play().catch((e) => console.error('Video play failed:', e));
        }
    };

    const handleMouseLeave = (index: number) => {
        setHoveredIndex(null); // Revert to thumbnail
        const video = videoRefs.current[index];
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    // Loading state with Skeleton components
    if (isLoading) {
        return (
            <section>
                <Container>
                    <div className="flex justify-center">
                        <div className="grid w-full grid-cols-2 gap-3 p-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="aspect-square h-[150px] rounded-lg sm:h-[200px] md:h-[250px]"
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section>
                <Container>
                    <div className="text-center text-red-500">
                        Failed to load Instagram feed: {error}
                    </div>
                </Container>
            </section>
        );
    }

    // Render posts
    const postEls = posts.map((post, index) => {
        let mediaEl;

        if (post.mediaType === 2) {
            // Video: Show thumbnail by default, video on hover
            if (hoveredIndex === index) {
                mediaEl = (
                    <video
                        ref={(el) => {
                            videoRefs.current[index] = el;
                        }}
                        src={post.mediaUrl}
                        muted
                        loop
                        playsInline
                        className="h-full w-full rounded-lg object-cover"
                    />
                );
            } else {
                mediaEl = (
                    <Image
                        src={post.thumbnailUrl || post.mediaUrl}
                        alt={post.caption || 'Instagram post'}
                        width={post.originalWidth}
                        height={post.originalHeight}
                        className="h-full w-full rounded-lg object-cover"
                    />
                );
            }
        } else {
            // Image or Carousel: Display immediately
            mediaEl = (
                <Image
                    src={post.thumbnailUrl || post.mediaUrl}
                    alt={post.caption || 'Instagram post'}
                    width={post.originalWidth}
                    height={post.originalHeight}
                    className="h-full w-full rounded-lg object-cover"
                />
            );
        }

        return (
            <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-square overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}>
                {mediaEl}
            </a>
        );
    });

    return (
        <section className={'w-full'}>
            <Container>
                <div className="flex justify-center">
                    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5">
                        {postEls}
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2.5 text-base font-bold md:gap-4 md:text-xl">
                    <Socials className="[&_svg]:size-9 md:[&_svg]:size-14" />
                    💌 Let‘s connect
                </div>
            </Container>
        </section>
    );
};

export default InstagramFeedsWidget;
