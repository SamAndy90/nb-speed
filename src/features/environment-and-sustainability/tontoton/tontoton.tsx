import Container from '@/components/container';
import Image from 'next/image';
import React from 'react';
import ao0a7122 from '@/assets/sustainability/girl-volunteer-collects-garbage-forest-takes-care-environment.webp';
import { POSITIVE_IMPACT_CREATED } from '../consts';

const DESCRIPTION = `Through our partnership with Clime Co, we're proud to
support the TONTOTON project, an initiative with
significant co-benefits for economically stressed local
workers who voluntarily remove plastic in Vietnam and
Cambodia. Under this program, these workers, who are
primarily female, receive above-average pay, personal
protective equipment, and primary health insurance.`;
const TontotonSection = () => {
    return (
        <section className="bg-gradient-section py-[3.125rem] lg:py-[7.5rem]">
            <Container className="flex flex-col gap-8 lg:gap-[60px]">
                <div className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:gap-[78px]">
                    <p className="w-full text-paragraph-4 lg:hidden lg:max-w-[480px] lg:text-paragraph-3">
                        {DESCRIPTION}
                    </p>

                    <picture className="flex w-full rounded-[10px] lg:max-w-[580px]">
                        <Image
                            src={ao0a7122}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            className="aspect-[1.2] w-full rounded-[inherit] object-cover"
                        />
                    </picture>

                    <div className="flex w-full flex-col gap-8 lg:max-w-[500px]">
                        <h2>
                            Plastic waste recovery through the <br />
                            <span className="font-medium text-accent-green">
                                TONTOTON project
                            </span>
                        </h2>

                        <p className="hidden w-full text-paragraph-4 lg:block lg:max-w-[480px] lg:text-paragraph-3">
                            {DESCRIPTION}
                        </p>
                    </div>
                </div>

                <div className="mx-auto flex w-full flex-col gap-6 lg:mx-0">
                    <h3>Positive impact created</h3>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-[60px]">
                        {POSITIVE_IMPACT_CREATED.map((item, index) => (
                            <div
                                key={`POSITIVE_IMPACT-item-${index}`}
                                className="flex flex-col gap-3">
                                <div className="text-paragraph-3 font-bold">
                                    {item.title}
                                </div>
                                <div className="text-paragraph-4 lg:text-paragraph-3">
                                    <p>{item.description}</p>
                                    <div>
                                        {item?.list &&
                                            item.list.map((el, index) => (
                                                <div
                                                    key={`POSITIVE_IMPACT-item-list-item${index}`}>
                                                    {el}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default TontotonSection;
