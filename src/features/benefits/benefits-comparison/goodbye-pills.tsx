import { cn } from '@/lib/utils';
import React from 'react';
import EasyToChew from './easy-to-chew';

const Rectangle = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'absolute top-[13rem] h-[675px] w-[97px] rotate-[10.03deg] bg-gradient-gum-rectangle lg:top-[9rem]',
                className
            )}
        />
    );
};

const GoodbyePills = ({ className = '' }: { className?: string }) => {
    return (
        <div
            className={cn(
                'relative flex flex-col overflow-hidden rounded-[20px] bg-gradient-14',
                className
            )}>
            <div className="relative z-[1] pl-5 pt-10 lg:pl-10 lg:pt-[60px]">
                <h3>
                    Goodbye Pills, <br />
                    Hello Gummies
                </h3>
                <p className="mt-[15px] text-paragraph-4 lg:max-w-[368px] lg:text-paragraph-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
            </div>
            <EasyToChew />
            <Rectangle className="left-[0rem]" />
            <Rectangle className="left-[12rem]" />
            <Rectangle className="left-[23rem]" />
        </div>
    );
};

export default GoodbyePills;
