import Container from '@/components/container';
import Image from 'next/image';
import React from 'react';
import beach from '@/assets/beach.webp';

const DESCRIPTION = `We’re part of ClimeCo’s EcoCommitted Partner
programme to further our commitment to
sustainability and the environment by offsetting our
carbon footprint through events, shipping, and more.`;

const CarbonOffsetSection = () => {
    return (
        <section className="bg-gradient-section py-[3.125rem] lg:py-[7.5rem]">
            <Container className="flex flex-col gap-8 lg:gap-[60px]">
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-[78px]">
                    <div className="flex w-full flex-col gap-8 lg:max-w-[500px]">
                        <h2>
                            Offsetting carbon emissions with <br />
                            <span className="font-medium text-accent-green">
                                ClimeCo’s Eco Committed Partner
                            </span>
                        </h2>

                        <p className="hidden w-full lg:block lg:max-w-[480px]">
                            {DESCRIPTION}
                        </p>
                    </div>

                    <picture className="flex w-full rounded-[10px] lg:max-w-[580px]">
                        <Image
                            src={beach}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            className="aspect-[1.2] w-full rounded-[inherit] object-cover"
                        />
                    </picture>

                    <p className="w-full text-paragraph-4 lg:hidden lg:max-w-[480px] lg:text-paragraph-3">
                        {DESCRIPTION}
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row lg:gap-[78px]">
                    <p className="w-full text-paragraph-4 lg:max-w-[500px] lg:text-paragraph-3">
                        This initiative is a part of our broader effort to
                        support projects like the Nitrous Oxide Capture at
                        Ascend Performance Materials in Florida, USA. Registered
                        with the Climate Action Reserve as CAR1480, this project
                        captures and destroys nitrous oxide (N2O), a greenhouse
                        gas nearly 300 times more potent than CO2, stemming from
                        nitric acid production.
                    </p>
                    <p className="w-full text-paragraph-4 lg:text-paragraph-3">
                        Ascend's proprietary technology and Thermal Reduction
                        Unit (TRU) effectively destroy N2O at the source,
                        preventing its release into the atmosphere. By
                        partnering with ClimeCo, a leader in voluntary carbon
                        project development, we ensure that our efforts
                        contribute to permanent emission reductions, backed by
                        rigorous monitoring and verification, supporting our
                        organisational carbon reduction goals
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default CarbonOffsetSection;
