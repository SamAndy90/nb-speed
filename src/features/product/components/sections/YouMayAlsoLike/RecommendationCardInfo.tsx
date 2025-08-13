'use client';

import { Button } from '@/components/ui/button';
import { PropsWithChildren, useState } from 'react';
import PlusCircle from '@/assets/icons/plus-circle.svg';
import CloseCircle from '@/assets/icons/close-circle.svg';
import { cn } from '@/lib/utils';
import Ashwagandha from '@/assets/ashwagandha-5.webp';
import Image from 'next/image';
export function RecommendationCardInfo({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);
    return (
        <div className="relative z-10 size-full">
            <div
                className={cn(
                    'absolute inset-0 flex size-full flex-col gap-4 overflow-clip bg-primary px-4 pt-11 text-sm opacity-0 transition-all duration-500 md:px-4 md:py-4',
                    open ? 'opacity-100' : 'opacity-0'
                )}>
                <Image
                    src={Ashwagandha}
                    alt="Ashwagandha"
                    className="ml-[20%] mt-[55%] scale-[1.8]"
                />
                <p className="absolute top-12 z-10">{children}</p>
            </div>

            <button
                className={cn(
                    'absolute bottom-2 right-2 z-10 size-11 scale-75 md:bottom-2 md:right-4',
                    open && ''
                )}
                onClick={toggleOpen}>
                <PlusCircle
                    className={cn(
                        'size-full transition-all duration-500',
                        open && 'rotate-45'
                    )}
                />
                <CloseCircle
                    className={cn(
                        'absolute inset-0 size-full -rotate-45 opacity-0 transition-all duration-500',
                        open && 'rotate-0 opacity-100'
                    )}
                />
            </button>
        </div>
    );
}
