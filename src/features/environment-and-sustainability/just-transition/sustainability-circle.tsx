import React, { useEffect, useState } from 'react';
import {
    HOLISTCI_APPROACH_CIRCLE_ITEMS,
    HOLISTCI_APPROACH_CIRCLE_VECTORS,
} from '../consts';
import BrandMark from '@/assets/logo/copper-logo-symbol.webp';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const SustainabilityCircle = ({
    activeIndex,
    onChange,
    setIsHovered,
}: {
    activeIndex: number;
    onChange: (activeIndex: number) => void;
    setIsHovered: (state: boolean) => void;
}) => {
    const [totalRotation, setTotalRotation] = useState(0);
    const [prevIndex, setPrevIndex] = useState(activeIndex);

    useEffect(() => {
        if (prevIndex === activeIndex) return;

        let newRotation = totalRotation;

        // Calculate the difference between current and previous index
        const diff = (activeIndex - prevIndex + 4) % 4;

        // Always rotate clockwise
        newRotation += diff * 90;

        setTotalRotation(newRotation);
        setPrevIndex(activeIndex);
    }, [activeIndex, prevIndex, totalRotation]);

    return (
        <div className="relative mb-8 aspect-[1] w-full max-w-[410px]">
            <div
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="absolute inset-0 flex items-center justify-center">
                {/* Icons and Labels */}
                {HOLISTCI_APPROACH_CIRCLE_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={`holistci-icon-${index}`}
                            className={cn(
                                `absolute ${item.position} z-[1] flex cursor-pointer flex-col items-center justify-center text-center opacity-60`,
                                'transition-all duration-300',
                                { 'opacity-100': activeIndex === index }
                            )}
                            onClick={() => onChange(index)}>
                            <Icon className="w-[74px] text-accent-green md:w-[106px]" />
                            <p className="absolute bottom-[-9px] translate-y-full whitespace-nowrap text-paragraph-5 font-bold lg:text-paragraph-2">
                                {item.label}
                            </p>
                        </div>
                    );
                })}

                {/* Connecting Lines */}
                <div className="absolute inset-0 z-[0]">
                    {HOLISTCI_APPROACH_CIRCLE_VECTORS.map((vector, index) => {
                        const Icon = vector.icon;
                        return (
                            <div
                                key={`vector-${index}`}
                                className={`absolute flex transform items-center justify-center ${vector.position}`}>
                                <Icon className="scale-[0.7] min-[400px]:scale-100" />
                            </div>
                        );
                    })}
                </div>

                <Image
                    src={BrandMark}
                    width={0}
                    height={0}
                    style={{
                        transform: `rotate(${totalRotation}deg)`,
                        transition: 'transform 0.3s ease-in-out',
                    }}
                    className={cn(
                        'h-auto w-[38.5px] transition-all duration-300 md:w-[67.3px]'
                    )}
                    alt="brand marker"
                />
            </div>
        </div>
    );
};

export default SustainabilityCircle;
