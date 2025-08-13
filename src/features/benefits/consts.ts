import product1 from '@/assets/products/product-1.webp';
import product2 from '@/assets/products/product-2.webp';
import product3 from '@/assets/products/product-3.webp';
import product4 from '@/assets/products/product-4.webp';
import product5 from '@/assets/products/product-5.webp';
import product6 from '@/assets/products/product-6.webp';
import food from '@/assets/stock-photo-food.webp';

import topLeft from '@/assets/icons/arrows/top-left.svg';
import topRight from '@/assets/icons/arrows/top-right.svg';
import right from '@/assets/icons/arrows/right.svg';
import bottomRight from '@/assets/icons/arrows/bottom-right.svg';
import bottomLeft from '@/assets/icons/arrows/bottom-left.svg';
import left from '@/assets/icons/arrows/left.svg';

import maryFace from '@/assets/mary-face.png';
import mary from '@/assets/mary-mental.webp';
import maryQuote from '@/assets/mary-earps-quote.webp';
import mary1 from '@/assets/mary-1.webp';

export const PRODUCT_IMAGES = [
    product2,
    product1,
    product3,
    product6,
    product5,
    product4,
];

export const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '2',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '3',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '4',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '5',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '6',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '7',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '8',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '9',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'wellness',
    },
    {
        id: '10',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'beauty',
    },
    {
        id: '11',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'beauty',
    },
    {
        id: '12',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'beauty',
    },
    {
        id: '13',
        name: 'Name Ingredient',
        image: food,
        price: 25.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        benefit: 'Lorem ipsum dolor sit amet',
        category: 'Energy & Fitness',
    },
];

export const MOCK_CATEGORIES = [
    { label: 'Wellness', id: 'wellness' },
    { label: 'Beauty', id: 'beauty' },
    { label: 'Energy & Fitness', id: 'energy_fitness' },
    { label: 'Immunity', id: 'immunity' },
    { label: `Women's Wellbeing`, id: `women_wellbeing` },
];

export const WELLNESS_GOALS = [
    'I want my hair to be shiny and healthy',
    'I need more energy during the day',
    "I don't want to get sick in winter",
    'I want to increase my work performance',
    'I need gut health',
];

export const MOCK_WELLNESS_GOAL_PRODUCTS = [
    {
        id: 'womens-multivitamin-1',
        name: "Women's Multivitamin",
        label: '70 Hug + 20 Hug Plain',
        image: product1,
        price: 25.99,
        description:
            "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
        tags: ['70 Hug', '20 Hug Plain'],
        category: 'Bestseller',
    },
    {
        id: 'collagen-renew',
        name: "Women's Multivitamin",
        label: 'Collagen Renew',
        image: product2,
        price: 25.99,
        description:
            "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
        category: 'Bestseller',
    },
    {
        id: 'zen-flow',
        name: "Women's Multivitamin",
        label: 'Zen Flow',
        image: product3,
        price: 25.99,
        description:
            "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
        category: 'Bestseller',
    },
    {
        id: 'womens-multivitamin-2',
        name: "Women's Multivitamin",
        label: '70 Hug + 20 Hug Plain',
        image: product1,
        price: 25.99,
        description:
            "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
        tags: ['70 Hug', '20 Hug Plain'],
        category: 'Bestseller',
    },
];

export const KEY_BENEFITS = [
    {
        subtitle: 'Recurring',
        title: 'Subscriptions',
        description:
            'Save & enjoy having your favorites delivered on your schedule.',
        linkText: 'Find out more',
        link: '',
    },
    {
        subtitle: 'Safe',
        title: 'Payment',
        description:
            'Secure payments, always protected. Your safety is our priority.',
        linkText: 'Find out more',
        link: '',
    },
    {
        subtitle: 'Get Help',
        title: 'Choosing Products',
        description:
            'Need assistance choosing? We’re here to help you find the perfect product.',
        linkText: 'Find out more',
        link: '',
    },
];

export const ARROWS = [
    {
        className: 'top-2 lg:top-4 left-[4rem]',
        textClassName: '-top-1 -translate-y-full -translate-x-[30%]',
        arrowIcon: topLeft,
    },
    {
        className: 'right-[4rem] top-2 lg:top-4',
        textClassName: '-top-1 -translate-y-full -translate-x-[30%]',
        arrowIcon: topRight,
    },
    {
        className: 'top-[50%] translate-y-[-50%] right-0 lg:-right-3',
        textClassName: 'top-1 translate-y-full translate-x-[20%]',
        arrowIcon: right,
    },
    {
        className: 'bottom-2 lg:bottom-4 right-[4rem]',
        textClassName: '-bottom-2 translate-y-full -translate-x-[30%]',
        arrowIcon: bottomRight,
    },
    {
        className: 'bottom-2 lg:bottom-4 left-[4rem]',
        textClassName: '-bottom-2 lg:top-6 translate-y-full -translate-x-[30%]',
        arrowIcon: bottomLeft,
    },
    {
        className: 'top-[50%] translate-y-[-50%] left-0 lg:-left-3',
        textClassName: '-top-2 -translate-y-full translate-x-[-50%]',
        arrowIcon: left,
    },
];

export const MENTAL_FOCUS_DATA = [
    {
        image: mary,
        title: `Real mental strength & focus`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.`,
        badgeImage: maryFace,
        fullName: 'Mary Earps',
        position: 'UK Football Player',
    },
    {
        image: mary1,
        title: `Real mental strength & focus`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.`,
        badgeImage: maryFace,
        fullName: 'Mary Earps',
        position: 'UK Football Player',
    },
    {
        image: maryQuote,
        title: `Real mental strength & focus`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.`,
        badgeImage: maryFace,
        fullName: 'Mary Earps',
        position: 'UK Football Player',
    },
];
