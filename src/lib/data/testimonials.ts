import amara from '@/features/landing/assets/reviews/amara.png';
import eniyah from '@/features/landing/assets/reviews/eniyah.png';
import georgia from '@/features/landing/assets/reviews/georgia.png';
import thea from '@/features/landing/assets/reviews/thea.png';

export const TESTIMONIALS = [
    {
        name: 'Amara',
        rating: 5 / 5,
        thumbnail: {
            src: amara,
            alt: 'Amara',
        },
        content:
            "Never had gummies before so I thought I'd give them ago. I used to wake up with stiffness in my knees and ankles, since taking these, I’ve definitely noticed less discomfort and quicker recovery after workouts. Plus, they actually taste really nice, unlike other turmeric supplements.",
        imageClassName: 'object-top',
        category: 'Hair, Skin & Nails',
    },
    {
        name: 'Eniyah',
        rating: 5 / 5,
        thumbnail: {
            src: eniyah,
            alt: 'Eniyah',
        },
        content:
            'I was looking for something to help with my brittle nails and thinning hair, and I’m honestly so impressed. My nails used to break all the time, but now they feel so much stronger, and my hair has more volume and shine. Even my skin looks healthier! The gummies taste really nice, which makes it easy to remember to take them. So happy I found these',
        category: 'Women’s Multivitamin',
        cardClassName: 'h-fit',
    },
    {
        name: 'Thea',
        rating: 4 / 5,
        thumbnail: {
            src: thea,
            alt: 'Thea',
        },
        content: `I have had weak nails all my life. I have tried everything, calcium, magnesium, jelly, everything.
            When I saw a review of this product in The Telegraph, I think, I did not think it would work but out of desperation I bought a tub. To my amazement, it does work, I no longer hide my nails.
            Very pleased.`,
        category: 'Men’s Multivitamin',
    },
    {
        name: 'Georgia',
        rating: 5 / 5,
        thumbnail: {
            src: georgia,
            alt: 'Georgia',
        },
        content:
            'I wasn’t sure what to expect, but after taking these for about two weeks, I’ve noticed a massive difference. I feel so much calmer during the day – things that would normally make me anxious just don’t seem to affect me as much. And the best part? My sleep has improved so much! I wake up feeling more rested.',
        category: 'Men’s Multivitamin',
    },
];
