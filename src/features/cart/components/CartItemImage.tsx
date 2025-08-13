import { ImageFragment } from '@/gql/storefront/graphql';
import Image from 'next/image';

/**
 * Preview of the product image.
 */
export function CartItemImage({ image }: { image: ImageFragment }) {
    return (
        <div className="relative aspect-square h-full">
            <Image
                src={image.url}
                alt={image.altText ?? ''}
                width={0}
                height={0}
                sizes="100vw"
                className="min-w-[72px] md:min-w-[80px] h-auto aspect-[1/1]"
            />
        </div>
    );
}
