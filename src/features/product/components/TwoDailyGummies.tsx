import React from 'react';
import CheckIcon from '@/assets/icons/check.svg';
const TwoDailyGummies = ({
    values,
    isHydration = false,
}: {
    values: string[];
    isHydration?: boolean;
}) => {
    return (
        <div className="space-y-4">
            <p className="text-paragraph-4 font-bold">
                {isHydration ? 'One sachet daily' : 'Two gummies daily:'}
            </p>
            <div className="space-y-3">
                {values.map((value) => (
                    <div key={value} className="flex items-center gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cooper-gradient">
                            <CheckIcon className="w-3 text-primary-white" />
                        </span>
                        <p className="text-paragraph-4">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TwoDailyGummies;
