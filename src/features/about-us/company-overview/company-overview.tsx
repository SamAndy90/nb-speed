import Container from '@/components/container';
import React from 'react';
import CompanyStats from './company-stats';

const CompanyOverviewSection = () => {
    return (
        <section className="pt-[3.125rem] lg:pt-[7.5rem]">
            <Container>
                <div className="flex max-w-[790px] flex-col gap-4 lg:gap-6">
                    <h2 className="font-light">
                        <span className="font-medium text-accent-pink">
                            Nutritional Science
                        </span>
                        <br /> with a Sweet Twist
                    </h2>
                    <p className="max-w-[690px] text-paragraph-4 lg:text-paragraph-3">
                        At Nutriburst, we believe that good health should be
                        enjoyable, not a chore. Founded in 2021 by Simran
                        Kanwaar, a visionary and busy working mum, we've quickly
                        distinguished ourselves in the wellness industry.
                    </p>
                </div>
                <CompanyStats />
            </Container>
        </section>
    );
};

export default CompanyOverviewSection;
