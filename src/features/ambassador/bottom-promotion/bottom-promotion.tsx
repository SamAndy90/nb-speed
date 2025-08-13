import Container from '@/components/container';
import Image from 'next/image';
import React from 'react';
import image from '@/assets/mary.webp';
import imageCropped from '@/assets/mary-1.webp';
import { Button } from '@/components/ui/button';

const BottomPromotionSection = () => {
    return (
        <section className="relative lg:mb-[7.5rem]">
            <Image
                src={image}
                width={0}
                height={0}
                alt="christiana"
                className="absolute left-0 top-0 hidden h-full w-full object-cover lg:block"
            />

            <div className="lg:bg-gradient-10 relative z-[1] flex w-full items-center py-[3.125rem] lg:min-h-[651px] lg:py-[8.75rem]">
                <Container>
                    <div className="lg:gap4 mx-auto flex w-full max-w-[335px] flex-col gap-10 text-center md:max-w-[614px] lg:mr-[40px] lg:gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="text-[12px] font-bold md:text-[14px]">
                                GET STRONG, STAY STRONG
                            </div>

                            <h2>
                                Become a Lioness like
                                <br />
                                <span className="font-medium text-accent-green">
                                    football star Mary Earps
                                </span>
                            </h2>
                        </div>

                        <Image
                            src={imageCropped}
                            width={0}
                            height={0}
                            alt="christiana"
                            className="left-0 top-0 h-[317px] w-full rounded-[10px] object-cover lg:hidden"
                        />

                        <div className="">
                            <Button variant={'dark'}>
                                Shop Mary’s choices
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default BottomPromotionSection;
