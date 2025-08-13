import { ReviewCount, StarRating, Stars } from '@/components/Ratings';
import { Badge } from '@/components/ui/badge';
import { ButtonProps } from '@/components/ui/button';
import { AddToCartButton } from '@/features/cart/components/AddToCart';
import { Product } from '@/features/product/types';
import {
    ADVANCED_TAG,
    ESSENTIALS_TAG,
    HYDRATION_TAG,
    KIDS_TAG,
    NEW_TAG,
} from '@/features/shopify/consts';
import { imageFragment } from '@/features/shopify/graphql/storefront/fragments/image';
import { getFragmentData } from '@/gql/storefront';
import { cn, currencyFormatter } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import Image from 'next/image';
import {
    ComponentProps,
    createContext,
    PropsWithChildren,
    useContext,
    useMemo,
} from 'react';

const DEFAULT_SHORT_DESCRIPTION =
    'Tropical-flavored gummies for energy, deep relaxation, and stress resistance.';

//TODO: What should the component look like when the text is too long?
const ProductContext = createContext<Product | null>(null);
function useProduct() {
    const product = useContext(ProductContext);
    return product;
}

type ProductCardImageProps = {
    hideBadge?: boolean;
    collection?: string;
} & PropsWithClassName;
export function ProductCardImage({
    className,
    hideBadge = false,
    collection,
}: ProductCardImageProps) {
    const product = useProduct();

    if (!product) return null;
    const image = product
        ? getFragmentData(imageFragment, product.featuredImage)
        : null;

    const hasNewTag = product.tags?.includes(NEW_TAG);

    const productCollection =
        collection ??
        product.tags.find(
            (tag) =>
                tag === ADVANCED_TAG ||
                tag === ESSENTIALS_TAG ||
                tag === KIDS_TAG ||
                tag === HYDRATION_TAG
        );

    const badgeColor = useMemo(() => {
        if (hasNewTag) return 'bg-beige-new';
        if (productCollection === ADVANCED_TAG) return 'bg-gradient-bronze';
        if (productCollection === ESSENTIALS_TAG) return 'bg-gradient-silver';
        if (productCollection === KIDS_TAG) return 'bg-beige-light';
        if (productCollection === HYDRATION_TAG) return 'bg-ocean-blue-300';
        return null;
    }, [productCollection, hasNewTag]);

    const badgeText = useMemo(() => {
        if (hasNewTag) return 'New';
        if (productCollection === ADVANCED_TAG) return 'Advanced';
        if (productCollection === ESSENTIALS_TAG) return 'Essentials';
        if (productCollection === KIDS_TAG) return 'Kids';
        if (productCollection === HYDRATION_TAG) return 'Hydration';
        return null;
    }, [productCollection, hasNewTag]);

    if (!image) return null;

    return (
        <div className={cn('relative w-full grow', className)}>
            {image && (
                <Image
                    src={image.url}
                    alt={image.altText ?? ''}
                    fill
                    className="object-contain md:object-cover"
                />
            )}
            {!hideBadge && badgeText && (
                <Badge
                    className={cn(
                        'absolute left-0 top-3 z-10 hidden rounded-xxs rounded-l-none border-none px-3 py-1.5 text-xs md:flex',
                        badgeColor,
                        { hidden: !productCollection }
                    )}>
                    {badgeText}
                </Badge>
            )}
        </div>
    );
}
export function ProductCardContent({
    className,
    children,
}: PropsWithClassName & PropsWithChildren) {
    return (
        <div
            className={cn(
                'flex h-fit min-h-48 w-full shrink-0 flex-col gap-2 bg-primary p-5',
                className
            )}>
            {children}
        </div>
    );
}
export function ProductCardTitle({
    children,
    className,
    ...props
}: ComponentProps<'h3'>) {
    const product = useProduct();
    const title = product?.title ?? '';
    return (
        <h3 className={cn('font-sans text-base font-bold', className)}>
            {children ?? title}
        </h3>
    );
}
export function ProductCardDescription({
    className,
    children,
    ...props
}: ComponentProps<'p'>) {
    const product = useProduct();
    return (
        <p className={cn('grow text-sm', className)} {...props}>
            {children ??
                product?.details?.shortDescription ??
                DEFAULT_SHORT_DESCRIPTION}
        </p>
    );
}
export function ProductCardFooter({
    className,
    ...props
}: ComponentProps<'div'>) {
    return <div className={cn('mt-2 flex gap-3', className)} {...props} />;
}
export function ProductAddToCartButton({
    className,
    handle,
    ...props
}: ButtonProps & { handle?: string }) {
    const product = useProduct();

    if (!product) return null;
    return (
        <AddToCartButton
            {...props}
            product={product}
            variant="dark"
            className={cn('text-xs', className)}
            size="sm"
        />
    );
}

export type ProductCardProps = {
    product: Product;
    rating: number | string;
    reviewCount: number;
    collection?: string;
} & ComponentProps<'li'>;
function DefaultProductCardInner({
    product,
    rating,
    reviewCount,
    collection,
    className,
    ...props
}: ProductCardProps) {
    const shortDescription =
        product.shortDescription?.value ?? DEFAULT_SHORT_DESCRIPTION;
    const price = product.priceRange.maxVariantPrice.amount;

    const formattedPrice = currencyFormatter.format(price);
    return (
        <>
            <ProductCardImage collection={collection} />
            <ProductCardContent>
                <div className="flex justify-between">
                    <StarRating
                        score={Number(rating)}
                        reviewCount={reviewCount}
                        className="text-xs">
                        <Stars />
                        <ReviewCount />
                    </StarRating>
                    <div className="text-sm font-bold">{formattedPrice}</div>
                </div>
                <ProductCardTitle />
                <ProductCardDescription>
                    {shortDescription}
                </ProductCardDescription>
                <ProductCardFooter>
                    <ProductAddToCartButton />
                </ProductCardFooter>
            </ProductCardContent>
        </>
    );
}
export function ProductCard({
    product,
    rating,
    reviewCount,
    collection,
    className,
    children,
    ...props
}: ProductCardProps) {
    return (
        <ProductContext.Provider value={product}>
            <li
                className={cn(
                    'flex h-[490px] w-80 shrink-0 flex-col overflow-clip rounded-md shadow-soft',
                    className
                )}
                {...props}>
                {children ?? (
                    <DefaultProductCardInner
                        product={product}
                        rating={rating}
                        reviewCount={reviewCount}
                        collection={collection}
                    />
                )}
            </li>
        </ProductContext.Provider>
    );
}
ProductCard.Image = ProductCardImage;
ProductCard.Content = ProductCardContent;
ProductCard.Title = ProductCardTitle;
ProductCard.Description = ProductCardDescription;
ProductCard.Footer = ProductCardFooter;
ProductCard.AddToCartButton = ProductAddToCartButton;
