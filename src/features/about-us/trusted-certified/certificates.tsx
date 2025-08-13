import React from 'react';
import InformedSport from '@/assets/qualifications/informed.webp';
import GlossWellNess from '@/assets/qualifications/gloss-wellness-awards.webp';
import Haccp from '@/assets/qualifications/haccp.webp';
import Bros from '@/assets/qualifications/bros.webp';
import GMRA from '@/assets/qualifications/grma.webp';
import Image from 'next/image';

const certificationsBadges = [
    { src: InformedSport },
    { src: Bros },
    { src: Haccp },
    { src: GMRA },
    { src: GlossWellNess },
];

const Certificates = () => {
    return (
        <div className="flex w-full flex-col gap-4 rounded-[0.625rem] bg-white px-4 py-6 shadow-soft lg:p-8">
            <h4 className="font-light">
                Certificates & <br /> Quality Badges
            </h4>

            <div className="grid w-full grid-cols-5 items-center justify-between gap-3 lg:gap-5">
                {certificationsBadges.map((badge, index) => (
                    <picture
                        className="flex"
                        key={`qualification-badge-${index}`}>
                        <Image
                            src={badge.src}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            className="h-auto w-full object-contain"
                        />
                    </picture>
                ))}
            </div>
        </div>
    );
};

export default Certificates;
