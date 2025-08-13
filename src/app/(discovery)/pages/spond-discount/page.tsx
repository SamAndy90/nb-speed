'use client';

import { JoinTheCommunity } from '@/features/landing/components/sections/JoinTheCommunity';
import { BlogPosts } from '@/features/landing/components/sections/News.tsx/BlogPosts';
import { LovedBy } from '@/features/landing/components/sections/LovedBy';
import { GotQuestions } from '@/features/landing/components/sections/GotQuestions';
import { GradientBackground } from '@/features/landing/components/GradientBackground';
import { TrustedByExperts } from '@/features/product/components/sections/TrustedByExperts';
import { FindUsIn } from '@/features/landing/components/sections/FindUsIn';
import SectionSpacer from '@/components/SectionSpacer';
import InstagramFeedsWidget from '@/components/InstagramFeedsWidget';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import SpondDiscountMobileImage from '@/assets/discovery/pages/spond-discount/spond-discount-mobile.jpg';
import SpondDiscountDesktopImage from '@/assets/discovery/pages/spond-discount/spond-discount-desktop.jpg';
import { spondDiscountSubmissiontoKlaviyo } from '@/actions/klaviyo';
import { useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { NewsLetterInput } from '@/components/NewsLetterInput';
import WhyChooseGummies from '@/features/pages/whyChooseGummies';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function SpondDiscount() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const desktop = useMediaQuery('md');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setSubmitError('Please enter your email');
            return;
        }

        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError(null);

        spondDiscountSubmissiontoKlaviyo({ email }).then((data) => {
            setIsSubmitting(false);
            if (data.success) {
                setSubmitError(null);
                setSubmitSuccess(true);
                setEmail('');

                // show success message for 5 seconds
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 5000);
            } else {
                if (data.serverError) {
                    setSubmitError('Server error. Please try again later.');
                } else {
                    setSubmitError(data.error);
                }
            }
        });
    };

    return (
        <>
            <div className="flex w-full items-center justify-center">
                <picture className="w-full">
                    <source
                        media="(max-width: 768px)"
                        srcSet={SpondDiscountMobileImage.src}
                    />
                    <img
                        src={SpondDiscountDesktopImage.src}
                        alt="Spond discount Banner"
                        className="w-full"
                    />
                </picture>
            </div>

            <GradientBackground variant="section-3">
                <section className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-5 py-6 md:py-12">
                    <div className="space-y-[14px]">
                        {desktop ? (
                            <>
                                <h2 className="bg-cooper-text-gradient bg-clip-text text-center text-[32px] font-bold leading-10 text-transparent md:text-[50px] md:leading-[62px]">
                                    Trusted by athletes.
                                    <span className="text-[32px] font-[300] leading-10 text-black md:text-[50px] md:leading-[62px]">
                                        &nbsp;Backed by science.
                                    </span>
                                </h2>
                                <p className="text-center font-[400] leading-4 sm:text-[16px] md:text-[32px] md:leading-[32px]">
                                    Get high-performance vitamin gummies{' '}
                                    <span className="font-bold">
                                        - made for real results
                                    </span>
                                    .
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="bg-cooper-text-gradient bg-clip-text pt-[57px] text-center text-[32px] font-bold leading-10 text-transparent md:text-[50px] md:leading-[62px]">
                                    Trusted by athletes.
                                    <br />
                                    <span className="text-[32px] font-[300] leading-10 text-black md:text-[50px] md:leading-[62px]">
                                        Backed by science.
                                    </span>
                                </h2>
                                <p className="text-center text-[16px] font-[400] leading-4 md:text-[32px] md:leading-[32px]">
                                    Get high-performance vitamin gummies
                                    <br />
                                    <span className="font-bold">
                                        - made for real results
                                    </span>
                                    .
                                </p>
                            </>
                        )}
                    </div>

                    <div className="form mt-[49px] flex flex-col gap-5 md:mt-[38px]">
                        <p className="text-center font-semibold leading-5 md:text-2xl md:leading-8">
                            Enter your email to recieve your exlusive 40%
                            discount Code.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center gap-[16px] md:flex-row md:justify-center">
                                <NewsLetterInput
                                    placeholder="Enter Your Email"
                                    type="email"
                                    required={true}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                />
                                <div className="w-full md:max-w-[244px] [&>button]:mt-0 [&_div]:text-sm">
                                    <PrimaryFormSubmitButton
                                        disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <Spinner />
                                        ) : (
                                            'Send Me My Code'
                                        )}
                                    </PrimaryFormSubmitButton>
                                </div>
                            </div>
                            {submitSuccess && (
                                <p className="mt-2 text-sm text-green-500 md:text-center">
                                    Thank you for your submission! We'll be in
                                    touch soon.
                                </p>
                            )}
                            {submitError && (
                                <p className="mt-2 text-sm text-red-500 md:text-center">
                                    {submitError}
                                </p>
                            )}
                        </form>
                    </div>
                </section>
            </GradientBackground>

            <WhyChooseGummies />

            {/* <MeetOurNutritionist /> */}
            <TrustedByExperts />
            <GradientBackground variant="section-3">
                <LovedBy />
                <a
                    className="mx-auto -mt-10 flex w-full items-center justify-center px-5 pb-14 md:w-[298px] md:pb-20 [&_div]:text-sm"
                    href="/collections/all-products">
                    <PrimaryFormSubmitButton>
                        Shop Full Range
                    </PrimaryFormSubmitButton>
                </a>
            </GradientBackground>
            {desktop && <SectionSpacer hasBackground={true} />}
            <GotQuestions />
            {desktop && <SectionSpacer hasBackground={true} />}
            <FindUsIn />
            <SectionSpacer
                hasBackground={true}
                customSpacing="md:h-[100px] h-[50px]"
            />
            {/* <NutriburstLifestyle /> */}
            {/*<News />*/}
            {/* Instagram feed */}
        </>
    );
}
