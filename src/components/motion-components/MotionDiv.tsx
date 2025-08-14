'use client';

import { cn } from '@/lib/utils';
import { m, HTMLMotionProps } from 'framer-motion';

type MotionDivProps = {
    children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement> &
    HTMLMotionProps<'div'>;
export function MotionDiv({ children, className, ...props }: MotionDivProps) {
    return (
        <m.div {...props} className={cn(className)}>
            {children}
        </m.div>
    );
}
