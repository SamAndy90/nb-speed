import Image, { ImageProps } from 'next/image';
import Check from '@/assets/icons/check.svg';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '@/types';
import { cn } from '@/lib/utils';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import mary from '@/assets/mary-face.png';
import Link from 'next/link';
import { HeroOption } from '../types';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { EmptyVariants, FadeInVariants } from '@/features/motion/variants';
/**
 * Displays a rounded card with an image and a checkmark, and some content to the right
 */
export function ExpertBadge({
    src,
    alt,
    children,
    className,
}: ImageProps & PropsWithChildren & PropsWithClassName) {
    return (
        <motion.div
            className={cn(
                'z-20 flex items-center gap-3 rounded-full bg-white/40 p-2 pr-5 text-xs shadow-hero-badge backdrop-blur-xl md:text-base',
                className
            )}
            layout>
            <motion.div
                className="relative aspect-square h-full rounded-full bg-gradient-2 p-0.5"
                layout="position"
                layoutId="expert-badge-image">
                <motion.div
                    className="relative size-full rounded-full"
                    variants={{
                        hide: { opacity: 0 },
                        show: { opacity: 1 },
                        exit: { opacity: 1 },
                    }}>
                    <Image
                        src={src}
                        alt={alt}
                        className="size-full rounded-full object-cover"
                        fill
                    />
                </motion.div>
                <div className="absolute right-0 top-0 size-[17.4px] rounded-full bg-gradient-2 p-1 md:size-6 md:p-1.5">
                    <Check className="size-full text-success-600" />
                </div>
            </motion.div>
            <motion.div layout="position" layoutId="expert-badge-text">
                {children}
            </motion.div>
        </motion.div>
    );
}

export function HeroExpertBadge({
    expertName,
    expertImage,
}: Pick<HeroOption, 'expertName' | 'expertImage'>) {
    return (
        <ExpertBadge
            src={expertImage.url}
            alt={expertImage.altText ?? expertName}
            className="absolute bottom-3 right-6 z-20 h-16 w-fit md:h-20 lg:bottom-[3.5rem] lg:right-[5rem] lg:top-auto">
            <motion.p layout="position">Trusted by experts:</motion.p>
            <motion.b className="overflow-x-hidden font-bold" layout="position">
                {expertName}
            </motion.b>
        </ExpertBadge>
    );
}

export function NavMaryBadge({ className }: { className?: string }) {
    return (
        <ExpertBadge
            src={mary}
            alt="Mary Earps"
            className={cn(
                'relative h-16 w-fit text-xs font-normal md:absolute md:bottom-36 md:right-[140px] md:top-6 md:text-xs',
                className
            )}>
            View Mary's choices:
            <br />
            <Link
                href="/"
                className="flex w-fit items-center justify-center font-bold underline">
                Expert Choices <ArrowRight />
            </Link>
        </ExpertBadge>
    );
}
