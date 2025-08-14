'use client';

import React from 'react';
import { MEMBERS } from '../consts';
import Member from './memeber';
import Marquee from 'react-fast-marquee';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const TeamSection = () => {
    const isDesktop = useMediaQuery('lg');

    return (
        <section className="py-[3.125rem] lg:py-[7.5rem]">
            <h2 className="px-5 font-light lg:text-center">
                The Heart of{' '}
                <span className="font-medium text-accent-pink">Nutriburst</span>
            </h2>

            <Marquee speed={isDesktop ? 100 : 50} pauseOnHover>
                <div className="mt-[3.125rem] flex lg:mt-[5.375rem]">
                    {MEMBERS.map((member, index) => (
                        <Member
                            key={`member-${index}`}
                            image={member.image}
                            fullName={member.fullName}
                            position={member.position}
                        />
                    ))}
                </div>
            </Marquee>
        </section>
    );
};

export default TeamSection;
