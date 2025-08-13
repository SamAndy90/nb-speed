import { CarouselPerson } from '@/features/product/types';
import maryExpert from '@/assets/experts/mary.jpeg';
import christiannaExpert from '@/assets/experts/christianna.webp';
import joeExpert from '@/assets/experts/joe.png';
import elliotExpert from '@/assets/experts/elliot.jpeg';
import rownitaExpert from '@/assets/experts/rownita_marston-mulhearn.png';
import andyExpert from '@/assets/experts/andy.png';
import katrinaExpert from '@/assets/experts/katrina.png';
import samExpert from '@/assets/experts/sam_shashoua.png';
import { MotionDiv } from '@/components/motion-components/MotionDiv';
import { CardCarousel } from '@/features/product/components/sections/TrustedByExperts/CardCarousel';

const carouselCards: CarouselPerson[] = [
    {
        src: rownitaExpert,
        alt: 'Rownita Marston Mulhearn',
        name: 'Rownita Marston - Mulhearn',
        subtitle: 'Bristol Bears',
        quote: `Honestly, they've been fantastic and so easy to take – something I've always struggled with! I'm really noticing the difference, and even my non-rugby friends are buying them. The vitamins are amazing.`,
    },
    {
        src: samExpert,
        alt: 'Sam Shashoua',
        name: 'Sam Shashoua',
        subtitle: `Professional Footballer - Minnesota United FC`,
        quote: `Inflammation is something almost every athlete is conscious of and has to be aware of and manage carefully, especially with such a training intensive sport. Nutriburst’s Turmeric gummies are supplements that genuinely have been able to help me to keep on top of that and keep me performing at my best`,
    },
    {
        src: andyExpert,
        alt: 'Andy Christie',
        name: 'Andy Christie',
        subtitle: `Saracens`,
        quote: `Having had a few injuries, I was desperate to find vitamins to help support my recovery. Since taking Nutriburst Turmeric with Ashwagandha KSM-66®, I’ve seen a real improvement in my ability to sleep, recover, and re-energize. It's making a noticeable difference`,
    },
    {
        src: katrinaExpert,
        alt: 'Katrina Crossley',
        name: 'Katrina Crossley',
        subtitle: `Yoga Instructor`,
        quote: `By week three my concentration and focus had improved and by week four abd my sleep had massively improved. Easy to take and taste delicious.`,
    },
    {
        src: christiannaExpert,
        alt: 'Christianna Aristidou Karaolis',
        name: 'Christianna Aristidou Karaolis',
        subtitle: 'Our registered nutritionist',
        quote: `Nutriburst echo my own ethos about health and wellness; especially that nutrition should be accessible, enjoyable and most importantly effective, by using quality ingredients`,
    },
    {
        src: elliotExpert,
        alt: 'Elliott Obatoyinbo',
        name: 'Elliott Obatoyinbo',
        subtitle: 'Newcastle Falcons',
        quote: `Since taking the nutriburst ashwagandha gummies, my sleep has improved drastically, something I have struggled with recently, especially the quality of my sleep.`,
    },
    {
        src: maryExpert,
        alt: 'Mary Earps',
        name: 'Mary Earps',
        subtitle:
            'Lioness goalkeeper and BBC Sports Personality of the Year 2023',
        quote: `Things are really out of your control in goalkeeping. That requires real mental strength and focus. Nutriburst's vitamins give me that extra edge`,
    },
    {
        src: joeExpert,
        alt: 'Joe Truman',
        name: 'Joe Truman',
        subtitle: 'British Cyclist',
        quote: `Ashwagandha KSM-66 helps my endurance, strength and immune function. It's an essential part of my recovery routine.`,
    },
];

export function TrustedByExperts() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center pt-[45px] max-sm:gap-12 lg:pt-[90px]">
            <header className="flex flex-col items-center justify-center gap-1 text-center md:gap-4">
                <h2>
                    <MotionDiv
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            ease: 'easeOut',
                            duration: 0.8,
                            delay: 0.2,
                        }}
                        viewport={{ once: true }}>
                        Trusted <b>by Experts</b>
                    </MotionDiv>
                </h2>
                <p className="text-base md:text-lg">
                    Proven results by sports personalities
                </p>
            </header>
            <CardCarousel cards={carouselCards} />
        </section>
    );
}
