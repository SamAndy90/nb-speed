'use client';

import { cn } from '@/lib/utils';
import { DOMMotionComponents, motion, MotionProps } from 'framer-motion';
import { ElementType, ReactNode, HTMLAttributes, ComponentProps } from 'react';

import { LazyMotion, domAnimation, m } from 'framer-motion';

type MotionTag = keyof DOMMotionComponents;

type MotionComponentProps<T extends MotionTag> = {
    as?: T;
    children?: ReactNode;
    className?: HTMLAttributes<HTMLElement>['className'];
} & MotionProps &
    ComponentProps<T>;

const MotionWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <LazyMotion features={domAnimation}>{children}</LazyMotion>
);

export function Motion<T extends MotionTag = 'div'>({
    as,
    children,
    className,
    ...props
}: MotionComponentProps<T>) {
    const Component = (motion[as || 'div'] as ElementType) || motion.div;

    return (
        <MotionWrapper>
            <Component {...props} className={cn(className)}>
                {children}
            </Component>
        </MotionWrapper>
    );
}
