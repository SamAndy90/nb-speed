import EqualityJustice from '@/assets/icons/holistci-approach/equality-justice.svg';
import Partnership from '@/assets/icons/holistci-approach/partnership.svg';
import GoingBeyondCarbon from '@/assets/icons/holistci-approach/going-beyond-carbon.svg';
import DesignSource from '@/assets/icons/holistci-approach/design-source.svg';
import VectorTop from '@/assets/icons/holistci-approach/vector-top.svg';
import VectorBottom from '@/assets/icons/holistci-approach/vector-bottom.svg';
import VectorLeft from '@/assets/icons/holistci-approach/vector-left.svg';
import VectorRight from '@/assets/icons/holistci-approach/vector-right.svg';

export const HOLISTCI_APPROACH = [
    {
        id: 'enabling-just-transition',
        title: 'Creating a Sustainable Future, Together',
        approach: {
            text: 'We’re committed to building a sustainable future by supporting gender equality, promoting human rights, and empowering diverse communities across our value chain. From sourcing to production, every decision we make ensures fairness and a positive impact for people and the planet.',
        },
        progress: {
            text: 'From sourcing ethically to reducing our carbon footprint, we’re continuously improving every step of our process. While we’ve already made significant strides, we’re committed to doing even more ensuring that every product you love helps create a healthier, more sustainable future.',
        },
    },
    {
        id: 'partnership-goals',
        title: 'Working Together for a Better Tomorrow',
        approach: {
            text: 'We know that true change comes from collaboration. That’s why we partner with like- minded organizations, communities, and innovators to drive collective action for a more sustainable future. By working together, we can amplify our impact and accelerate progress.',
        },
        progress: {
            text: 'Our collaboration with Clime Co and the TONTOTON project is just one example of how we’ re partnering to make a meaningful environmental impact. We’re also focused on building lasting partnerships that promote gender equality, human rights, and sustainability across our entire value chain.',
        },
    },

    {
        id: 'designing-with-earth',
        title: 'Sourcing Smarter, Designing Greener',
        approach: {
            text: "We believe sustainability starts at the design phase. That's why we focus on making every product design as efficient as possible, reducing unnecessary plastic and waste from the outset. From choosing recyclable materials to reducing packaging size, we ensure our products are designed with the planet in mind at every stage.",
        },
        progress: {
            text: 'We’re currently reducing the size of our pots to eliminate empty space and minimize plastic waste. For our daily range, we’re switching to white single- material caps, which are more easily recyclable, helping reduce our environmental impact without compromising on quality.',
        },
    },
    {
        id: 'beyond-carbon',
        title: 'Sustainability at Scale: More Than Carbon Footprints',
        approach: {
            text: 'Sustainability isn’t just about reducing carbon emissions, it’s about creating long-term, positive change for the planet. We’re committed to going beyond carbon offsetting by focusing on resource efficiency, waste reduction, and innovative solutions that minimize our overall environmental impact.',
        },
        progress: {
            text: 'In 2024, we renewed our Net Zero Footprint by recovering Ocean Bound Plastic Waste through the TONTOTON project with Clime Co. In addition, 30% of our bottles are now made from recycled materials, and we’re actively seeking out ways to reduce emissions throughout our supply chain.',
        },
    },
];

export const HOLISTCI_APPROACH_CIRCLE_ITEMS = [
    {
        key: 'enabling-just-transition',
        icon: EqualityJustice,
        label: 'Equality & Justice',
        position: 'top-0 left-0',
    },
    {
        key: 'partnership-goals',
        icon: Partnership,
        label: 'Partnership',
        position: 'right-0 top-0',
    },
    {
        key: 'designing-with-earth',
        icon: DesignSource,
        label: 'Design & Source',
        position: 'bottom-0 right-0',
    },
    {
        key: 'beyond-carbon',
        icon: GoingBeyondCarbon,
        label: 'Going Beyond Carbon',
        position: 'left-0 bottom-0',
    },
];

export const HOLISTCI_APPROACH_CIRCLE_VECTORS = [
    { position: 'left-0 top-0 right-0', icon: VectorTop },
    { position: 'top-0 bottom-0 right-0', icon: VectorRight },
    { position: 'left-0 bottom-0 right-0', icon: VectorBottom },
    { position: 'left-0 top-0 bottom-0', icon: VectorLeft },
];

export const POSITIVE_IMPACT_CREATED = [
    {
        title: 'Protecting our lands and oceans',
        description:
            'The plastic credits from TONTOTON are the world’s first from an independent protocol using third-party verification. One credit equals one tonne of physical plastic waste removed from the marine-bound environment. The credits have the Ocean Bound Plastic Neutrality Certification, an independent standard of Zero Plastic Oceans, an NGO based in France, with third-party verification and auditing performed by the 100-year-old Control Union.',
    },
    {
        title: 'Empowering communities',
        description:
            'We promote gender equality and human rights by creating socio-economic benefits for local communities through environmental conservation. With TONTOTON, we help provide additional opportunities for informal waste workers, especially women, while establishing waste management systems and infrastructure in economically stressed areas.',
    },
    {
        title: `Supporting UN’s SDGs`,
        description: `We’re proud to contribute to the United Nations' Sustainable Development Goals through our Plastic Removal Project with TONTOTON. This initiative supports seven SDGs:`,
        list: [
            '#1 No Poverty',
            '#5 Gender Equality',
            '#8 Decent Work & Economic Growth',
            '#9 Industry, Innovation & Infrastructure',
            '#11 Sustainable Cities & Communities',
            '#14 Life Below Water',
            '#17 Partnerships for the Goals',
        ],
    },
];
