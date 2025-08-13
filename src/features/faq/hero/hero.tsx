'use client';

import Container from '@/components/container';
import InputWithButton from '@/components/input-width-button';
import { Search } from 'lucide-react';
import React, { ChangeEvent, useState, useEffect } from 'react';
import perspectiveMens from '@/assets/perspective-mens.webp';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const HeroSection = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // Initialize search query from URL parameters
        const queryParam = searchParams.get('query');
        if (queryParam) {
            setSearchQuery(queryParam);
        }
    }, [searchParams]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const handleSearch = () => {
        const newUrl = searchQuery.trim()
            ? `?query=${encodeURIComponent(searchQuery.trim())}#FAQ`
            : '/pages/faq#FAQ';
        router.push(newUrl);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="overflow-hidden bg-gradient-section">
            <Container className="relative pt-[105px] lg:pb-[7.5rem] lg:pt-[11.25rem]">
                <div className="flex flex-col lg:flex-row">
                    <div className="relative z-[1] flex flex-col gap-6 lg:gap-10">
                        <div className="flex flex-col gap-4 lg:gap-3">
                            <div className="flex flex-col gap-4 lg:gap-6">
                                <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                                    SUPPORT
                                </div>

                                <h1>
                                    <span className="font-medium text-accent-tech-blue">
                                        Got Questions?
                                    </span>
                                    <br />
                                    We are here to help!
                                </h1>
                            </div>

                            <p className="text-paragraph-3 lg:text-paragraph-2">
                                Have a look at our FAQ or contact our support
                                for questions.
                            </p>
                        </div>

                        <InputWithButton
                            startAddon={<Search size={16} />}
                            placeholder="Search for topics"
                            value={searchQuery}
                            className="w-full md:max-w-full"
                            onChange={handleOnChange}
                            onKeyDown={handleKeyDown}
                            onButtonClick={handleSearch}
                        />
                    </div>

                    <picture className="flex max-h-[350px] justify-center lg:block lg:max-h-[auto]">
                        <Image
                            src={perspectiveMens}
                            alt="perspective mens cutout"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="relative left-[3rem] mx-auto mt-[-6rem] h-[700px] min-w-[580px] max-w-[580px] object-contain lg:absolute lg:-top-3 lg:left-[30rem] lg:mt-auto lg:aspect-[1] lg:h-auto lg:w-fit lg:min-w-[1036px] lg:max-w-[1036px]"
                        />
                    </picture>
                </div>
            </Container>
        </section>
    );
};

export default HeroSection;
