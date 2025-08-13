import { ReferrerToast } from '@/hooks/useReferrerToast';
import { Suspense } from 'react';
import { Hero } from '@/features/landing/components/sections/Hero';
import { Footer } from '@/components/Footer';
import {
    DESKTOP_FOOTER_MENU_ITEMS,
    MOBILE_FOOTER_MENU_ITEMS,
} from '@/features/shopify/consts';
import { HeroOption } from '@/features/landing/types';
import bundleBlue from '@/assets/hero-bundles/hero-bundle-blue.webp';
import bundleGreen from '@/assets/hero-bundles/hero-bundle-green.webp';
import bundlePink from '@/assets/hero-bundles/hero-bundle-pink.webp';
import { CBackedByScience } from '@/features/landing/components/sections/BackedByScience/CBackedByScience';
import { getCollections } from '@/features/shopify/api/collection';
import { getFragmentData } from '@/gql/storefront';
import { collectionFragment } from '@/features/shopify/graphql/storefront/fragments/collection';
import { parseProduct } from '@/features/product/utils';
import { productFragment } from '@/features/shopify/graphql/storefront/fragments/product';
import { TrustedByExperts } from '@/features/product/components/sections/TrustedByExperts';
import { GummiesRedefined } from '@/features/landing/components/sections/GummiesRedefined';
import { DiscoverOurCollections } from '@/features/landing/components/sections/DiscoverOurCollections';
import { GotQuestions } from '@/features/landing/components/sections/GotQuestions';
import { FindUsIn } from '@/features/landing/components/sections/FindUsIn';
import { GradientBackground } from '@/features/landing/components/GradientBackground';
import { LovedBy } from '@/features/landing/components/sections/LovedBy';
import maryFace from '@/assets/mary-face.png';
import christiannaFace from '@/assets/christianna.webp';
import elliottFace from '@/assets/elliott-obatoyinbo-face.png';
import { BlogPosts as UIBlogPosts } from '@/features/landing/components/sections/News.tsx/BlogPosts';
import { getBlogsAction } from '@/features/blog/actions';
import { Founder } from '@/features/landing/components/sections/Founder/Founder';
import JoinTheCommunity from '@/features/blog/join-the-community/join-the-community';
import reviewsService from '@/lib/reviews/reviews-service';
import SectionSpacer from '@/components/SectionSpacer';
// import { CompetitionModal } from '@/features/landing/components/sections/Modal/CompetitionModal';
import InstagramFeeds from '@/components/InstagramFeeds';
import { Loader } from '@/components/Loader';
import dynamic from 'next/dynamic';

const CompetitionModal = dynamic(
    () =>
        import('@/features/landing/components/sections/Modal/CompetitionModal'),
    {
        ssr: false,
    }
);

const heroOptions: HeroOption[] = [
    {
        coloredText: 'Deliciously Simple',
        plainText: 'Powerfully Effective',
        headingColour: 'text-accent-pink',
        productImage: { url: bundlePink.src },
        expertName: 'Christianna A. Karaolis',
        expertImage: {
            url: christiannaFace.src,
            altText: 'Christianna A. Karaolis',
        },
    },
    {
        coloredText: 'Trusted by Experts',
        plainText: 'Deliciously Simple',
        headingColour: 'text-accent-green',
        productImage: { url: bundleGreen.src },
        expertName: 'MBE Mary Earps',
        expertImage: {
            url: maryFace.src,
            altText: 'MBE Mary Earps',
        },
    },
    {
        coloredText: 'Proven Results',
        plainText: 'Trusted by Experts',
        headingColour: 'text-accent-ocean-blue',
        productImage: { url: bundleBlue.src },
        expertName: 'Elliott Obatoyinbo',
        expertImage: {
            url: elliottFace.src,
            altText: 'Elliott Obatoyinbo',
        },
    },
    // {
    //     headingColour: 'text-accent-orange',
    //     productImage: { url: bundlePink.src },
    //     expertName: 'Christianna A. Karaolis',
    //     expertImage: {
    //         url: christiannaFace.src,
    //         altText: 'Christianna A. Karaolis',
    //     },
    // },
];
export default async function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden">
            <GradientBackground variant="section-2">
                <Hero options={heroOptions} />
                <Suspense fallback={<Loader />}>
                    <BackedByScience />
                </Suspense>
            </GradientBackground>
            <Founder />
            <CompetitionModal
                headingText="Buy 2 Nutriburst Minion Products for a chance to"
                actionText="WIN"
                prizeDescription="A family holiday for 4 to Minion World in Orlando, Florida"
                ctaText="Shop Minion"
                competitionUrl="/collections/all-products?query=Minion"
                learnMoreUrl="/pages/minions-win"
                imageSrc="https://cdn.shopify.com/s/files/1/0072/6325/6685/files/Group_13c590ff-4f30-4f88-b959-2363a82e8093.png?v=1751632470"
                imageAlt="Minions Competition"
                mobileImageSrc="https://cdn.shopify.com/s/files/1/0072/6325/6685/files/Minions_Mega_Multi_PDP_01.png?v=1751879554"
                sessionStorageKey="minions-competition-modal-shown"
            />
            <Suspense fallback={null}>
                <ReferrerToast />
            </Suspense>
            <GummiesRedefined />
            <DiscoverOurCollections />
            <SectionSpacer hasBackground={true} />
            <GradientBackground variant="section-3">
                <LovedBy />
            </GradientBackground>
            <SectionSpacer hasBackground={true} />
            <GotQuestions />
            <SectionSpacer hasBackground={true} />
            <FindUsIn />
            <SectionSpacer hasBackground={true} />
            <TrustedByExperts />
            <InstagramFeeds />
            <GradientBackground variant="section-4">
                <Suspense fallback={<Loader />}>
                    <BlogPosts />
                </Suspense>
            </GradientBackground>
            <JoinTheCommunity />
            <SectionSpacer hasBackground={true} />
            <Footer
                desktopMenu={DESKTOP_FOOTER_MENU_ITEMS}
                mobileMenu={MOBILE_FOOTER_MENU_ITEMS}
            />
        </main>
    );
}

async function BackedByScience() {
    const collections = await getCollections().then((collections) =>
        collections.edges.map((edge) =>
            getFragmentData(collectionFragment, edge.node)
        )
    );

    const collectionMap = collections.map((collection) => ({
        handle: collection.handle,
        title: collection.title,
        products: collection.products.edges.map((edge) =>
            parseProduct(getFragmentData(productFragment, edge.node))
        ),
    }));

    const reviews = await Promise.all(
        collectionMap.map(async (collection) => {
            const skus = collection.products
                .map((product) => product.selectedOrFirstAvailableVariant?.sku)
                .join(';');
            const ratings =
                await reviewsService.retrieveProductRatingBatch(skus);
            return {
                handle: collection.handle,
                ratings: ratings || [],
            };
        })
    );
    return <CBackedByScience collections={collectionMap} reviews={reviews} />;
}

async function BlogPosts() {
    const blogs = await getBlogsAction(10).then((res) => {
        return res.success ? res.data : [];
    });

    const articles = blogs
        ? blogs.flatMap((blog) =>
              blog.articles.map((article) => ({
                  ...article,
                  blogHandle: blog.handle,
              }))
          )
        : [];

    return (
        <UIBlogPosts
            articles={articles.sort(
                (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime()
            )}
        />
    );
}
