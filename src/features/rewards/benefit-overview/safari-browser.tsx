import React from 'react';
import SafariToolbar from '@/assets/safari-toolbar.svg';
import RewardsPage from '@/assets/rewards-page.webp';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const SafariBrowser = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'shadow-rewards-page-card overflow-hidden rounded-[4.51px]',
                className
            )}>
            <SafariToolbar className="w-full" />
            <Image
                src={RewardsPage}
                width={0}
                height={0}
                sizes="100vw"
                alt="reward page"
                className="aspect-[1.6] w-full object-cover object-[0_-4rem]"
            />
        </div>
    );
};

export default SafariBrowser;
