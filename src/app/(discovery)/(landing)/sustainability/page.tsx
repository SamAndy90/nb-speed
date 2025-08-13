import AchievementBadge from '@/features/environment-and-sustainability/achievement-badge/achievement-badge';
import CarbonOffsetSection from '@/features/environment-and-sustainability/carbon-offset/carbon-offset';
import EarthMindSection from '@/features/environment-and-sustainability/earth-mind/earth-mind';
import HeroSection from '@/features/environment-and-sustainability/hero/hero';
import JustTransitionSection from '@/features/environment-and-sustainability/just-transition/just-transition';
import TontotonSection from '@/features/environment-and-sustainability/tontoton/tontoton';

export default function SustainabilityPage() {
    return (
        <main className="w-full">
            <HeroSection />
            <AchievementBadge />
            <JustTransitionSection />
            <TontotonSection />
            <CarbonOffsetSection />
            <EarthMindSection />
        </main>
    );
}
