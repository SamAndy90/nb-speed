'use client';

import React from 'react';
import Share from '@/assets/icons/share.svg';
import Instagram from '@/assets/icons/instagram.svg';
import X from '@/assets/icons/x.svg';
import Facebook from '@/assets/icons/facebook.svg';
import LinkIcon from '@/assets/icons/fi-rr-link.svg';
import CircleClose from '@/assets/icons/fi-rr-plus.svg';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import Link from 'next/link';

const Sharing = ({ className }: { className?: string }) => {
    const url = window.location.href;
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false); // New state for copy feedback

    const socialChannel = [
        {
            icon: Instagram,
            key: 'instagram',
        },
        {
            icon: X,
            key: 'twitter',
        },
        {
            icon: Facebook,
            key: 'facebook',
        },
    ];
    const toggleShare = () => {
        setIsOpen(!isOpen);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        // Reset the "Copied!" state after 2 seconds
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const getShareLinks = (key: string) => {
        switch (key) {
            case 'instagram':
                return `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`; // Fixed Twitter URL
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            default:
                return '';
        }
    };

    return (
        <div className={cn('relative w-fit', className)}>
            <span onClick={toggleShare}>
                {isOpen ? (
                    <CircleClose className="h-[15px] w-[15px] lg:h-6 lg:w-6" />
                ) : (
                    <Share className="h-[15px] w-[15px] lg:h-6 lg:w-6" />
                )}
            </span>

            {/* Sharing options with Framer Motion animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute bottom-0 right-3 lg:right-6 top-0 m-auto flex items-center space-x-4 rounded-lg bg-transparent"
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: -24, opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                        {socialChannel.map((channel) => {
                            const Icon = channel.icon;
                            return (
                                <Link
                                    href={getShareLinks(channel.key)}
                                    key={`share-${channel.key}`}
                                    className="block"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <Icon className="h-[18px] w-auto" />
                                </Link>
                            );
                        })}

                        {/* Copy button with tooltip */}
                        <div className="relative group">
                            <span className="block cursor-pointer" onClick={handleCopy}>
                                <LinkIcon className="h-[18px] w-auto" />
                            </span>

                            {/* Tooltip */}
                            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap ${isCopied && 'bg-green-700'}`}>
                                {isCopied ? 'Copied!' : 'Copy Link'}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sharing;
