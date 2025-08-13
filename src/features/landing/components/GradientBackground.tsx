import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
export function GradientBackground({
    children,
    variant,
}: PropsWithChildren<{ variant?: 'section-2' | 'section-3' | 'section-4' }>) {
    return (
        <div
            className={cn(
                'w-full bg-gradient-section',
                variant === 'section-2' && 'bg-gradient-section-2',
                variant === 'section-3' && 'bg-gradient-section-3',
                variant === 'section-4' && 'bg-gradient-section-4'
            )}>
            {children}
        </div>
    );
}
