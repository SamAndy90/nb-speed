'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type MotionParagraphProps = {
    text: string;
} & Pick<React.HTMLProps<HTMLParagraphElement>, 'className'>;
export function MotionParagraph({
    text = '',
    className,
}: MotionParagraphProps) {
    return (
        <motion.p
            initial={'hidden'}
            whileInView={'visible'}
            transition={{
                staggerChildren: 0.002,
            }}
            viewport={{ once: true }}
            className={cn(className)}>
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
                        duration: 1.8,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}>
                    {char}
                </motion.span>
            ))}
        </motion.p>
    );
}
