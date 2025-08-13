import Container from '@/components/container';
import React from 'react';
import { SOCIAL_REWARDS_DATA } from '../consts';
import RewardItem from '../benefit-overview/reward-item';
import Marquee from 'react-fast-marquee';

const WaysToEarnSection = () => {
    return (
        <section className="bg-beige pt-[3.125rem] lg:pt-[7.5rem]">
            <Container>
                <div className="flex flex-col items-center gap-4 text-center lg:gap-6">
                    <div className="text-paragraph-1">WAYS TO EARN</div>
                    <h2>
                        <span className="font-medium text-accent-orange">
                            Save up to 100%
                        </span>
                        <br /> on your next purchase
                    </h2>
                    <p className="text-paragraph-4 lg:hidden">
                        With a foundation deeply rooted in scientific research,
                        we transform cutting-edge nutritional science into
                        delicious, easy-to-take supplements.
                    </p>
                </div>
            </Container>

            <div className="">
                <Marquee
                    speed={50}
                    className="flex pb-[3.125rem] pt-8 lg:pb-[7.5rem] lg:pt-[60px]">
                    {[
                        ...SOCIAL_REWARDS_DATA,
                        ...SOCIAL_REWARDS_DATA,
                        ...SOCIAL_REWARDS_DATA,
                    ].map((reward, index) => (
                        <div
                            className="px-2"
                            key={`way-to-earn-reward-${index}`}>
                            <RewardItem
                                {...reward}
                                className="md:min-h-[226.95px] md:min-w-[215px]"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default WaysToEarnSection;
