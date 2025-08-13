import HeroSection from '@/features/about-us/hero/hero';
import CompanyOverviewSection from '@/features/about-us/company-overview/company-overview';
import TrustedCertifiedSection from '@/features/about-us/trusted-certified/trusted-certified';
import FounderQuote from '@/features/about-us/founder-quote/founder-quote';
import HeroProducts from '@/features/about-us/hero-products/hero-products';
import RevolutionarySection from '@/features/about-us/revolutionary/revolutionary';
import TeamSection from '@/features/about-us/team/team';
import StorySection from '@/features/about-us/story/story';
import dynamic from 'next/dynamic';
import { Discover } from '@/features/about-us/Discover';

const Qualifications = dynamic(
    () => import('@/features/about-us/qualifications/qualifications'),
    {
        ssr: false,
    }
);

export default function AboutPage() {
    return (
        <main className="w-full">
            <HeroSection />
            <HeroProducts />
            <TrustedCertifiedSection />
            <CompanyOverviewSection />
            <FounderQuote />
            <RevolutionarySection />
            <TeamSection />
            <StorySection />
            <Qualifications />
            <Discover />
        </main>
    );
}
