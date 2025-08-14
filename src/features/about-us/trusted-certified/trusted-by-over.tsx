import React from 'react';
import dynamic from 'next/dynamic';

const ReviewsBadgeRibbon = dynamic(
    () => import('@/components/ReviewsWidgetModern'),
    {
        ssr: false,
    }
);

const TrustedByOver = () => {
    return (
        <div className="flex w-full items-center justify-between rounded-[0.625rem] bg-white px-4 py-6 shadow-soft lg:p-8">
            <div className="flex-1">
                <h4 className="font-light">
                    Trusted by over <br /> 7771 Customers
                </h4>
            </div>
            <ReviewsBadgeRibbon
                widgetId={'about-us-reviews-widget'}
                className={'max-w-40'}
            />
        </div>
    );
};

export default TrustedByOver;
