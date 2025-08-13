import Container from '@/components/container';
import { Socials } from '@/components/Socials';
import BeholdWidget from '@/components/BeholdWidget';

export default function InstagramFeeds() {
    return (
        <section className={'w-full py-[90px] lg:py-[120px]'}>
            <Container>
                {process.env.NEXT_PUBLIC_BEHOLD_FEED_ID && (
                    <BeholdWidget
                        beholdId={process.env.NEXT_PUBLIC_BEHOLD_FEED_ID}
                    />
                )}
                <div className="mt-4 flex flex-wrap items-center gap-2.5 text-base font-bold md:gap-4 md:text-xl">
                    <Socials className="[&_svg]:size-9 md:[&_svg]:size-14" />
                    💌 Let&lsquo;s connect
                </div>
            </Container>
        </section>
    );
}
