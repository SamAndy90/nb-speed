'use client';

import React, { useState, useRef, useEffect } from 'react';
import minionsV2BannerDesktop from '@/assets/discovery/pages/Desktop--1400-x-600.jpg';
import minionsV2BannerMobile from '@/assets/discovery/pages/Mobile_800x1230.jpg';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PrimaryFormSubmitButton } from '@/components/FormSubmitButton';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from '@/features/pages/imageInput';
import { minionsRewardsSubmissiontoKlaviyo } from '@/actions/klaviyo';
import { Spinner } from '@/components/Spinner';
import Image from 'next/image';

export default function MinionsV2() {
    const [fileError, setFileError] = useState<string | null>('');
    const [formData, setFormData] = useState<{
        email: string;
        firstName: string;
        surname: string;
        childrenCount: number;
        termsAccepted: boolean;
        marketingAccepted: boolean;
        contactOnWinAccepted: boolean;
        receipt: File | null;
    }>({
        email: '',
        firstName: '',
        surname: '',
        childrenCount: 0,
        termsAccepted: false,
        marketingAccepted: false,
        contactOnWinAccepted: false,
        receipt: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const termsAndConditionsRef = useRef<HTMLButtonElement>(null);

    function setFile(file: File | null) {
        setFormData({ ...formData, receipt: file });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.receipt) {
            setFileError('Please upload a valid receipt (PDF, PNG or JPG)');
            return;
        }

        const { receipt, ...data } = formData;

        const bytes = await receipt.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileType = receipt.type;

        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError(null);

        minionsRewardsSubmissiontoKlaviyo({
            ...data,
            recieptBase64: buffer.toString('base64'),
            recieptType: fileType,
        }).then((data) => {
            setIsSubmitting(false);
            if (data.success) {
                setSubmitError(null);
                setSubmitSuccess(true);
                setFormData({
                    email: '',
                    firstName: '',
                    surname: '',
                    childrenCount: 0,
                    termsAccepted: false,
                    marketingAccepted: false,
                    contactOnWinAccepted: false,
                    receipt: null,
                });

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
        <section className="bg-gradient-section pb-16">
            <div className="w-full">
                <div className="flex flex-col items-center text-center">
                    <picture className="w-full">
                        <source
                            media="(max-width: 768px)"
                            srcSet={minionsV2BannerMobile.src}
                        />
                        <Image
                            src={minionsV2BannerDesktop}
                            alt="Minions Banner"
                            className="w-full"
                        />
                    </picture>
                </div>
            </div>

            <div className="mx-auto mt-8 px-4 md:container">
                <Accordion type="single" collapsible className="px-0 md:px-24">
                    {/* How to enter */}

                    <AccordionItem key="item-1" value="item-1">
                        <AccordionTrigger>
                            <span className="font-bold md:text-2xl">
                                How To Enter
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc space-y-2 pl-5 md:pl-10 md:text-lg">
                                <li>Buy any 2 Minions gummy products</li>
                                <li>
                                    Take a picture of your receipt as proof of
                                    purchase
                                </li>
                                <li>Complete your details below</li>
                                <li>Upload your proof of purchase</li>
                                <li>
                                    Tick the box to agree to the Terms and
                                    Conditions
                                </li>
                                <li>Hit submit and you're all set</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Upload Your Receipt Form */}

                    <AccordionItem key="item-2" value="item-2">
                        <AccordionTrigger>
                            <span className="font-bold md:text-2xl">
                                Upload Your Receipt
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <form
                                className="mx-auto my-8 max-w-lg space-y-6"
                                onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2 p-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            required
                                            placeholder="Enter your email address"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2 p-1">
                                        <Label htmlFor="firstName">
                                            First name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            placeholder="Enter your first name"
                                            required
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    firstName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2 p-1">
                                        <Label htmlFor="surname">Surname</Label>
                                        <Input
                                            id="surname"
                                            value={formData.surname}
                                            placeholder="Enter your surname"
                                            required
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    surname: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2 p-1">
                                        <Label htmlFor="childrenCount">
                                            How many children are in your
                                            household?
                                        </Label>
                                        <Input
                                            id="childrenCount"
                                            type="number"
                                            min="0"
                                            value={
                                                formData.childrenCount > 0
                                                    ? formData.childrenCount
                                                    : ''
                                            }
                                            placeholder="Enter number"
                                            required
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    childrenCount: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2 p-1">
                                        <ImageUpload
                                            setFile={setFile}
                                            setFileError={setFileError}
                                            fileError={fileError}
                                            file={formData.receipt}
                                        />
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={formData.termsAccepted}
                                            required
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    termsAccepted:
                                                        checked as boolean,
                                                })
                                            }
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label
                                                htmlFor="terms"
                                                className="text-sm font-normal">
                                                I accept the{' '}
                                                <a
                                                    href="#terms-and-conditions"
                                                    onClick={() => {
                                                        termsAndConditionsRef.current?.click();
                                                    }}
                                                    className="text-blue-600 hover:underline">
                                                    Terms and Conditions.
                                                </a>
                                            </Label>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2 pt-2">
                                        <Checkbox
                                            id="contactOnWin"
                                            checked={
                                                formData.contactOnWinAccepted
                                            }
                                            required
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    contactOnWinAccepted:
                                                        checked as boolean,
                                                })
                                            }
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label
                                                htmlFor="contactOnWin"
                                                className="text-sm font-normal">
                                                I agree to be contacted by
                                                Nutriburst Ltd if I win the
                                                competition.
                                            </Label>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2 pt-2">
                                        <Checkbox
                                            id="marketing"
                                            checked={formData.marketingAccepted}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    marketingAccepted:
                                                        checked as boolean,
                                                })
                                            }
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label
                                                htmlFor="marketing"
                                                className="text-sm font-normal">
                                                I agree to receive email updates
                                                about Nutriburst products,
                                                promotions and offers.
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                {submitError && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {submitError}
                                    </p>
                                )}
                                <PrimaryFormSubmitButton
                                    disabled={isSubmitting}>
                                    {isSubmitting ? <Spinner /> : 'Submit'}
                                </PrimaryFormSubmitButton>

                                {submitSuccess && (
                                    <p className="mt-2 text-sm text-green-500">
                                        Thank you for your submission! We'll be
                                        in touch soon.
                                    </p>
                                )}
                            </form>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Prize */}
                    <AccordionItem key="item-3" value="item-3">
                        <AccordionTrigger>
                            <span className="font-bold md:text-2xl">Prize</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc space-y-2 pl-5 md:pl-10 md:text-lg">
                                <li>
                                    Take your family of 4 (kids under 17) on the
                                    ultimate adventure
                                </li>
                                <li>
                                    Flights and Accommodation: All expenses
                                    covered.
                                </li>
                                <li>
                                    Park Entry: 4-day tickets to 3 incredible
                                    parks, including Minion Land
                                </li>
                                <li>Approximate Prize Value: £4,000</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    {/* T & C */}
                    <AccordionItem
                        key="item-4"
                        value="item-4"
                        id="terms-and-conditions">
                        <AccordionTrigger ref={termsAndConditionsRef}>
                            <span className="font-bold md:text-2xl">
                                Terms and Conditions
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal space-y-6 pl-5 md:pl-10 md:text-lg">
                                <li>
                                    This competition is open to residents of the
                                    UK, Channel Islands, Isle of Man and
                                    Republic of Ireland aged 18 years or over,
                                    except employees of Nutriburst, their
                                    families, agents or anyone else
                                    professionally associated with the draw.
                                </li>
                                <li>
                                    Enter your details via the Nutriburst
                                    website [www.nutriburstvitamins.com]
                                    including a proof of purchase (photograph of
                                    receipt) to be entered into the draw.
                                    Closing date 31st August 2025.
                                </li>
                                <li>
                                    Details of how to enter form part of the
                                    terms and conditions. It is a condition of
                                    entry that all rules are accepted as final
                                    and that the competitor agrees to abide by
                                    these rules. The decision of the Promoter is
                                    final and no correspondence will be entered
                                    into.
                                </li>
                                <li>
                                    One winner, plus one reserve, will be drawn
                                    at random from all eligible entries received
                                    by the closing date. Late, illegible,
                                    incomplete or corrupt entries will not be
                                    accepted. No responsibility can be accepted
                                    for lost entries and proof of transmission
                                    will not be accepted as proof of receipt.
                                </li>
                                <li>
                                    All entries must be received by 23.59 on
                                    31st August 2025.
                                </li>
                                <li>
                                    The winner will be notified within seven
                                    days of the closing date of the competition
                                    and will be notified in writing or by
                                    telephone. Winners will be required to
                                    confirm their acceptance of the prize within
                                    21 days of communication. If unclaimed or
                                    declined up to 21 days after confirmation,
                                    the prize will be cancelled and offered to
                                    the Reserve as replacement winner.
                                </li>
                                <li>
                                    One winner will win a six night stay at a
                                    hotel in Orlando, close to Universal
                                    Studios, for them and their family. For the
                                    purposes of this competition, ‘Family’ is
                                    deemed to be 2 adults and 2 children under
                                    17 years of age. Accommodation will be
                                    provided as a family room, on a bed and
                                    breakfast basis. The prize includes four
                                    return economy flights from the UK (London)
                                    to Orlando.
                                </li>
                                <li>
                                    Any travel expenses, drinks and other
                                    incidental costs other than those stated are
                                    not included. Winners are responsible for
                                    their own travel to and from the airport in
                                    the UK. Return transfers to/from the airport
                                    in Orlando are included.
                                </li>
                                <li>
                                    The prize has specific dates and winners
                                    must confirm that they are able to travel
                                    during the dates of October 13th to November
                                    1st (coinciding with their school Autumn
                                    half term dates).
                                </li>
                                <li>
                                    All elements of the prize are subject to
                                    availability, non-transferable,
                                    non-negotiable and there are no cash
                                    alternatives.
                                </li>
                                <li>
                                    By participating in the competition, each
                                    entrant agrees to allow Nutriburst Ltd to
                                    use their email address for future mailings
                                    and other communications regarding products
                                    and services. The entrant does however have
                                    the option to remove themselves from mailing
                                    lists at any time.
                                </li>
                                <li>
                                    It is the winner’s responsibility to check
                                    they and their family members travelling
                                    with them to have a valid passport, USA Visa
                                    and travel insurance.
                                </li>
                                <li>
                                    The winners may be required to participate
                                    in publicity.
                                </li>
                                <li>
                                    Events may occur that render the competition
                                    itself or the awarding of the prize
                                    impossible due to reasons beyond the control
                                    of the Promoter and accordingly the Promoter
                                    may at its absolute discretion vary or amend
                                    the promotion and the entrant agrees that no
                                    liability shall attach to the Promoter as a
                                    result thereof.
                                </li>
                                <li>
                                    English law applies and the exclusive
                                    jurisdiction of the English Courts shall
                                    prevail.
                                </li>
                                <li>
                                    The promoter is Nutriburst Ltd, Suite 1, 7th
                                    floor, 50 Broadway, LONDON, United Kingdom
                                    SW1H 0BL.
                                </li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}
