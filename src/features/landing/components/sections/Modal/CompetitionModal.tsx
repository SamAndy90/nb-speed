'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Variants } from 'framer-motion';
import { PrimaryButton } from '@/components/v2/PrimaryButton';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CompetitionModalProps {
    /** Main heading text */
    headingText: string;
    /** Large "WIN" or prize action text */
    actionText?: string;
    /** Prize description */
    prizeDescription: string;
    /** CTA button text */
    ctaText?: string;
    /** Competition page URL */
    competitionUrl: string;
    /** Learn more URL */
    learnMoreUrl: string;
    /** Image source */
    imageSrc: string;
    /** Mobile image source (optional, falls back to imageSrc) */
    mobileImageSrc?: string;
    /** Image alt text */
    imageAlt?: string;
    /** Session storage key (to track if shown) */
    sessionStorageKey?: string;
    /** Delay before showing modal (in ms) */
    showDelay?: number;
}

const ContainerVariants: Variants = {
    hide: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
};

const CloseButtonVariants: Variants = {
    hide: { scale: 0 },
    show: { scale: 1 },
    exit: { scale: 0 },
};

export default function CompetitionModal({
    headingText,
    actionText = 'WIN',
    prizeDescription,
    ctaText = 'Enter Competition Now! 🎉',
    competitionUrl,
    learnMoreUrl,
    imageSrc,
    mobileImageSrc,
    imageAlt = 'Competition',
    sessionStorageKey = 'competition-modal-shown',
    showDelay = 2000,
}: CompetitionModalProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('md');

    // Check if modal should show (once per session)
    useEffect(() => {
        // Check if modal has already been shown this session
        const hasShownModal = sessionStorage.getItem(sessionStorageKey);

        if (!hasShownModal) {
            // Small delay to ensure page has loaded
            const timer = setTimeout(() => {
                setOpen(true);
                // Mark as shown for this session
                sessionStorage.setItem(sessionStorageKey, 'true');
            }, showDelay);

            return () => clearTimeout(timer);
        }
    }, [sessionStorageKey, showDelay]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCompetitionClick = () => {
        handleClose();
        // Navigation will be handled by the Link component
    };

    return (
        <div
            className={cn('fixed inset-0 z-50', {
                hidden: !open,
            })}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    dialogCloseClassName="absolute right-2 top-2"
                    className="flex w-[calc(100%-2.5rem)] max-w-screen-md flex-col gap-0 overflow-clip rounded-lg border-none px-0 py-0 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Competition Image */}
                        <div>
                            {isDesktop ? (
                                <div className={'relative flex h-full w-full'}>
                                    <Image
                                        src={imageSrc}
                                        alt={imageAlt}
                                        fill
                                        sizes={'(max-width: 1024px) 50vw, 33vw'}
                                        className={'object-cover'}
                                    />
                                </div>
                            ) : (
                                <Image
                                    src={mobileImageSrc ?? ''}
                                    alt={imageAlt}
                                    width={800}
                                    height={800}
                                    sizes={'100vw'}
                                    className={'object-cover'}
                                />
                            )}
                        </div>

                        <div className="flex flex-col items-center p-5">
                            {/* Main Heading */}
                            <h2 className="mb-4 text-[26px] font-bold leading-[34px] md:text-[24px]">
                                {headingText}
                                {actionText && (
                                    <>
                                        <br />
                                        <span className="text-3xl text-accent-pink md:text-4xl">
                                            {actionText}
                                        </span>
                                    </>
                                )}
                            </h2>

                            {/* Prize Description */}
                            <p className="mb-6 max-w-md px-[18px] font-semibold text-gray-800 md:px-0 md:text-[16px]">
                                {prizeDescription}
                            </p>

                            <div className="flex w-full flex-col items-center gap-4">
                                {/* CTA Button */}
                                <Link
                                    href={competitionUrl}
                                    onClick={handleCompetitionClick}
                                    className="w-full max-w-sm">
                                    <PrimaryButton
                                        type="submit"
                                        className="relative h-[42px] w-[100%] flex-row items-center justify-center text-sm md:h-[46px] md:w-full md:max-w-[297px]"
                                        href={competitionUrl}
                                        as={Link}
                                        animateText
                                        align="left">
                                        {ctaText}
                                    </PrimaryButton>
                                </Link>

                                <Link
                                    href={learnMoreUrl}
                                    className="w-[100%] max-w-sm">
                                    <PrimaryButton
                                        type="submit"
                                        className="relative h-[42px] w-[100%] flex-row items-center justify-center text-sm md:h-[46px] md:w-full md:max-w-[297px]"
                                        href={learnMoreUrl}
                                        as={Link}
                                        animateText
                                        align="left">
                                        Learn More
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
