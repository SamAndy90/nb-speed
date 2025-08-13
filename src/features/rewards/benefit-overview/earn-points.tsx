import ArrowTextButton from '@/components/arrow-text-button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const HowToEarnPoints = ({ className = '' }: { className?: string }) => {
    return (
        <div className={cn(className)}>
            <div className="flex flex-col gap-6">
                <h2>
                    Discover how to <br />
                    <span className="font-medium text-accent-orange">
                        earn points
                    </span>
                </h2>

                <p className="text-paragraph-4 lg:text-paragraph-3">
                    Discover easy ways of earning points which will give you
                    massive discounts on your next order.
                </p>

                <ArrowTextButton
                    href="/"
                    buttonText="How to earn points"
                    as={Link}
                />
            </div>
        </div>
    );
};

export default HowToEarnPoints;
