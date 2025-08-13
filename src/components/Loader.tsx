import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { Spinner } from './Spinner';

export function Loader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'flex items-center justify-center py-[5.625rem] lg:py-[7.5rem]',
                className
            )}
            {...rest}>
            <Spinner />
        </div>
    );
}
