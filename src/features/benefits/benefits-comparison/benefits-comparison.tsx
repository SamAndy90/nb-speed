import Container from '@/components/container';
import React from 'react';
import GoodbyePills from './goodbye-pills';
import DrinkDailyVits from './drink-daily-vits';
import ProductShowcase from './product-showcase';

const BenefitsComparisonSection = () => {
    return (
        <section className="pt-[3.125rem] lg:pt-[7.5rem]">
            <Container>
                <div className="flex flex-col items-center gap-6 lg:flex-row">
                    <h2 className="w-full max-w-[730px]">
                        Created to make a <br />
                        <span className="font-medium text-accent-pink">
                            difference in your life
                        </span>
                    </h2>

                    <div className="flex w-full flex-col gap-4 lg:max-w-[402px]">
                        <div className="text-paragraph-3 font-bold md:text-paragraph-3 lg:font-bold">
                            A nice 2nd title
                        </div>

                        <p className="text-paragraph-4 md:text-paragraph-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.{' '}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-[76px] lg:grid-cols-2">
                    <GoodbyePills className="h-[550px] lg:h-[740px]" />
                    <DrinkDailyVits className="h-[500px] lg:h-[740px]" />
                    <ProductShowcase className="lg:col-span-2" />
                </div>
            </Container>
        </section>
    );
};

export default BenefitsComparisonSection;
