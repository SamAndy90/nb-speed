import product1 from '@/assets/products/product-1.webp';
import product2 from '@/assets/products/product-2.webp';
import product3 from '@/assets/products/product-3.webp';
import product4 from '@/assets/products/product-4.webp';
import product5 from '@/assets/products/product-5.webp';

import SimranIMG from '@/assets/about-us/Simran.jpg';
import CourtneyIMG from '@/assets/about-us/Courtney.jpg';
import MoynulIMG from '@/assets/about-us/Moynul.jpg';
import OliviaIMG from '@/assets/about-us/Olivia.jpg';
import PrithvirajIMG from '@/assets/about-us/Prithviraj.jpg';
import SteveIMG from '@/assets/about-us/Steve.jpg';
import TarunIMG from '@/assets/about-us/Tarun.jpg';
import TylorIMG from '@/assets/about-us/Tylor.jpg';
import VickyIMG from '@/assets/about-us/Vicky.jpg';

import leanne from '@/assets/leanne_zenflow-cropped.webp';
import christianna from '@/assets/christianna-cropped.webp';
import member3 from '@/assets/member-3-cropped.webp';

// qualifications
import InformedSport from '@/assets/qualifications/informed.webp';
import GlossWellNess from '@/assets/qualifications/gloss-wellness-awards.webp';
import Grma from '@/assets/qualifications/grma.webp';
import Nutrib from '@/assets/qualifications/nutrib.webp';
import Haccp from '@/assets/qualifications/haccp.webp';
import Bros from '@/assets/qualifications/bros.webp';

export const HERO_PRODUCT_IMAGES = [
    product1,
    product2,
    product3,
    product4,
    product5,
];

export const COMPANY_STATS = [
    {
        circleImages: [
            { src: SteveIMG, alt: 'Steve' },
            { src: OliviaIMG, alt: 'Olivia' },
            { src: MoynulIMG, alt: 'Moynul' },
            { src: SimranIMG, alt: 'Simran' },
        ],
        count: '15+',
        label: 'People',
        description: 'A close-knit team, united by purpose.',
    },
    {
        circleImages: [
            { src: leanne, alt: 'leanne' },
            { src: christianna, alt: 'christianna' },
            { src: member3, alt: 'member3' },
        ],
        count: '20+',
        label: 'Experts',
        description: 'Guided by science, trusted by professionals.',
    },
    {
        circleImages: [
            { src: Nutrib, alt: 'Nutrib' },
            { src: GlossWellNess, alt: 'GlossWellNess' },
        ],
        count: '10',
        label: 'Awards',
        description: 'Recognised for raising the bar.',
    },
    {
        count: '4',
        label: 'Years',
        description: 'Established in 2021 and just getting started.',
    },
];

export const MEMBERS = [
    {
        image: SimranIMG,
        fullName: 'Simran Kanwar',
        position: 'Founder & Director',
    },
    {
        image: CourtneyIMG,
        fullName: 'Courtney',
        position: 'National Account Manager',
    },
    {
        image: MoynulIMG,
        fullName: 'Moynul',
        position: 'Head of Ecommerce',
    },
    {
        image: OliviaIMG,
        fullName: 'Olivia',
        position: 'Social Media & Content Manager',
    },
    {
        image: PrithvirajIMG,
        fullName: 'Prithviraj',
        position: 'Supply Chain Assistant',
    },
    {
        image: SteveIMG,
        fullName: 'Stephen',
        position: 'Head of Operations',
    },
    {
        image: TarunIMG,
        fullName: 'Tarun',
        position: 'Chief Operations Officer',
    },
    {
        image: TylorIMG,
        fullName: 'Tyler',
        position: 'Finance Manager',
    },
    {
        image: VickyIMG,
        fullName: 'Victoria',
        position: 'Chief Commercial Officer',
    },
];

export const QUALIFICATIONS = [
    {
        badge: InformedSport,
        name: 'Informed Sport Certified',
        description: `This program tests every batch of supplements for impure & banned substances, ensuring their safety and quality for athletes.`,
    },
    {
        badge: Bros,
        name: 'Global Food Safety Standard ',
        description: `This certification signifies our commitment to the highest standards of food safety, quality, and operational management`,
    },
    {
        badge: Haccp,
        name: 'HACCP Certified Food Safety',
        description: `Food Safety Preventative Controls for Human Food and Hazard Analysis and Critical Control Point`,
    },
    {
        badge: Grma,
        name: 'Global Retailer &  Manufacturer Alliance, Inc ',
        description: `Good Manufacturing Practices for Dietary Supplements Certification Program v1NSF/ANSI 455-2 -2018`,
    },
];
