'use client';
import { ImageFragment } from '@/gql/storefront/graphql';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import { useState, useEffect } from 'react';
const MAX_ITEMS_SHOWN = 2;

function DashboardOrderPreview({
    image,
    index,
    maxItemsShown,
    hiddenItemCount,
}: {
    image: ImageFragment;
    index: number;
    maxItemsShown: number;
    hiddenItemCount: number;
}) {
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
    }, []);

    return (
        <div className="relative aspect-square h-full overflow-clip rounded">
            {error || !image ? (
                <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400">
                    No Image
                </div>
            ) : (
                <Image
                    src={image?.url}
                    alt={image?.altText ?? ''}
                    fill
                    className="object-cover"
                />
            )}
            {index === maxItemsShown - 1 && hiddenItemCount > 0 && (
                <div className="absolute inset-0 flex size-full items-center justify-center bg-[#2F2F3366] text-xl font-bold text-primary">
                    +{hiddenItemCount}
                </div>
            )}
        </div>
    );
}

/**
 * Displays a preview of the items in an order.
 * If the number of items exceeds the maximum number of items shown, a count of the hidden items is displayed.
 */
export function DashboardOrderPreviews({
    itemImages,
    maxItemsShown = MAX_ITEMS_SHOWN,
}: {
    itemImages: ImageFragment[];
    maxItemsShown?: number;
}) {
    const desktop = useMediaQuery('md');
    const responsiveItemsShown = desktop ? maxItemsShown : 2;
    const shownItems = itemImages.slice(0, responsiveItemsShown);
    const hiddenItems = itemImages.slice(responsiveItemsShown);
    const hiddenItemCount = hiddenItems.length;

    return (
        <>
            {shownItems.map((item, i) => (
                <DashboardOrderPreview
                    key={`dashboard-order-preview-${i}`}
                    image={item}
                    index={i}
                    maxItemsShown={responsiveItemsShown}
                    hiddenItemCount={hiddenItemCount}
                />
            ))}
        </>
    );
}
