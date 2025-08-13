'use client';

import React from 'react';
import RewardItem from './reward-item';
import { SOCIAL_REWARDS_DATA } from '../consts';
import { cn } from '@/lib/utils';

const VerticalMarquee = ({
    items,
    direction = 'up',
    className,
}: {
    items: typeof SOCIAL_REWARDS_DATA;
    direction?: 'up' | 'down';
    className?: string;
}) => {
    return (
        <div className="relative h-full">
            <div
                className={cn(
                    'animate-marquee flex flex-col gap-4',
                    direction === 'up'
                        ? 'animate-marquee-up'
                        : 'animate-marquee-down',
                    className
                )}>
                {/* Original set */}
                {items.map((item, idx) => (
                    <RewardItem key={idx} {...item} />
                ))}
                {/* Duplicate sets for smooth infinite scroll */}
                {items.map((item, idx) => (
                    <RewardItem key={`dup-1-${idx}`} {...item} />
                ))}
                {items.map((item, idx) => (
                    <RewardItem key={`dup-2-${idx}`} {...item} />
                ))}
                {items.map((item, idx) => (
                    <RewardItem key={`dup-3-${idx}`} {...item} />
                ))}
            </div>
        </div>
    );
};

const RewardsClaim = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'flex h-[374px] justify-center gap-[11px] overflow-hidden rounded-[10px] bg-beige lg:h-[527px] lg:gap-[15px]',
                className
            )}>
            <VerticalMarquee items={SOCIAL_REWARDS_DATA} direction="down" />
            <VerticalMarquee items={SOCIAL_REWARDS_DATA} direction="up" />
        </div>
    );
};

export default RewardsClaim;
