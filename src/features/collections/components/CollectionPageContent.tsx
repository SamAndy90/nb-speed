'use client';

import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { CollectionFragment } from '@/gql/storefront/graphql';

import { CollectionDisplaySection } from './CollectionDisplaySection';
import { useState } from 'react';
import { Product } from '@/features/product/types';
import { Separator } from '@/components/ui/separator';
import Filter from '@/assets/icons/filter.svg';
import { ProductRatingBatch } from '@/lib/reviews/types';

export function CollectionPageContent({
    collection,
    initialCollectionProducts,
    ratings,
}: {
    collection: Pick<CollectionFragment, 'title' | 'description' | 'handle'>;
    initialCollectionProducts: Product[];
    ratings: ProductRatingBatch[];
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <>
            <Heading className="w-full items-start gap-3 pb-4 text-start md:mb-8 md:gap-1">
                <h1>{collection.title}</h1>
                <div className="flex w-full justify-between gap-6 gap-x-9">
                    <p className="max-w-52 text-paragraph-4 sm:max-w-none lg:text-paragraph-2">
                        {collection.description}
                    </p>
                    <Button
                        variant="outline"
                        className="gap-2 rounded-xxs border-neutral-300 md:hidden"
                        onClick={() => setDialogOpen(true)}>
                        Filters <Filter />
                    </Button>
                </div>
            </Heading>
            <Separator />
            <CollectionDisplaySection
                ratings={ratings}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                handle={collection.handle}
                initialCollection={initialCollectionProducts}
            />
        </>
    );
}
