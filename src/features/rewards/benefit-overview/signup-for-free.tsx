import ArrowTextButton from '@/components/arrow-text-button';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SignUpForFree = ({ className = '' }: { className?: string }) => {
    return (
        <div className={cn(className)}>
            <div className="flex flex-col gap-6">
                <h2>
                    Sign up{' '}
                    <span className="font-medium text-accent-orange">
                        for free
                    </span>
                </h2>

                <p className="text-paragraph-4 lg:text-paragraph-3">
                    Turn the frustration of spending money into a more enjoyable
                    and rewarding experience.
                </p>
                <ArrowTextButton
                    href="/"
                    buttonText="Create account"
                    as={Link}
                />
            </div>
        </div>
    );
};

export default SignUpForFree;
