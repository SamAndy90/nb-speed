import { ProductFragment } from '@/gql/storefront/graphql';
import { StaticImageData } from 'next/image';
import { z } from 'zod';
import { RemoveEdgesAndNodes } from '../shopify/types';

export type CarouselPerson = {
    src: StaticImageData;
    alt?: string;
    name: string;
    subtitle: string;
    quote: string;
};

export type ProductReview = {
    firstName: string;
    lastName: string;
    rating: number;
    text: string;
};

export type ProductRating = {
    score: number;
    count: number;
};

interface Nutritional {
    info: string[];
    energy: {
        [key: string]: string;
    };
    nutrients: {
        name: string;
        amount: string;
        nrv: string;
    }[];
    additional: string[];
    warning: string;
    end: string;
}

export type ProductDetails = {
    SKU: string;
    description: string;
    shortDescription: string;
    twoGummiesDailyBenefits: string[];
    problemKillerFact: {
        image?: string;
        mobileImage?: string;
        title: string;
        description: string;
    };
    solutionToProductSpecific: {
        heading: string;
        image?: string;
        accentHeading?: string;
        description: string;
        product: {
            title: string;
            description: string;
            benefits: string[];
        };
        ingredients: Array<{
            name: string;
            description: string;
            benefits: string[];
        }>;
    };
    whySettle: {
        image?: string;
        title: string;
        description: string;
        settles: Array<{
            title: string;
            settles: string[];
        }>;
    };
    formulatedWithCare: string[];
    howToTake: string;
    shipping: {
        dispatch: string[];
        shipping: string[];
        Tracking: string[];
    };
    nutritional: Nutritional;
    ingredients: string[];
    faqImage?: string;
    faq: Array<{
        question: string;
        answer: string;
    }>;
    reviews?: Array<{
        reviewer: string;
        review: string;
    }>;
};

export type VariantDetails = {
    SKU: string;
    description: string;
    oneSachetDailyBenefits: string[];
    ingredients: string[];
    nutritional: {
        info: string[];
        energy?: {
            [key: string]: string;
        };
        nutrients: {
            name: string;
            amount: string;
            nrv: string;
        }[];
        additional: string[];
        warning?: string;
        end?: string;
    };
    problemKillerFact: {
        image?: string;
        mobileImage?: string;
        title: string;
        description: string;
    };
    solutionToProductSpecific: {
        heading?: string;
        accentHeading?: string;
        description: string;
        product?: {
            title: string;
            description: string;
            benefits: string[];
        };
        ingredients: {
            name: string;
            description?: string;
            benefits: string[];
        }[];
        image?: string;
    };
    reviews?: {
        reviewer: string;
        review: string;
    }[];
};

export const ProductBenefitSchema = z.array(z.string());
export type ProductBenefit = z.infer<typeof ProductBenefitSchema>;

export type Product = RemoveEdgesAndNodes<
    Omit<
        ProductFragment,
        'benefits' | 'twoGummiesDailyBenefits' | 'formulatedWithCare'
    > & {
        benefits: ProductBenefit;
        details: ProductDetails;
    }
>;
