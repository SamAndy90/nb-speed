'use client';

import Container from '@/components/container';
import { PrimaryButton } from '@/components/PrimaryButton';
import React, { useRef, useState } from 'react';
import { CirclePause, CirclePlay } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="relative mt-[-56px] flex h-screen justify-center overflow-hidden md:mt-[-80px]">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                className={cn(
                    'absolute',
                    'top-0 h-auto min-w-full max-w-max',
                    '2xl:left-0 2xl:min-h-full 2xl:max-w-full'
                )}>
                <source src="/mary-video.mp4" type="video/mp4" />
            </video>

            <div className="absolute left-0 z-[1] h-full w-full bg-[#32323278] pb-[56px] text-primary-white md:pb-[80px]">
                <Container className="relative mt-[56px] h-full md:mt-[80px]">
                    <div className="mx-auto flex max-w-[790px] flex-col items-center gap-4 py-[8.125rem] text-center lg:gap-6 xl:py-[11.25rem]">
                        <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                            BBC SPORTS PERSONALITY OF THE YEAR
                        </div>

                        <div className="flex flex-col gap-4 lg:gap-3">
                            <h1>
                                Meet our ambassador, <br />
                                <span className="font-medium text-accent-green">
                                    Mary Earps!
                                </span>
                            </h1>
                            <p className='lg"text-paragraph-2 max-w-[585px] text-paragraph-3'>
                                We’re thrilled to announce powerhouse goalkeeper
                                Mary Earps has joined the Nutriburst team as our
                                new ambassador
                            </p>
                        </div>
                        <PrimaryButton
                            align="left"
                            className="h-[42px] w-[225px] text-primary-black md:h-auto">
                            Watch the trailer
                        </PrimaryButton>
                    </div>

                    <span
                        onClick={togglePlayPause}
                        className="absolute bottom-8 right-[20px] cursor-pointer *:transition-all hover:*:scale-110 lg:top-[55px]"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}>
                        {isPlaying ? (
                            <CirclePause size={41} strokeWidth={1} />
                        ) : (
                            <CirclePlay size={41} strokeWidth={1} />
                        )}
                    </span>
                </Container>
            </div>
        </section>
    );
};

export default HeroSection;
