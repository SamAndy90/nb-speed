import { Variants } from 'framer-motion';

export const EmptyVariants = {
    hide: {},
    show: {},
    exit: {},
} satisfies Variants;
export const FadeInVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
} satisfies Variants;

export const HeroHeadingVariants = {
    hide: { opacity: 0 },
    show: { opacity: [0, 0.2, 0.5, 1] },
    exit: { opacity: [1, 0.3, 0.1, 0] },
} satisfies Variants;
