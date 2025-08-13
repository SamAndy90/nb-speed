'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValue,
    useMotionValueEvent,
    useSpring,
    useTime,
    useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import ChevronLeft from '@/assets/icons/chevron-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { CarouselPerson } from '@/features/product/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useInterval } from '@/hooks/useInterval';
const LOOP_DURATION = 30;

function CarouselCardText({
    card: { name, subtitle, quote },
}: {
    card: CarouselPerson;
}) {
    return (
        <motion.div
            variants={{
                hide: { z: -500, opacity: 0 },
                show: { z: 0, y: 0, opacity: 1 },
                exit: { z: -1000, opacity: 0 },
            }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            initial="hide"
            animate="show"
            exit="exit"
            className="absolute top-0 space-y-2">
            <div className="space-y-2 font-bold">
                <div className="text-lg md:text-xl">{name}</div>
                <div className="text-xs md:text-sm">{subtitle}</div>
            </div>
            <div className="oblique">“{quote}”</div>
        </motion.div>
    );
}
function CarouselControls({
    onChange,
}: {
    onChange: (direction: number) => void;
}) {
    return (
        <div className="relative z-10 flex w-full justify-center gap-3 *:size-9 *:rounded-full *:bg-gradient-2 *:px-0">
            <Button aria-label={'Previous'} onClick={() => onChange(1)}>
                <ChevronLeft className="size-4" />
            </Button>
            <Button aria-label={'Next'} onClick={() => onChange(-1)}>
                <ChevronRight className="size-4" />
            </Button>
        </div>
    );
}

/*
    Modulo that works with negative numbers and returns a positive result
*/
function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}
const CAROUSEL_AUTO_TURN_DELAY = 4000;
const CAROUSEL_AUTO_TURN_RATE = 4000;
export function CardCarousel({ cards }: { cards: CarouselPerson[] }) {
    const [isPaused, setIsPaused] = useState(false);

    const count = cards.length;

    const scroll = useMotionValue(0);
    const spring = useSpring(scroll, {
        damping: 20,
        stiffness: 80,
        mass: 1,
        restSpeed: 0.001,
        restDelta: 0.001,
    });
    const current = useTransform(spring, (v) => v);
    const rotation = useTransform(current, (v) => 360 * v);
    const [mouseDown, setMouseDown] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    let lastCardChange = 0;

    const time = useTime();

    useEffect(() => {
        lastCardChange = time.get();
    }, [isPaused, mouseDown, setIsPaused, setMouseDown]);

    useInterval(() => {
        if (
            !isPaused &&
            !mouseDown &&
            time.get() - lastCardChange > CAROUSEL_AUTO_TURN_DELAY
        )
            changeCard(-1);
    }, CAROUSEL_AUTO_TURN_RATE);

    useMotionValueEvent(current, 'change', (v) => {
        const newIndex = mod(Math.round(v * count), count);
        setCurrentCardIndex(newIndex);
    });

    useMotionValueEvent(current, 'change', (v) => {
        const newIndex = mod(count - Math.round(v * count), count);
        setCurrentCardIndex(newIndex);
    });

    // useMotionValueEvent(current, 'change', (v) => {
    //     const newIndex = mod(Math.ceil(v * count), count);
    //     setCurrentCardIndex(newIndex);
    //     //setCurrentCard(cards[Math.round(v * (count - 1)) % count]);
    // });
    const desktop = useMediaQuery('md');
    const carouselZ = desktop ? -500 : -1500;
    const dragSpeed = desktop ? 1 : 0.7;

    const changeCard = (direction: number) => {
        const currentIndex = Math.round(scroll.get() * count);
        const targetIndex = currentIndex + direction;
        const scrollDifference = (targetIndex - currentIndex) / count;

        scroll.set(scroll.get() + scrollDifference);
    };

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <motion.div
                className="relative mb-2 h-96 min-h-96 w-full grow cursor-grab touch-none md:mb-16 md:mt-20 md:h-[50vh]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{
                    perspective: 3000,
                    WebkitBackfaceVisibility: 'visible',
                }}
                onPan={(event, info) => {
                    scroll.set(
                        scroll.get() + (info.delta.x * dragSpeed) / 1000
                    );
                    setMouseDown(true);
                }}
                onPanEnd={(_, info) => {
                    const dir =
                        info.delta.x > 0
                            ? Math.ceil(spring.get() * count)
                            : Math.floor(spring.get() * count);
                    scroll.set(dir / count);
                    setMouseDown(false);
                }}>
                <motion.div
                    className={cn(
                        'absolute flex h-full w-full flex-wrap items-center justify-center',
                        mouseDown && 'cursor-grabbing'
                    )}
                    style={{
                        transformStyle: 'preserve-3d',
                        // z: carouselZ,
                        translateZ: carouselZ,
                        rotateY: rotation,
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: 'easeOut',
                        duration: LOOP_DURATION,
                    }}>
                    {cards.map((c, i, arr) => (
                        <CarouselCard
                            key={`carousel-card-${i}`}
                            i={i}
                            time={current}
                            length={count}
                            card={c}
                        />
                    ))}
                </motion.div>
            </motion.div>

            <div className="w-full max-w-[28rem] px-3 text-center md:space-y-4">
                <div
                    className="relative z-0 flex h-64 flex-col items-center justify-center md:h-56"
                    style={{ perspective: 100, perspectiveOrigin: '50% 0%' }}>
                    <AnimatePresence mode="sync">
                        <CarouselCardText
                            card={cards[currentCardIndex]}
                            key={currentCardIndex}
                        />
                    </AnimatePresence>
                </div>
                <CarouselControls
                    onChange={(d) => {
                        changeCard(d);
                        lastCardChange = time.get();
                    }}
                />
            </div>
        </div>
    );
}

export function CarouselCard({
    className,
    i,
    time,
    length,
    card: { src, alt, name },
}: PropsWithClassName & {
    i: number;
    time: MotionValue;
    length: number;
    card: CarouselPerson;
}) {
    const progress = i / length;
    const rotation = 360 * progress;
    const desktop = useMediaQuery('md');

    const cardDistance = desktop ? 75 : 25;
    //How far the card should be from the centre
    const tz = Math.round((384 + cardDistance) / 2 / Math.tan(Math.PI / 9));
    // const loopedTime = useTransform(time, (v) => (v + progress) % 1);

    // const offset = useTransform(
    //     loopedTime,
    //     [0, 0.25, 0.5, 0.75, 1],
    //     [0, 0.5, 1, 0.5, 0]
    // );

    /*const filter = useTransform(
        offset,
        [0, 0.4, 1],
        [`blur(0px)`, ` blur(0px)`, `blur(30px)`]
    );*/

    return (
        <motion.div
            className={cn(
                `absolute flex aspect-[371/446] w-[371px] select-none items-center justify-center overflow-hidden rounded-lg text-lg`,
                className
            )}
            transition={{
                duration: LOOP_DURATION,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            style={{
                z: tz,
                originZ: -tz,
                originY: 0,
                rotateY: rotation,
                transformStyle: 'preserve-3d',
            }}>
            <Image
                src={src}
                alt={alt ?? name}
                fill
                className="select-none object-cover"
                draggable={false}
                priority
                sizes={
                    '(max-width: 768px) 70vw, (max-width: 1024px) 50vw, 33vw'
                }
            />
        </motion.div>
    );
}
