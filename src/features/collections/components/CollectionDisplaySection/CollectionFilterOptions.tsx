'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCollection } from '../../providers/collection';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { ProductCollectionSortKey } from '../../types';
import { Button } from '@/components/ui/button';
import Close from '@/assets/icons/close-small.svg';
import { PropsWithClassName } from '@/types';
import { cn } from '@/lib/utils';

function FilterRadioGroupItem({
    value,
    children,
}: { value: ProductCollectionSortKey | 'all' } & PropsWithChildren) {
    return (
        <div className="flex items-center gap-3">
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value} className="text-sm">
                {children}
            </Label>
        </div>
    );
}
export function CollectionFilterOptions({
    className,
    defaultAccordionValue,
}: PropsWithClassName & { defaultAccordionValue?: string[] }) {
    const {
        collection: {
            sortKey,
            benefitsSelected,
            allBenefits,
            collectionsSelected,
            allCollections,
            collectionImages,
        },
        setSortKey,
        setBenefitsSelected,
        setCollectionsSelected,
    } = useCollection();

    const removeAllFilters = useCallback(() => {
        setSortKey('popular-asc');
        setBenefitsSelected('all');
        setCollectionsSelected('all');
    }, []);

    /*
    The tag lists are a list of the selected tags. We modify it here just to add 'all' to the list of selected tags if they are all selected
     */
    const allBenefitsSelected = benefitsSelected.length === allBenefits.length;

    const benefitsSelectedWithAll = allBenefitsSelected
        ? ['all']
        : benefitsSelected;

    const allCollectionsSelected =
        collectionsSelected.length === allCollections.length;

    const collectionsSelectedWithAll = allCollectionsSelected
        ? ['all']
        : collectionsSelected;

    return (
        <div
            className={cn(
                'flex w-60 shrink-0 flex-col gap-[27px] md:gap-10',
                className
            )}>
            <Accordion
                className="flex flex-col gap-[27px] md:gap-10"
                type="multiple"
                variant="filter"
                defaultValue={defaultAccordionValue}>
                <AccordionItem className="gap-0 md:gap-0" value="sort">
                    <AccordionTrigger className="min-h-[auto]">
                        Sort By
                    </AccordionTrigger>
                    <AccordionContent innerClassName="pb-0 pt-4">
                        <RadioGroup
                            defaultValue="popular"
                            className="flex h-fit flex-col gap-4"
                            value={sortKey ?? 'popular-asc'}
                            onValueChange={setSortKey}>
                            <FilterRadioGroupItem value="popular-asc">
                                Most Popular
                            </FilterRadioGroupItem>
                            <FilterRadioGroupItem value="price-asc">
                                Price: Low to High
                            </FilterRadioGroupItem>
                            <FilterRadioGroupItem value="price-desc">
                                Price: High to Low
                            </FilterRadioGroupItem>
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="gap-0 md:gap-0" value="collections">
                    <AccordionTrigger className="min-h-[auto]">
                        Filter by Benefits
                    </AccordionTrigger>
                    <AccordionContent innerClassName="pb-0 pt-4">
                        <ToggleGroup
                            type="multiple"
                            className="flex flex-wrap justify-start gap-3"
                            value={collectionsSelectedWithAll}
                            onValueChange={setCollectionsSelected}>
                            <ToggleGroupItem
                                variant="outline"
                                value="all"
                                className="whitespace-nowrap">
                                All Benefits
                            </ToggleGroupItem>
                            {allCollections.map((collection) => {
                                const image = collectionImages[collection];
                                return (
                                    <ToggleGroupItem
                                        variant="outline"
                                        key={collection}
                                        value={collection}
                                        className="whitespace-nowrap has-[img]:*:pl-3">
                                        {image && (
                                            <Image
                                                src={image.url}
                                                alt={
                                                    image.altText ??
                                                    `Icon for ${collection}`
                                                }
                                                width={20}
                                                height={20}
                                            />
                                        )}
                                        {collection}
                                    </ToggleGroupItem>
                                );
                            })}
                        </ToggleGroup>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="gap-0 md:gap-0" value="benefits">
                    <AccordionTrigger className="min-h-[auto]">
                        Filter by Line
                    </AccordionTrigger>
                    <AccordionContent innerClassName="pb-0 pt-4">
                        <ToggleGroup
                            type="multiple"
                            className="flex flex-wrap justify-start gap-3"
                            value={benefitsSelectedWithAll}
                            onValueChange={setBenefitsSelected}>
                            <ToggleGroupItem
                                variant="outline"
                                value="all"
                                className="whitespace-nowrap">
                                All Products
                            </ToggleGroupItem>
                            {allBenefits.map((benefit) => (
                                <ToggleGroupItem
                                    variant="outline"
                                    key={benefit}
                                    value={benefit}
                                    className="whitespace-nowrap">
                                    {benefit}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button
                className="hidden w-fit items-center justify-center gap-2 pl-3 pr-5 md:flex"
                variant="outline"
                onClick={removeAllFilters}>
                <Close className="size-4" /> Remove All
            </Button>
        </div>
    );
}
