'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

type MotionSpanProps = {
    text: string;
} & Pick<React.HTMLProps<HTMLSpanElement>, 'className'> &
    HTMLMotionProps<'span'>;
export function MotionSpan({ text, className, ...props }: MotionSpanProps) {
    return (
        <motion.span
            initial={'hidden'}
            whileInView={'visible'}
            transition={{
                staggerChildren: 0.01,
            }}
            viewport={{ once: true }}
            className={cn(className)}
            {...props}>
            {[...text].map((char, i) => (
                <motion.span
                    key={char + i}
                    variants={{
                        hidden: {
                            opacity: 0,
                        },
                        visible: {
                            opacity: 1,
                        },
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
