'use client';
import Image from 'next/image';
import christianna from '@/assets/nutritionist/christianna.png';
import PlusCircle from '@/assets/icons/plus-circle.svg';
import CloseCircle from '@/assets/icons/close-circle.svg';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Diploma from '@/assets/icons/diploma.svg';

export function HoverImage() {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);
    return (
        <div className="relative aspect-square w-full overflow-clip rounded-xl md:aspect-[580/480] md:w-[580px] 2xl:w-full 2xl:max-w-screen-sm mx-auto">
            <Image
                src={christianna}
                alt=""
                className="size-full rounded-xl object-cover"
            />

            <div
                className={cn(
                    'absolute inset-0 flex size-full flex-col gap-4 bg-primary/90 px-5 pb-6 pt-11 text-sm opacity-0 transition-all duration-500 md:px-10 md:py-10 md:text-base',
                    open && 'opacity-100'
                )}>
                <div className="flex flex-col gap-2">
                    <div className="font-bold md:text-lg">
                        Christianna Aristidou Karaolis
                    </div>
                    <div className="flex gap-[1.5px] text-sm">
                        <Diploma className="size-[1lh]" />
                        BSc DipCNM MBANT RCNHC
                    </div>
                </div>
                <p>
                    Christianna is a registered nutritionist with a private
                    practice, working with individuals to support specific
                    health conditions and improve overall health.
                </p>
                <p>
                    She is a healthy food editor and columnist for London based
                    Cherubs magazine. In each edition, Christianna shares
                    seasonal recipes and answers readers nutrition questions.
                </p>
            </div>

            <button
                className={cn(
                    'absolute bottom-3 right-2 z-10 rounded-full transition-all duration-500 md:bottom-6 md:right-6',
                    open && ''
                )}
                onClick={toggleOpen}>
                <PlusCircle
                    className={cn(
                        'size-8 transition-all duration-500 md:size-11',
                        open && 'rotate-45'
                    )}
                />
                <CloseCircle
                    className={cn(
                        'absolute inset-0 size-8 -rotate-45 opacity-0 transition-all duration-500 md:size-11',
                        open && 'rotate-0 opacity-100'
                    )}
                />
            </button>
        </div>
    );
}
