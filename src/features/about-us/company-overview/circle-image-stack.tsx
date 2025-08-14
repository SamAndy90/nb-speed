import Image, { ImageProps } from 'next/image';
import React from 'react';

const CircleImageStack = ({id, images }: { id: string, images: ImageProps[] }) => {
    return (
        <div className="flex -space-x-3 overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={`${id}-${index}`}
                    className="border-grad-2 inline-block h-[2.625rem] w-[2.625rem] rounded-full bg-white">
                    <Image
                        src={image.src}
                        alt={image.alt || `Item ${index + 1}`}
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>
            ))}
        </div>
    );
};

export default CircleImageStack;
