import Image from 'next/image';
import React from 'react';
import nutribustHands from '@/assets/nutriburst_hands.webp';
import Container from '@/components/container';

const RevolutionarySection = () => {
    return (
        <section className="pt-[3.125rem] lg:pt-[7.5rem]">
            <Container className="text-center">
                <h2>
                    <span className="font-medium text-accent-pink">
                        Revolutionary Gummies.
                    </span>
                    <br />
                    Wellness in Every Bite.
                </h2>
                <p className="mx-auto mt-4 max-w-[570px] text-paragraph-4 lg:mt-6 lg:text-paragraph-2">
                    Science isn’t an afterthought, it’s where everything begins.
                    Our formulas are built with clinically studied ingredients,
                    designed for maximum absorption, real effectiveness, and
                    everyday ease to support your health.
                </p>
                <p className="mx-auto mt-4 max-w-[570px] text-paragraph-4 lg:mt-6 lg:text-paragraph-2">
                    And we’re committed to proving it: with clinical trials
                    underway, we’re taking our promise of transparency and trust
                    even further.
                    <br />
                    Because when science meets simplicity, better health becomes
                    second nature.
                </p>
            </Container>
            <Image
                src={nutribustHands}
                width={0}
                height={0}
                sizes="100w"
                alt="nutribust-hands"
                className="ml-auto mt-8 h-auto w-full max-w-[1258px] scale-x-[-1] transform lg:mt-0"
            />
        </section>
    );
};

export default RevolutionarySection;
