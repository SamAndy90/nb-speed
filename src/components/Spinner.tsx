import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { ComponentProps } from 'react';

export function Spinner({
    className,
    ...rest
}: ComponentProps<typeof LoaderCircle>) {
    return (
        <LoaderCircle
            className={cn('animate-spin text-black', className)}
            {...rest}
        />
    );
}
