import ArrowTextButton from '@/components/arrow-text-button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const SaveYourProducts = ({ className = '' }: { className?: string }) => {
    return (
        <div className={cn(className)}>
            <div className="flex flex-col gap-6">
                <h2>
                    Save on your <br />
                    <span className="font-medium text-accent-orange">
                        favourite products
                    </span>
                </h2>

                <p className="text-paragraph-4 lg:text-paragraph-3">
                    Redeem your rewards and pay less on your favourites.
                </p>

                <ArrowTextButton href="/" buttonText="Go shopping" as={Link} />
            </div>
        </div>
    );
};

export default SaveYourProducts;
