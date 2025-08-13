'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

type MotionDivProps = {
    children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement> &
    HTMLMotionProps<'div'>;
export function MotionDiv({ children, className, ...props }: MotionDivProps) {
    return (
        <motion.div {...props} className={cn(className)}>
            {children}
        </motion.div>
    );
}
