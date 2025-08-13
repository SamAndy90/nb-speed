'use client';

import { CollectionProductsList } from './CollectionProductsList';
import { CollectionFilterOptions } from './CollectionFilterOptions';
import { CollectionContextProvider } from '../../providers/collection';
import { DialogFooter } from '@/components/ui/dialog';
import { Product } from '@/features/product/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import CloseCircle from '@/assets/icons/close-circle.svg';
import { ProductRatingBatch } from '@/lib/reviews/types';

export function CollectionDisplaySection({
    handle,
    initialCollection,
    dialogOpen,
    setDialogOpen,
    ratings,
}: {
    handle: string;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    initialCollection: Product[];
    ratings: ProductRatingBatch[];
}) {
    const desktop = useMediaQuery('md');

    return (
        <CollectionContextProvider
            handle={handle}
            initialCollection={initialCollection}
            initialRatings={ratings}>
            <div className="flex w-full gap-10 pb-[62px] pt-[50px] lg:pb-30 lg:pt-[80px]">
                {desktop ? (
                    <CollectionFilterOptions
                        defaultAccordionValue={[
                            'sort',
                            'collections',
                            'benefits',
                        ]}
                    />
                ) : (
                    <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
                        <SheetContent
                            overlay
                            className="z-50 h-fit rounded-3xl rounded-b-none p-5 py-4"
                            overlayClassName="bg-[#32323278] backdrop-blur-0"
                            side={'bottom'}>
                            <SheetHeader className="flex w-full flex-row items-center justify-center pb-4 text-base font-bold">
                                Sort & Filter{' '}
                                <span
                                    onClick={() => setDialogOpen(false)}
                                    className={cn(
                                        'absolute right-[19px] rounded-sm opacity-70 outline-none ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
                                    )}>
                                    <CloseCircle className="size-8" />
                                    <span className="sr-only">Close</span>
                                </span>
                                <SheetClose />
                            </SheetHeader>
                            <CollectionFilterOptions
                                className="max-h-[60vh] w-full overflow-y-auto"
                                defaultAccordionValue={['sort']}
                            />
                            <DialogFooter className="pt-5">
                                <Button
                                    onClick={() => setDialogOpen(false)}
                                    variant="dark"
                                    className="w-full">
                                    Apply
                                </Button>
                            </DialogFooter>
                        </SheetContent>
                    </Sheet>
                )}
                <CollectionProductsList />
            </div>
        </CollectionContextProvider>
    );
}
