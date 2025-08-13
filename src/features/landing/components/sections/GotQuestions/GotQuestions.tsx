import Container from '@/components/container';
import { MotionDiv } from '@/components/motion-components/MotionDiv';
import { MotionSpan } from '@/components/motion-components/MotionSpan';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';

const QUESTIONS = [
    {
        title: 'What makes Nutriburst different from other vitamins?',
        description: `Nutriburst is all about better health, made simple. Our vitamin gummies are scientifically formulated to deliver powerful nutrients in a delicious, easy-to-take format - with no added sugar and no compromise on quality. 
            Whether you’re looking for daily wellness, energy, immunity, or beauty support, we have a solution tailored for you.`,
    },
    {
        title: 'Are Nutriburst gummies sugar-free?',
        description: `Yes! Unlike many gummy vitamins, Nutriburst uses no added sugar and contains only natural sweeteners. That means all the benefits, without the unnecessary extras.`,
    },
    {
        title: 'Are your vitamins suitable for all diets?',
        description: `Absolutely! Nutriburst gummies are vegan, gluten-free, and contain no artificial colours or preservatives. 
            They are also Halal-certified and Kosher-permitted, making them suitable for a wide range of dietary preferences and requirements.`,
    },
    {
        title: 'Do you ship internationally?',
        description: `Yes! We deliver across the UK and much of Europe, and we’re adding more locations all the time. The best way to check availability is by visiting our checkout page.`,
    },
    {
        title: 'Where can I buy Nutriburst?',
        description: `You can find Nutriburst right here on our website, as well as in major retailers, 
            including Tesco, Boots (online), Asda, Whole Foods, Harrods, and Day Lewis Pharmacy. We’re also available on Amazon UK.`,
    },
    {
        title: 'Are Nutriburst gummies safe for kids?',
        description: `Yes! We have a dedicated Kids’ Range, including our Minions & Trolls gummies, 
            which are designed with essential nutrients to support your child’s growth, immunity, and overall health.`,
    },
    {
        title: 'What’s the best way to store Nutriburst gummies?',
        description: `Store them in a cool, dry place, away from direct sunlight. There’s no need to refrigerate them.`,
    },
    {
        title: 'Do you offer a subscription?',
        description: `Yes! You can subscribe & save 20% on all recurring orders. Never run out of your favourite gummies while saving money!`,
    },
    {
        title: 'Can I take Nutriburst if I’m pregnant or breastfeeding?',
        description: `Some of our products are suitable during pregnancy, but we always recommend consulting your doctor before introducing any new supplements.`,
    },
];

export function GotQuestions() {
    return (
        <section id="faq" className="w-full py-[50px] lg:py-[100px]">
            <Container className="flex flex-col gap-8">
                <h2>
                    <MotionSpan
                        transition={{ delay: 1 }}
                        text={'Got questions?'}
                    />
                    <br />
                    <MotionDiv
                        className={'inline-block'}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                            delay: 0.8,
                            // duration: 0.6,
                            type: 'spring',
                        }}
                        viewport={{ once: true }}
                    >
                        We got answers.
                    </MotionDiv>
                </h2>
                <Accordion type="single" collapsible variant="landing-sm">
                    {QUESTIONS.map((question, index) => (
                        <AccordionItem
                            key={`faq-item-${index}`}
                            value={`item-${index + 1}`}>
                            <AccordionTrigger
                                icon="star"
                                className="max-sm:h-auto">
                                {question.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                {question.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                {/* <Button variant="dark" size="sm" sizeDesktop="lg" asChild>
                    <Link href="/pages/faq">Find more FAQ</Link>
                </Button> */}
            </Container>
        </section>
    );
}
