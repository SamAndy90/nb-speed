import image1 from '@/assets/nutritionist/image1.webp';
import image2 from '@/assets/nutritionist/image2.webp';
import image3 from '@/assets/nutritionist/image3.webp';
import image4 from '@/assets/nutritionist/image4.webp';
import image5 from '@/assets/nutritionist/image5.webp';
import christiannaUPD from '@/assets/christianna-nutritionist.png';

import RadianceRenewIMG from '@/assets/products/radiance-renew.webp';
import WomensMultivitaminIMG from '@/assets/products/womens-multivitamin.webp';

export const TIPS = [image1, image2, image3, image4, image5];

export const CHRISTIANNA_QUOTE = {
    quote: `“Nutriburst echo my own ethos about health and wellness; especially that nutrition should be accessible, enjoyable and most importantly effective, by using quality ingredients.”`,
    name: `– Christianna`,
    title: ``,
    imageSrc: christiannaUPD,
    imageAlt: 'Christianna Karaolis',
};

export const MOCK_PRODUCTS = [
    {
        id: 'womens-multivitamin-sugar-free-vegan-gummies',
        name: "Women's Multivitamin",
        label: '70 Hug + 20 Hug Plain',
        image: WomensMultivitaminIMG,
        price: 15.99,
        description:
            'Even as a nutritionist who eats a nourished balanced diet, I know I still don’t always get all the nutrients I need through my food. This multivitamin is my tasty insurance policy to help me feel my body’s nutrition needs are met every single day.',
        tags: ['70 Hug', '20 Hug Plain'],
        category: 'Advanced',
    },
    {
        id: 'radiance-renew',
        name: 'Radiance Renew',
        label: 'Radiance Renew',
        image: RadianceRenewIMG,
        price: 22.99,
        description:
            'Collagen is key for healthy skin, hair, nails, joints, and more, but we naturally lose it as we age. Supporting collagen production means giving your body the right nutrients - and this delicious blend is my daily way of making sure I’m doing just that.',
        category: 'Advanced',
    },
    // {
    //     id: 'zen-flow',
    //     name: "Women's Multivitamin",
    //     label: 'Zen Flow',
    //     image: product3,
    //     price: 25.99,
    //     description:
    //         "Even as a nutritionist who eats a nourished balanced diet, I know I still don't always get all the nutrients I need through my food",
    //     category: 'Bestseller',
    // },
];
