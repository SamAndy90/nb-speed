import React from 'react';
import BrandMark from '@/assets/icons/brandmark.svg';
import Marquee from 'react-fast-marquee';

const AnimatedTextCarousel = () => {
    return (
        <Marquee speed={100}>
            <div className="flex h-[55px] w-full justify-center overflow-hidden whitespace-nowrap lg:h-auto px-20">
                <div className="flex items-center gap-[1.3125rem] font-heading text-[2.8125rem] lg:gap-[2.9475rem] lg:text-[6.6325rem]">
                    <div>
                        <span>My </span>
                        <span className="font-medium text-accent-ocean-blue">
                            daily Ritual
                        </span>
                    </div>
                    <BrandMark className="scale-[0.45] lg:scale-100" />
                    <div>
                        <span>Ultimate </span>
                        <span className="font-medium text-accent-ocean-blue">
                            Nutrition
                        </span>
                    </div>
                </div>
            </div>
        </Marquee>
    );
};

export default AnimatedTextCarousel;
