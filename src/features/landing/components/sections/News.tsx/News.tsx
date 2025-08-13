import Container from '@/components/container';
import { BlogPosts } from './BlogPosts';
import { InstagramFeed } from './InstagramFeed';

export function News() {
    return (
        <section className="w-full">
            <Container>
                <InstagramFeed />
            </Container>
        </section>
    );
}
