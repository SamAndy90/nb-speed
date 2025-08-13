import { cn } from '@/lib/utils';
import React, { FC, SVGProps } from 'react';

interface RewardItemProps {
    icon: ({ className }: { className?: string }) => JSX.Element;
    points: number;
    value: string;
    action: string;
    className?: string;
}

const RewardItem = (props: RewardItemProps) => {
    const { icon, points, value, className = '', action } = props;
    const SocialIcon = icon;

    return (
        <div
            className={cn(
                'shadow-reward-card flex min-h-[133px] w-[125px] flex-col items-center justify-center gap-[13px] rounded-[8px] bg-white md:min-h-[189px] md:w-[177px]',
                className
            )}>
            <SocialIcon className="h-[23px] md:h-8" />
            <div className="flex flex-col items-center gap-1.5">
                <div className="text-[10.49px] font-bold md:text-paragraph-2 md:font-bold">
                    {`${points} Points = ${value}`}
                </div>
                <div className="text-[8.16px] md:text-paragraph-4">
                    {action}
                </div>
            </div>
        </div>
    );
};

export default RewardItem;
