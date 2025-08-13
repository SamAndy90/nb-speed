import Container from '@/components/container';
import React from 'react';
import SignUpForFree from './signup-for-free';
import RewardsClaim from './rewards-claim';
import SaveYourProducts from './save-your-products';
import HowToEarnPoints from './earn-points';
import SafariBrowser from './safari-browser';
import ProductShowcase from './product-showcase';

const BenefitOverviewSection = () => {
    return (
        <section className="bg-primary-white py-[3.125rem] lg:py-[7.5rem]">
            <Container>
                <div className="flex flex-col justify-between gap-8 lg:flex-row">
                    <div className="flex w-full flex-col gap-8 lg:max-w-[471px] lg:gap-[3.75rem]">
                        <SignUpForFree />
                        <SafariBrowser className="lg:hidden" />
                        <RewardsClaim className="hidden lg:flex" />
                        <HowToEarnPoints className="lg:hidden" />
                        <SaveYourProducts className="hidden lg:block" />
                    </div>

                    <div className="flex w-full flex-col gap-8 lg:max-w-[577px] lg:gap-[3.75rem]">
                        <SafariBrowser className="hidden lg:block" />
                        <RewardsClaim className="lg:hidden" />
                        <HowToEarnPoints className="hidden lg:block lg:max-w-[400px]" />
                        <SaveYourProducts className="lg:hidden" />
                        <ProductShowcase />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BenefitOverviewSection;
