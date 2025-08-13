import Container from '@/components/container';
import React from 'react';
import community from '@/features/landing/assets/community-1.png';
import Image from 'next/image';
import InputWithButton from '@/components/input-width-button';

const JoinTheCommunity = () => {
    return (
        <section className="pb-[3.125rem] pt-[6.25rem] lg:py-[7.5rem] w-full">
            <Container>
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-[97px]">
                    <picture className="w-full max-w-[562px]">
                        <Image
                            src={community}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="community"
                            className="h-auto w-full"
                        />
                    </picture>

                    <div className="flex w-full flex-col items-center gap-[1.5625rem]">
                        <div className="text-center">
                            <h2>
                                Join the community <br />
                                <span className="font-medium">
                                    & receive 10% off!
                                </span>
                            </h2>
                            <p className="mt-4 text-paragraph-4 lg:text-paragraph-2 max-w-[450px] mx-auto">
                                Sign up for emails and save 10% OFF on your
                                first gummy vitamins
                            </p>
                        </div>

                        <InputWithButton placeholder="Your best email" />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { JoinTheCommunity };
