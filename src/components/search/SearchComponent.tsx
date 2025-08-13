'use client';

import Search from '@/assets/icons/search.svg';
import { Button } from '@/components/ui/button';
import { Fragment, useEffect, useState } from 'react';
import { SearchContent } from './SearchContent';
import { Transition, TransitionChild } from '@headlessui/react';
import Close from '@/assets/icons/close.svg';

import { cn } from '@/lib/utils';
import Container from '../container';
import { useMobileNav } from '../header';

type MobileSearchComponentProps = {};

export default function SearchComponent({}: MobileSearchComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { close } = useMobileNav();
    const handleCloseSearch = () => {
        setIsOpen(false);
        close();
    };

    useEffect(() => {
        const body = document.querySelector('body');
        if (!body) return;
        body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                    setIsOpen((prev) => !prev);
                }}>
                <Search />
            </Button>
            <Transition show={isOpen} as={Fragment}>
                <TransitionChild as={Fragment}>
                    <div
                        className="inset-0 mt-[58px] hidden size-full backdrop-blur-custom transition duration-200 data-[closed]:opacity-0 data-[leave]:duration-100 lg:fixed lg:mt-[83px] lg:block"
                        onClick={handleCloseSearch}
                    />
                </TransitionChild>
                <div
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                    className={
                        'fixed inset-x-0 top-0 z-50 h-screen max-h-screen w-full max-w-full overflow-hidden transition duration-200 lg:mt-[83px] lg:h-auto lg:max-h-[calc(100%-83px)] lg:shadow-sm'
                    }>
                    <TransitionChild as={Fragment}>
                        <div
                            className={cn(
                                'h-screen max-h-screen w-full max-w-full overflow-auto bg-[#FEFEFC] transition duration-300 lg:h-auto lg:max-h-[calc(100%-83px)]',
                                'data-[closed]:-translate-y-full data-[closed]:opacity-0',
                                'data-[leave]:duration-200 data-[leave]:ease-out',
                                'data-[leave]:data-[closed]:-translate-y-6 lg:data-[leave]:data-[closed]:-translate-y-12',
                                'pb-8 pt-14 lg:pt-8'
                            )}>
                            <Container className="static">
                                <div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-4 top-4 lg:hidden"
                                        onClick={handleCloseSearch}>
                                        {<Close className={'size-4'} />}
                                    </Button>
                                    <SearchContent
                                        closeSearch={handleCloseSearch}
                                    />
                                </div>
                            </Container>
                        </div>
                    </TransitionChild>
                </div>
            </Transition>
        </>
    );
}
// FEFEFC
