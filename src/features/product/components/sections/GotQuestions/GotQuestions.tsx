'use client';

import Image from 'next/image';
import leanne from '@/assets/leanne-ashwaganda.webp';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Container from '@/components/container';
import { Product } from '@/features/product/types';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
    extractImageData,
    useVariantProduct,
} from '@/features/product/VariantProductProvider';

export function GotQuestions({
    faq,
    faqImage,
}: {
    faq: Product['details']['faq'];
    faqImage?: Product['details']['faqImage'];
}) {
    const pathname = usePathname();
    const isHydrationProduct = pathname.includes('hydration');
    const { variant } = useVariantProduct();
    const hydroImage = extractImageData(variant.faq_image?.reference);

    const image = faqImage || leanne;
    const alignRight = faqImage
        ? faqImage.includes('WomensMulti') || faqImage.includes('HairSkinNails')
        : false;

    return (
        <section
            id={'faq'}
            className="relative w-full bg-gradient-to-b from-primary/50 to-[#F4E8CE]/50">
            <Container className="relative grid-cols-2 flex-col pb-0 lg:grid lg:py-0 lg:pr-0">
                <div className="flex flex-col gap-8 py-[50px] lg:py-[120px]">
                    <h2>
                        Got questions?
                        <br />
                        <b className="bg-cooper-text-gradient bg-clip-text text-transparent">
                            We got answers.
                        </b>
                    </h2>
                    <Accordion
                        type="single"
                        collapsible
                        className="-mt-8 font-sans lg:mt-0">
                        {faq.map((item, index) => (
                            <AccordionItem
                                key={`faq-${index}`}
                                value={`faq-${index}`}>
                                <AccordionTrigger
                                    icon="star"
                                    className="font-sans text-paragraph-4 font-bold lg:text-paragraph-1 lg:font-bold">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/*<Button*/}
                    {/*    variant="dark"*/}
                    {/*    size="sm"*/}
                    {/*    sizeDesktop="lg"*/}
                    {/*    className="lg:mt-2"*/}
                    {/*    asChild>*/}
                    {/*    <Link href="/pages/faq">Find more FAQ</Link>*/}
                    {/*</Button>*/}
                </div>

                {isHydrationProduct ? (
                    <div
                        className={cn(
                            'relative mx-auto flex w-full max-w-[650px] lg:hidden',
                            { '-mr-5': alignRight }
                        )}>
                        <Image
                            src={hydroImage?.url ?? leanne}
                            alt={hydroImage?.alt ?? 'Image'}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={'aspect-auto h-auto w-full object-cover'}
                        />
                    </div>
                ) : (
                    <picture
                        className={cn(
                            'relative mx-auto flex w-full max-w-[650px] lg:hidden',
                            { '-mr-5': alignRight }
                        )}>
                        <Image
                            src={image}
                            alt="faq image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="aspect-auto h-auto w-full object-cover"
                        />
                    </picture>
                )}
            </Container>

            {isHydrationProduct ? (
                <div
                    className={
                        'absolute bottom-0 right-0 hidden h-full w-1/2 lg:block'
                    }>
                    <div className={'relative h-full w-full'}>
                        <Image
                            src={hydroImage?.url ?? leanne}
                            alt={hydroImage?.alt ?? 'Image'}
                            fill
                            className={
                                'max-w-[80%] object-contain object-right-bottom 2xl:object-left-bottom'
                            }
                        />
                    </div>
                </div>
            ) : (
                <picture className="absolute bottom-0 right-0 hidden w-auto max-w-[550px] lg:flex xl:max-w-[630px]">
                    <Image
                        src={image}
                        alt="faq image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="aspect-auto h-auto w-full object-cover"
                    />
                </picture>
            )}
        </section>
    );
}
