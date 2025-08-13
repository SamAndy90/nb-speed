import quoteImage from '@/assets/mary-earps-quote.webp';

import product7 from '@/assets/products/product-7.webp';
import product6 from '@/assets/products/product-6.webp';
import product5 from '@/assets/products/product-5.webp';

export const Mary_QUOTE = {
    quote: `Things are really out of your control in goalkeeping. That requires real mental strength and focus. Nutriburst's vitamins give me that extra edge.`,
    name: `Mary Earps`,
    title: `Football Player`,
    imageSrc: quoteImage,
    imageAlt: 'Mary Earps',
};


export const MOCK_PRODUCTS = [
    {
        id: 'womens-multivitamin-1',
        name: "Ashwagandha KSM-66",
        label: '70 Hug + 20 Hug Plain',
        image: product7,
        price: 21.99,
        description:
            "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
        tags: ['70 Hug', '20 Hug Plain'],
        category: 'Bestseller',
    },
    {
        id: 'collagen-renew',
        name: "Tumeric 3000mg",
        label: 'Collagen Renew',
        image: product6,
        price: 21.99,
        description:
            "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
        category: 'Bestseller',
    },
    {
        id: 'zen-flow',
        name: "Vitamin D3 + K2",
        label: 'Zen Flow',
        image: product5,
        price: 21.99,
        description:
            "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
        category: 'Bestseller',
    },
];
