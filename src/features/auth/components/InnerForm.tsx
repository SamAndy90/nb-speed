import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

import React from 'react';

export const InnerForm: React.FC<ComponentProps<'form'>> = ({
    className,
    ...props
}) => {
    return (
        <form
            className={cn(
                'mb-6 mt-10 flex w-full max-w-[304px] flex-col gap-3',
                className
            )}
            {...props}
        />
    );
};
