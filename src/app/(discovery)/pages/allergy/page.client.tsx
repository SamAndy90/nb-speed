'use client';

import { LovedBy } from '@/features/landing/components/sections/LovedBy';
import { GotQuestions } from '@/features/landing/components/sections/GotQuestions';
import { GradientBackground } from '@/features/landing/components/GradientBackground';
import { FindUsIn } from '@/features/landing/components/sections/FindUsIn';
import SectionSpacer from '@/components/SectionSpacer';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import AllergyMobileImage from '@/assets/discovery/pages/allergy/mobile_800_x_1230.jpg';
import AllergyDesktopImage from '@/assets/discovery/pages/allergy/desktop_1400_x_600.jpg';
import { allergyDiscountSubmissiontoKlaviyo } from '@/actions/klaviyo';
import { useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { NewsLetterInput } from '@/components/NewsLetterInput';
import PoweredByNature from '@/features/pages/poweredByNature';
import TipsForHealthierYou from '@/features/pages/tipsForHealthierYou';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Product } from '@/features/product/types';
import { ProductCard } from '@/features/landing/components/ProductCard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type ProductWithRatingsAndReviewCount = Product & {
    rating: number;
    reviewCount: number;
};

export default function AllergyDiscount({
    products,
}: {
    products: ProductWithRatingsAndReviewCount[];
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [selectedDiscountOption, setSelectedDiscountOption] = useState('');
    const desktop = useMediaQuery('md');
    const discountOptions = [
        {
            label: 'Gut health',
            value: 'gut_health',
        },
        {
            label: 'Immune resilience',
            value: 'immune_resilience',
        },
        {
            label: 'Reducing fatigue',
            value: 'reducing_fatigue',
        },
        {
            label: 'Stress & relaxation',
            value: 'stress_and_relaxation',
        },
        {
            label: 'Skin health',
            value: 'skin_health',
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setSubmitError('Please enter your email');
            return;
        }

        if (!selectedDiscountOption) {
            setSubmitError('Please select a discount option');
            return;
        }

        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError(null);

        allergyDiscountSubmissiontoKlaviyo({
            email,
            discountOption: selectedDiscountOption,
        }).then((data) => {
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
                        srcSet={AllergyMobileImage.src}
                    />
                    <img
                        src={AllergyDesktopImage.src}
                        alt="Spond discount Banner"
                        className="w-full"
                    />
                </picture>
            </div>

            <GradientBackground variant="section-3">
                <section className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-5 py-0 md:py-12">
                    <div className="space-y-[14px] self-start md:self-center">
                        {desktop ? (
                            <>
                                <h2 className="bg-cooper-text-gradient bg-clip-text text-center text-[32px] font-bold leading-10 text-transparent md:text-[50px] md:leading-[62px]">
                                    Claim
                                    <span className="text-[32px] font-[300] leading-10 text-black md:text-[50px] md:leading-[62px]">
                                        &nbsp;Your 25% off
                                    </span>
                                </h2>
                                <p className="text-center font-bold leading-4 sm:text-[16px] md:text-[32px] md:leading-[32px]">
                                    What are you most interested in improving?
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="bg-cooper-text-gradient bg-clip-text pt-[35px] text-[32px] font-bold leading-10 text-transparent md:text-[50px] md:leading-[62px]">
                                    Claim
                                    <br />
                                    <span className="text-[32px] font-[300] leading-10 text-black md:text-[50px] md:leading-[62px]">
                                        Your 25% off
                                    </span>
                                </h2>
                                <p className="text-[24px] font-semibold leading-6 md:text-[32px] md:leading-[32px]">
                                    What are you most interested in improving?
                                </p>
                            </>
                        )}
                    </div>

                    <div className="form flex w-full flex-col gap-5 pb-5 md:pb-0">
                        <form onSubmit={handleSubmit}>
                            <div className="pb-8 pt-0 md:py-14 md:pt-4">
                                <RadioGroup
                                    className="flex flex-col gap-3 md:flex-row md:justify-center md:gap-4"
                                    value={selectedDiscountOption}
                                    onValueChange={setSelectedDiscountOption}>
                                    {discountOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className="flex items-center gap-3">
                                            <RadioGroupItem
                                                value={option.value}
                                                id={option.value}
                                            />
                                            <Label
                                                htmlFor={option.value}
                                                className="text-sm">
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            {selectedDiscountOption && (
                                <>
                                    <div className="flex flex-col items-center gap-[16px] md:flex-row md:justify-center">
                                        <NewsLetterInput
                                            placeholder="Enter Your Email"
                                            className="md:max-w-[448px]"
                                            type="email"
                                            required={true}
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            disabled={isSubmitting}
                                        />
                                        <div className="w-full md:max-w-[244px] [&>button]:mt-0 [&_div]:text-sm">
                                            <PrimaryFormSubmitButton
                                                disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    <Spinner />
                                                ) : desktop ? (
                                                    'Send Me My Code'
                                                ) : (
                                                    'GET MY 25% OFF'
                                                )}
                                            </PrimaryFormSubmitButton>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-center text-[12px] leading-5 md:text-base md:font-semibold md:leading-8">
                                        {desktop ? (
                                            <span>
                                                Enter your email to recieve your
                                                exlusive spond discount Code.
                                            </span>
                                        ) : (
                                            <span>
                                                We&apos;ll email you a discount
                                                code straight away.
                                                <br />
                                                No spam, ever.
                                            </span>
                                        )}
                                    </p>
                                </>
                            )}
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

            <PoweredByNature />

            <TipsForHealthierYou />

            <GradientBackground variant="section-3">
                <div className="scrollbar-hide flex w-full gap-4 overflow-scroll px-5 py-20 pb-16 md:justify-center md:gap-12">
                    {products.map((product) => (
                        <ProductCard
                            product={product}
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                            collection={'collection'}
                            primaryButtonText="Buy now"
                            learnMoreHidden={true}
                        />
                    ))}
                </div>
            </GradientBackground>

            <GradientBackground variant="section-3">
                <LovedBy />
                <a
                    className="mx-auto -mt-10 flex w-full items-center justify-center px-5 pb-14 md:w-[298px] md:pb-20 [&_div]:text-sm"
                    href="/collections/all-products">
                    <PrimaryFormSubmitButton>
                        Shop our Vitamins
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
