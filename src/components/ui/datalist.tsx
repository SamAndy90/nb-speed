import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLDataListElement> {
    options: string[];
}

const DataList = React.forwardRef<HTMLDataListElement, InputProps>(
    ({ className, options, ...props }, ref) => {
        return (
            <datalist
                className={cn(
                    'flex h-[58px] w-full rounded-xs border border-input bg-background px-4 py-2 text-sm font-semibold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
                    className
                )}
                ref={ref}
                {...props}

            >{options.map((o) => (<option value={o}/>))}</datalist>
        );
    }
);
DataList.displayName = 'DataList';

export { DataList };
