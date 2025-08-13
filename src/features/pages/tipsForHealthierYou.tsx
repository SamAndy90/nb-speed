import { useMediaQuery } from '@/hooks/useMediaQuery';
import healthTips1 from '@/assets/discovery/pages/tips/health_tips_1.jpg';
import healthTips2 from '@/assets/discovery/pages/tips/health_tips_2.jpg';
import healthTips3 from '@/assets/discovery/pages/tips/health_tips_3.jpg';
import healthTips4 from '@/assets/discovery/pages/tips/health_tips_4.jpg';
import healthTips5 from '@/assets/discovery/pages/tips/health_tips_5.jpg';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';

export default function TipsForHealthierYou() {
    const desktop = useMediaQuery('md');
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const tips = [
        healthTips1,
        healthTips2,
        healthTips3,
        healthTips4,
        healthTips5,
    ];

    const isBeginning = currentSlide === 0;
    const isEnd = currentSlide >= tips.length - 1;

    const handlePrev = () => {
        if (currentSlide > 0) {
            const newSlide = currentSlide - 1;
            setCurrentSlide(newSlide);
            scrollToSlide(newSlide);
        }
    };

    const handleNext = () => {
        if (currentSlide < tips.length - 1) {
            const newSlide = currentSlide + 1;
            setCurrentSlide(newSlide);
            scrollToSlide(newSlide);
        }
    };

    const scrollToSlide = (slideIndex: number) => {
        if (containerRef.current) {
            const slideWidth = 227; // width of each tip image
            const gap = 8; // gap between slides (gap-2 = 0.5rem = 8px)
            const scrollPosition = slideIndex * (slideWidth + gap);

            containerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="flex flex-col gap-10 px-5 pt-10 md:pt-20">
            <h3 className="text-[32px] md:text-center md:text-5xl">
                Top Tips for a{desktop ? ' ' : <br />}
                <span className="font-semibold">Healthier You</span>
            </h3>
            <div
                ref={containerRef}
                className="scrollbar-hide flex gap-2 overflow-x-scroll md:justify-center">
                {tips.map((tip, idx) => (
                    <picture
                        key={idx}
                        className="h-[227px] w-[227px] flex-shrink-0">
                        <source srcSet={tip.src} />
                        <img
                            src={tip.src}
                            alt={`Health Tip ${idx + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </picture>
                ))}
            </div>
            {!desktop && (
                <div className="flex justify-center gap-2">
                    <Button
                        variant="secondary"
                        disabled={isBeginning}
                        className="h-[34px] w-[34px] bg-gradient-2 p-0 disabled:opacity-50"
                        onClick={handlePrev}
                        aria-label="Previous slide">
                        <ChevronLeft size={16} />
                    </Button>
                    <Button
                        variant="secondary"
                        disabled={isEnd}
                        className="h-[34px] w-[34px] bg-gradient-2 p-0 disabled:opacity-50"
                        onClick={handleNext}
                        aria-label="Next slide">
                        <ChevronRight size={16} />
                    </Button>
                </div>
            )}
        </section>
    );
}
