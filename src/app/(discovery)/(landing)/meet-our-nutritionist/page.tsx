import {
    CHRISTIANNA_QUOTE,
    MOCK_PRODUCTS,
} from '@/features/nutritionist/consts';
import GetInTouch from '@/features/nutritionist/get-in-touch/get-in-touch';
import HeroSection from '@/features/nutritionist/hero/hero';
import QuickWellnessTips from '@/features/nutritionist/quick-wellness-tips/quick-wellness-tips';
import ProductChoicesSection from '@/features/sections/product-choices-section/product-choices';
import QuoteSection from '@/features/sections/quote-section/quote-section';

export default function NutritionistPage() {
    return (
        <main className="w-full">
            <HeroSection />
            <QuickWellnessTips />
            <QuoteSection {...CHRISTIANNA_QUOTE} direction="left" />
            <ProductChoicesSection
                products={MOCK_PRODUCTS}
                title="Shop Christianna’s"
                highlightTextClassName="text-accent-pink"
            />
            <GetInTouch />
        </main>
    );
}
