'use client';

import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import ReactPlayer from 'react-player';

type VideoPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function VideoPopup({ isOpen, onClose }: VideoPopupProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter={'ease-out transition transform duration-300'}
                    enterFrom={'opacity-0'}
                    enterTo={'opacity-100'}
                    leave={'ease-in transition transform duration-200'}
                    leaveFrom={'opacity-100'}
                    leaveTo={'opacity-0'}>
                    <div
                        className={
                            'fixed inset-0 z-50 bg-black/40 backdrop-blur-[10px]'
                        }
                        aria-hidden
                    />
                </TransitionChild>

                <TransitionChild
                    as={Fragment}
                    enter={'ease-in-out transition transform duration-300'}
                    enterFrom={'opacity-0 scale-95'}
                    enterTo={'opacity-100 scale-100'}
                    leave={'ease-in-out transition transform duration-200'}
                    leaveFrom={'opacity-100 scale-100'}
                    leaveTo={'opacity-0 scale-95'}>
                    <DialogPanel
                        className={
                            'fixed left-1/2 top-1/2 z-[100] max-h-full w-full max-w-[280px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden py-5 pr-5 sm:max-w-[420px]'
                        }>
                        <ReactPlayer
                            playsinline={true}
                            url={'https://www.youtube.com/shorts/1ju_BopvRfw'}
                            playing={isMounted}
                            height={'auto'}
                            width={'100%'}
                            className={
                                'aspect-[9/16] overflow-hidden rounded-2xl'
                            }
                        />
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
