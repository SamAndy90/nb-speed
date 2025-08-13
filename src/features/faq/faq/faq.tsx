'use client';

import Container from '@/components/container';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import React, { useMemo, useState, useEffect } from 'react';
import { FAQ_QUESTIONS, FAQ_TABS } from '../consts';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useSearchParams } from 'next/navigation';

const FAQSection = () => {
    const searchParams = useSearchParams();
    const [active, setActive] = useState<string>(FAQ_TABS[0].id);
    const searchQuery = searchParams.get('query');

    const faqs = useMemo(() => {
        let filteredQuestions = FAQ_QUESTIONS.filter(
            (q) => q.category === active
        );

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredQuestions = filteredQuestions.filter(
                (faq) =>
                    faq.question.toLowerCase().includes(query) ||
                    faq.answer.toLowerCase().includes(query)
            );
        }

        return filteredQuestions;
    }, [active, searchQuery]);

    return (
        <section id="FAQ" className="py-[3.125rem] lg:py-[7.5rem]">
            <Container>
                <Tabs
                    defaultValue={active}
                    value={active}
                    onValueChange={setActive}
                    className="flex flex-col justify-center md:my-[18px]">
                    <TabsList className="h-fit justify-start gap-4 border-b border-neutral-200 md:h-fit md:gap-[37px]">
                        {FAQ_TABS.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="gap-1 text-paragraph-5 font-bold md:text-paragraph-3 md:font-semibold">
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {faqs.length === 0 && searchQuery && (
                    <div className="mt-8 text-center text-paragraph-3 text-gray-500">
                        No results found for "{searchQuery}"
                    </div>
                )}

                <Accordion
                    type="single"
                    collapsible
                    variant="landing-sm"
                    className="mt-8">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={`${active}-faq-${index}`}
                            value={`item-${index}`}
                            className="border-neutral-200">
                            <AccordionTrigger
                                icon="star"
                                className="py-2 text-paragraph-4 md:py-[18px] md:text-paragraph-1">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-paragraph-4 md:text-paragraph-3">
                                <div className="pt-1">{faq.answer}</div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Container>
        </section>
    );
};

export default FAQSection;
