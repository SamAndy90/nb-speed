import { ImageFragment } from '@/gql/storefront/graphql';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export type HeroOption = {
    coloredText?: string;
    plainText?: string;
    headingColour: string;
    productImage: Pick<ImageFragment, 'url' | 'altText'>;
    expertName: string;
    expertImage: Pick<ImageFragment, 'url' | 'altText'>;
};
