import Image, { ImageProps } from 'next/image';
import React from 'react';

const Member = ({
    image,
    fullName,
    position,
}: {
    image: ImageProps['src'];
    fullName: string;
    position: string;
}) => {
    return (
        <div className="flex w-[200px] flex-col items-center justify-center gap-[19px] px-1.5 text-center lg:w-[300px] lg:px-4">
            <picture className="flex w-full">
                <Image
                    src={image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={fullName}
                    className="h-[225px] w-full rounded-[0.625rem] object-cover lg:h-[300px]"
                />
            </picture>
            <div>
                <h6>{fullName}</h6>
                <p className="text-paragraph-5 lg:text-paragraph-3">
                    {position}
                </p>
            </div>
        </div>
    );
};

export default Member;
