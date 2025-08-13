import React from 'react';
import CircleImageStack from './circle-image-stack';
import { Separator } from '@/components/ui/separator';
import { COMPANY_STATS } from '../consts';
import { cn } from '@/lib/utils';

const CompanyStats = () => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:mt-[55px] lg:grid-cols-4 lg:gap-3">
            {COMPANY_STATS.map((stat, index) => (
                <div
                    key={`stat-${index}`}
                    className="flex flex-col lg:flex-row">
                    <div className="flex flex-col items-start justify-end p-6 pl-0 md:min-h-[221px] lg:justify-stretch lg:p-6 lg:pt-14">
                        {stat.circleImages ? (
                            <CircleImageStack
                                id={`stat-image-${index}`}
                                images={stat.circleImages}
                            />
                        ) : (
                            <div className={'hidden md:block md:h-[42px]'} />
                        )}

                        <div
                            className={cn('flex flex-col gap-2.5 lg:mt-2.5', {
                                'mt-2.5': stat.circleImages,
                            })}>
                            <h4 className="flex items-center capitalize">
                                {`${stat.count} ${stat.label}`}
                            </h4>
                            <p className="text-paragraph-4">
                                {stat.description}
                            </p>
                        </div>
                    </div>
                    {index + 1 < COMPANY_STATS.length && (
                        <Separator
                            orientation="vertical"
                            className="ml-3 hidden bg-neutral-300 lg:block"
                        />
                    )}
                    {index + 1 < COMPANY_STATS.length && (
                        <Separator
                            orientation="horizontal"
                            className="bg-neutral-300 md:hidden"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CompanyStats;
