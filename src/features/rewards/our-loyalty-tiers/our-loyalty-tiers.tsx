import Container from '@/components/container';
import React from 'react';
import { TIERS } from '../consts';

const OutLoyaltyTiersSection = () => {
    return (
        <section className="py-[3.125rem] lg:pb-[77px] lg:pt-[7.5rem] bg-gradient-section">
            <Container>
                <div className="flex flex-col items-center gap-4 text-center lg:gap-6">
                    <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                        OUR LOYALTY TIERS
                    </div>
                    <h2>
                        Nutriburst Loyalty Tiers: <br />
                        <span className="font-medium text-accent-orange">
                            A Token of Our Gratitude
                        </span>
                    </h2>
                    <p className="text-paragraph-4 lg:hidden">
                        With a foundation deeply rooted in scientific research,
                        we transform cutting-edge nutritional science into
                        delicious, easy-to-take supplements.
                    </p>
                </div>

                <div className="mt-8 flex flex-col justify-between gap-8 lg:mt-[60px] lg:flex-row">
                    {TIERS.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.title}
                                className="mx-auto flex w-full max-w-[350px] flex-col items-center gap-8 text-center">
                                <Icon className="h-[3.125rem] md:h-[75px]" />

                                <div className="flex flex-col gap-6">
                                    <h5>{tier.title}</h5>
                                    <p className="text-paragraph-4 md:text-paragraph-3">
                                        {tier.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default OutLoyaltyTiersSection;
