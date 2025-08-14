import Container from '@/components/container';
import React from 'react';
import SustainabilityPromise from './sustainability-promise';
import TrustedByOver from './trusted-by-over';
import Certificates from './certificates';
import FeaturedIn from './featured-in';

const TrustedCertifiedSection = () => {
    return (
        <section className="bg-section bg-gradient-section pb-[3.125rem] lg:pb-[7.5rem]">
            <Container>
                <div className="mx-auto flex max-w-[790px] flex-col items-center gap-4 text-center lg:gap-6">
                    <h2 className="font-light md:font-light">
                        Science Made Sweet
                        <br />
                        <span className="font-medium text-accent-pink">
                            The New Standard for Wellness.
                        </span>
                    </h2>
                    <p className="mx-auto max-w-[690px] text-paragraph-4 lg:text-paragraph-2">
                        At Nutriburst, redefining wellness means more than
                        creating smarter supplements. It means raising the
                        standard for science, for quality, for sustainability,
                        and for you.
                    </p>
                    <p className="mx-auto max-w-[690px] text-paragraph-4 lg:text-paragraph-2">
                        We believe better health starts with better choices:
                        clean ingredients, trusted research, and a commitment to
                        doing right by people and the planet. Every Nutriburst
                        product is a reflection of our values: science you can
                        trust, quality without compromise, and a belief that
                        wellness should be a joy, not a chore.
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 lg:mt-20 lg:gap-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:gap-6">
                        <SustainabilityPromise />
                        <div className="flex w-full flex-col gap-3 lg:min-w-[580px] lg:gap-6">
                            <TrustedByOver />
                            <Certificates />
                        </div>
                    </div>
                    <FeaturedIn />
                </div>
            </Container>
        </section>
    );
};

export default TrustedCertifiedSection;
