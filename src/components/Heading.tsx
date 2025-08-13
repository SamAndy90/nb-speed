import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export function HeadingTop({
    children,
    className,
}: PropsWithChildren & PropsWithClassName) {
    return (
        <p className="font-sans text-base font-bold uppercase">{children}</p>
    );
}
export function Heading({
    children,
    className,
}: PropsWithChildren & PropsWithClassName) {
    return (
        <header
            className={cn(
                'flex flex-col items-center justify-center gap-3 text-center md:gap-3',
                className
            )}>
            {children}
        </header>
    );
}

export function HeadingTitle({
    children,
    className,
    ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
    return <h1 {...props}>{children}</h1>;
}

export function HeadingSubtitle({ children }: PropsWithChildren) {
    return <h2>{children}</h2>;
}

export function HeadingDescription({
    children,
    className,
}: PropsWithChildren & PropsWithClassName) {
    return (
        <div className={cn('text-sm md:max-w-sm md:text-lg', className)}>
            {children}
        </div>
    );
}
