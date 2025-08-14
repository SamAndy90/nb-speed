import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { cn } from '@/lib/utils';
import Check from '@/assets/icons/check.svg';
import Close from '@/assets/icons/close.svg';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MotionButton } from '@/features/motion/components';
import React from 'react';
import { LeftSection } from '@/features/blog/join-the-community/join-the-community';
import NewsletterInputWithButton from '@/components/newsletter-input-width-button';

function PrimaryInput({
    status,
}: {
    status: 'pending' | 'success' | 'error' | null;
}) {
    console.log('status:', status);
    const isSuccess = status === 'success';
    return (
        <div className="group relative flex w-full max-w-[304px] items-center overflow-clip rounded-full p-px *:duration-700">
            <Button
                className={cn(
                    'absolute left-[-15%] z-20 size-[calc(3.5rem-8px)] rounded-full bg-gradient-2 transition-all',
                    !isSuccess && 'group-hover:left-1'
                )}
                size="icon">
                <ChevronRight className="h-4 w-4" />
            </Button>
            <input
                placeholder="Your best email"
                className={cn(
                    'peer/input z-10 h-14 w-full rounded-full pl-4 outline-none transition-all placeholder:font-semibold placeholder:text-neutral-400 focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
                    isSuccess ? '' : 'focus:bg-theme-50 group-hover:pl-[18%]'
                )}
                required
                name="discountCode"
            />
            <Button
                className={cn(
                    'absolute right-1 z-20 size-[calc(3.5rem-8px)] rounded-full transition-all',
                    isSuccess
                        ? 'bg-transparent text-success-600'
                        : 'bg-gradient-2 group-hover:right-[-15%]'
                )}
                size="icon">
                {isSuccess ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </Button>
            <div
                key={status}
                className={cn(
                    'absolute inset-0 size-full rounded-full bg-border transition-all animate-in fade-in',
                    isSuccess
                        ? 'bg-success-600'
                        : 'bg-border peer-focus/input:bg-gradient-3'
                )}
            />
        </div>
    );
}
//style={{background: 'linear-gradient(146.31deg, #B9846F 10%, #EFD0B6 33.96%, #B08271 96.67%)'}}
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
export function DiscountBadge({
    badgeShown,
    setBadgeShown,
}: {
    badgeShown: boolean;
    setBadgeShown: (value: boolean) => void;
}) {
    return (
        <Dialog>
            <AnimatePresence>
                {badgeShown && (
                    <motion.div
                        className="fixed bottom-[7px] right-[7px] z-50 md:bottom-9 md:right-9"
                        variants={ContainerVariants}
                        initial="hide"
                        animate="show"
                        exit="exit"
                        transition={{ delayChildren: 0.2 }}>
                        <DialogTrigger asChild>
                            <Button className="flex size-[98px] flex-col rounded-full bg-primary text-[9px] font-bold drop-shadow-card hover:bg-theme-50 md:size-32 md:text-xs">
                                Claim your
                                <div className="text-[30px] text-transparent bg-clip-text bg-gradient-to-r from-[#B9846F] via-[#D4B091] to-[#B08271] leading-[1.05]  md:text-[40px] md:leading-[1.05]">
                                    10%
                                </div>
                                off your order
                            </Button>
                        </DialogTrigger>
                        <MotionButton
                            className="absolute right-1 top-1 size-5 rounded-full border border-border bg-primary p-1.5 drop-shadow-card hover:bg-theme-50 md:size-6"
                            variant="icon"
                            size="inline"
                            onClick={() => setBadgeShown(false)}
                            variants={CloseButtonVariants}>
                            <Close className="size-full" />
                        </MotionButton>
                    </motion.div>
                )}
            </AnimatePresence>

            <DialogContent className="flex w-[calc(100%-2.5rem)] max-w-screen-md flex-col gap-0 rounded-lg px-4 pb-14 text-center md:px-5">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-8 w-full object-contain md:max-w-[534px]">
                        <LeftSection />
                    </div>
                    <h2 className="mb-4">
                        Join the community <br />{' '}
                        <b className="text-accent-pink">& receive 10% off!</b>
                    </h2>
                    <p className="mb-6 max-w-md text-lg">
                        Sign up for emails and save 10% OFF on your first gummy
                        vitamins
                    </p>
                    <NewsletterInputWithButton/>
                    {/*<PrimaryInput status={null} />*/}
                </div>
            </DialogContent>
        </Dialog>
    );
}
