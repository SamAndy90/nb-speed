import Container from '@/components/container';
import React from 'react';
import { KEY_BENEFITS } from '../consts';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ChevronRight from '@/assets/icons/chevron-right.svg';

const KeyBenefitsSection = () => {
    return (
        <section>
            <Container className="grid grid-cols-1 lg:mb-[7.5rem] lg:grid-cols-3">
                {KEY_BENEFITS.map((benefit, index) => (
                    <div
                        key={`key-benefit-${index}`}
                        className={cn(
                            'lg:min-h-auto flex min-h-[246px] flex-col items-center justify-center gap-4 px-8 py-[28px] text-center lg:gap-6',
                            {
                                'border-b border-neutral-300 lg:border-b-0 lg:border-r':
                                    index + 1 < KEY_BENEFITS.length,
                            }
                        )}>
                        <div className="flex flex-col gap-1">
                            <div className="text-paragraph-4 font-bold uppercase">
                                {benefit.subtitle}
                            </div>
                            <h4>{benefit.title}</h4>
                            <p className="mt-3">{benefit.description}</p>
                        </div>

                        <Link
                            href={benefit.link}
                            className="flex items-center gap-[3px] text-[14px] font-bold leading-[1] transition-all duration-300 hover:scale-105">
                            {benefit.linkText}
                            <ChevronRight className="relative top-0.5 w-[14px]" />
                        </Link>
                    </div>
                ))}
            </Container>
        </section>
    );
};

export default KeyBenefitsSection;
