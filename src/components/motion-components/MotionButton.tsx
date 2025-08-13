'use client';

import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';

type MotionTitleProps = {
    children: React.ReactNode;
} & HTMLMotionProps<'button'>;
export function MotionButton({
    children,
    className,
    ...props
}: MotionTitleProps) {
    return (
        <motion.button
            {...props}
            className={cn(
                'inline-flex h-11 w-fit items-center justify-center whitespace-nowrap rounded-full bg-base-100 px-6 text-base text-paragraph-4 font-bold text-base-50 ring-offset-background transition-all hover:bg-base-100/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:h-11 md:px-6 md:text-base',
                className
            )}>
            {children}
        </motion.button>
    );
}
