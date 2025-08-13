import Container from '@/components/container';
import { PrimaryButton } from '@/components/PrimaryButton';
import Image from 'next/image';
import React from 'react';
import nutribustHands from '@/assets/nutriburst_hands.webp';

const Hero = () => {
    return (
        <section className="bg-gradient-8 flex min-h-landing-screen flex-col justify-center py-[3.125rem] lg:pb-0 lg:pt-[7.5rem]">
            <Container>
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <div>
                        <div className="mb-4 text-paragraph-4 font-medium uppercase lg:mb-6 lg:text-paragraph-1">
                            OUR REWARDS
                        </div>

                        <h1 className="mb-4 lg:mb-3">
                            <span className="font-medium text-accent-orange">
                                Get rewarded
                            </span>
                            <br /> for being heathy
                        </h1>

                        <p className="max-w-[430px] text-paragraph-3 md:text-paragraph-2">
                            Our rewards program help you save most on your
                            favourite products!
                        </p>
                    </div>

                    <PrimaryButton align="left" className="h-[42px] w-[235px]">
                        Learn how to save
                    </PrimaryButton>
                </div>
            </Container>

            <Image
                src={nutribustHands}
                width={0}
                height={0}
                sizes="100w"
                alt="nutribust-hands"
                className="ml-auto mt-8 h-auto w-full max-w-[1250px] scale-x-[-1] transform lg:mt-0"
            />
        </section>
    );
};

export default Hero;
