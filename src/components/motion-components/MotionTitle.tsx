'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type MotionTitleProps = {
    text: string;
    component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & React.HTMLProps<HTMLHeadingElement>;
export function MotionTitle({
    text,
    component = 'h2',
    className,
    ...props
}: MotionTitleProps) {
    const Component = component;
    return (
        <Component {...props} className={cn(className)}>
            {[...text].map((char, i) => (
                <motion.span
                    key={char + i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        delay: i * 0.04,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}>
                    {char}
                </motion.span>
            ))}
        </Component>
    );
}
