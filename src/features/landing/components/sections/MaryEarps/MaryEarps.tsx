import Container from '@/components/container';
import Image from 'next/image';
import React from 'react';
import image from '@/assets/mary.webp';
import imageCropped from '@/assets/mary-1.webp';
import { Button } from '@/components/ui/button';

const MaryEarps = () => {
    return (
        <section className="relative w-full">
            <Image
                src={image}
                width={0}
                height={0}
                alt="christiana"
                className="absolute left-0 top-0 hidden h-full w-full object-cover lg:block"
            />

            <div className="relative z-[1] flex w-full items-center py-[3.125rem] lg:aspect-[1439/651] lg:bg-gradient-10 lg:py-[8.75rem]">
                <Container>
                    <div className="lg:gap4 mx-auto flex w-full max-w-[335px] flex-col gap-10 text-center md:max-w-[563px] lg:mr-[40px] lg:gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-[12px] font-bold md:text-[14px]">
                                BBC Sports Personality of the year
                            </div>

                            <h2>
                                Trusted by Football Star{' '}
                                <br className="hidden lg:block" />
                                <span className="font-medium">Mary Earps</span>
                            </h2>

                            <p className="text-paragraph-4 italic lg:text-paragraph-2">{`“Things are really out of your control in goalkeeping. It requires real mental strength and focus. Nutriburst’s Vitamins give me that extra edge.”`}</p>
                            <Button className="mt-1 lg:mt-2" variant={'dark'}>
                                Shop Mary’s choices
                            </Button>
                        </div>

                        <Image
                            src={imageCropped}
                            width={0}
                            height={0}
                            alt="christiana"
                            className="left-0 top-0 h-[317px] w-full rounded-[10px] object-cover lg:hidden"
                        />
                    </div>
                </Container>
            </div>
        </section>
    );
};

export { MaryEarps };
