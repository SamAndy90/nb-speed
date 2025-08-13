import Container from '@/components/container';
import Image from 'next/image';
import React from 'react';
import image from '@/assets/christianna-2.webp';
import imageCropped from '@/assets/christianna-2-cropped.webp';

import Link from 'next/link';
import FacebookGradient from '@/assets/icons/facebook-gradient.svg';
import InstagramGradient from '@/assets/icons/instagram-gradient.svg';

const GetInTouch = () => {
    return (
        <section className="relative lg:mb-[7.5rem]">
            <Image
                src={image}
                width={0}
                height={0}
                alt="christiana"
                className="absolute left-0 top-0 hidden h-full w-full object-cover lg:block"
            />

            <div className="relative z-[1] w-full py-[3.125rem] lg:bg-gradient-9 lg:py-[7.5rem]">
                <Container>
                    <div className="mx-auto flex w-full flex-col gap-6 text-left lg:ml-[80px] lg:max-w-[420px] lg:text-center">
                        <div className="hidden text-paragraph-1 lg:block">
                            STAY CONNECTED
                        </div>

                        <h2>
                            <span className="font-medium text-accent-pink">
                                Connect
                            </span>
                            <br />
                            with Christianna
                        </h2>

                        <Image
                            src={imageCropped}
                            width={0}
                            height={0}
                            alt="christiana"
                            className="left-0 top-0 h-[317px] w-full rounded-[10px] object-cover lg:hidden"
                        />

                        <p>
                            Join Christianna on her journey to empower
                            individuals to make informed choices about their
                            health. Follow her on our Nutribust social media for
                            the latest updates, nutritious recipes, and expert
                            advice. Follow Christianna
                            @christianna.nutritionist.
                        </p>

                        <div className="flex items-center gap-3 *:transition-all hover:*:scale-110 lg:justify-center">
                            <Link
                                href="https://www.facebook.com/eathappyfeelgood/"
                                target={'_blank'}>
                                <FacebookGradient className="h-[38px]" />
                            </Link>
                            <Link
                                href="https://www.instagram.com/christianna.nutritionist/"
                                target={'_blank'}>
                                <InstagramGradient className="h-[38px]" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default GetInTouch;
