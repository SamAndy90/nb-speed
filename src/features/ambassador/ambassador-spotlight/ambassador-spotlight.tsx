import Container from '@/components/container';
import React from 'react';
import image from '@/assets/mary-2.webp';
import Image from 'next/image';

const AmbassadorSpotlight = () => {
    return (
        <section className="pt-[3.125rem] lg:pt-[7.5rem]">
            <Container className="flex flex-col gap-8">
                <div className="flex flex-col justify-between gap-8 lg:flex-row">
                    <div className="w-full lg:max-w-[603px]">
                        <h2>
                            <span className="font-medium text-accent-green">
                                Nutriburst Ambassador
                            </span>
                            <br />& BBC Sports Personality of the Year
                        </h2>
                    </div>

                    <div className="w-full lg:max-w-[466px]">
                        <p className="text-paragraph-4 lg:text-paragraph-3">
                            Nutriburst Ambassador and BBC Sports Personality of
                            the Year. We’re thrilled to announce powerhouse
                            goalkeeper Mary Earps has joined the Nutriburst team
                            as our new ambassador. Recently named BBC’s Sport
                            Personality of the Year, Mary is an advocate for
                            health and wellness with an impressive career in the
                            FA Women's Super League and representing England on
                            the international stage.
                        </p>
                    </div>
                </div>
                <picture className="relative rounded-[10px] overflow-hidden">
                    <div className="bg-gradient-11 absolute bottom-0 left-0 w-full p-5 text-white lg:top-0 lg:bg-none lg:p-[3.125rem]">
                        <div className="flex w-full max-w-[279px] flex-col gap-4 md:max-w-[376px]">
                            <h4>Go for performance gold</h4>
                            <p className="text-paragraph-4">
                                As a leader passionate about promoting women in
                                sports, see how Mary trusts Nutriburst to
                                support her mental and physical goals on and off
                                the pitch.
                            </p>
                        </div>
                    </div>
                    <Image
                        src={image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="Mary"
                        className="aspect-[1.006] w-full rounded-[10px] object-cover md:aspect-[1.81]"
                    />
                </picture>
            </Container>
        </section>
    );
};

export default AmbassadorSpotlight;
