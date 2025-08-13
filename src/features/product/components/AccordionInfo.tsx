import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Product, VariantDetails } from '../types';
import { cn } from '@/lib/utils';

type AccordionInfoProps = {
    product: Product;
    variantDetails: VariantDetails;
};

const AccordionInfo = ({ product, variantDetails }: AccordionInfoProps) => {
    const { ingredients, nutritional } = variantDetails;
    const isHydrationProduct = product.handle.includes('hydration');

    return (
        <Accordion type="single" collapsible className="mt-10">
            <Separator />
            <AccordionItem value="ingredients">
                <AccordionTrigger>Ingredients</AccordionTrigger>
                <AccordionContent>
                    <div className={'space-y-3 lg:space-y-4'}>
                        {(isHydrationProduct
                            ? ingredients
                            : product.details.ingredients
                        )?.map((ingredient) => (
                            <p
                                key={ingredient}
                                className="text-paragraph-4 lg:text-paragraph-3">
                                {ingredient}
                            </p>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>

            {!isHydrationProduct && product.details.nutritional && (
                <AccordionItem value="nutrition">
                    <AccordionTrigger>Nutrition Information</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-8">
                            {/* Serving Information */}
                            <div>
                                {product.details.nutritional.info.map(
                                    (info, index) => (
                                        <p
                                            key={`nutritional-info-${index}`}
                                            className="text-paragraph-4 lg:text-paragraph-3">
                                            {info}
                                        </p>
                                    )
                                )}
                            </div>

                            <div className="flex gap-[18px]">
                                <div className="flex w-[40%] items-end text-paragraph-4 font-bold lg:text-paragraph-3 lg:font-bold">
                                    Energy
                                </div>
                                {product.details.nutritional.energy &&
                                    Object.keys(
                                        product.details.nutritional.energy
                                    ).map((key, index) => (
                                        <div
                                            key={`energy-${index}`}
                                            className={cn('w-[30%]')}>
                                            <p className="text-paragraph-4 font-bold lg:text-paragraph-3 lg:font-bold">
                                                {key}
                                            </p>
                                            <p className="text-paragraph-4 lg:text-paragraph-3">
                                                {
                                                    product.details.nutritional
                                                        .energy[key]
                                                }
                                            </p>
                                        </div>
                                    ))}
                            </div>

                            {product.details.nutritional.nutrients && (
                                <div>
                                    {product.details.nutritional.nutrients.map(
                                        (nutrient, index) => (
                                            <div
                                                key={`nutrient-${index}`}
                                                className="flex gap-[18px]">
                                                <p className="w-[40%] text-paragraph-4 lg:text-paragraph-3">
                                                    {nutrient.name}
                                                </p>
                                                <p className="w-[30%] text-paragraph-4 lg:text-paragraph-3">
                                                    {nutrient.amount}
                                                </p>
                                                <p className="w-[30%] text-paragraph-4 lg:text-paragraph-3">
                                                    {nutrient.nrv}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Additional Information */}
                            {product.details.nutritional.additional && (
                                <div>
                                    {product.details.nutritional.additional.map(
                                        (additional, index) => (
                                            <p
                                                key={`nutritional-additional-${index}`}
                                                className="text-paragraph-4 lg:text-paragraph-3">
                                                {additional}
                                            </p>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Warning */}
                            <p className="text-paragraph-4 lg:text-paragraph-3">
                                {`WARNING! ${product.details.nutritional.warning}`}
                            </p>

                            {/* End Note */}
                            <p className="text-paragraph-4 lg:text-paragraph-3">
                                {product.details.nutritional.end}
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            )}
            {isHydrationProduct && nutritional && (
                <AccordionItem value="nutrition">
                    <AccordionTrigger>Nutrition Information</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-8">
                            {/* Serving Information */}
                            <div>
                                {nutritional.info.map((info, index) => (
                                    <p
                                        key={`nutritional-info-${index}`}
                                        className="text-paragraph-4 lg:text-paragraph-3">
                                        {info}
                                    </p>
                                ))}
                            </div>

                            <div className="flex gap-[18px]">
                                {nutritional.energy && (
                                    <div className="flex w-[40%] items-end text-paragraph-4 font-bold lg:text-paragraph-3 lg:font-bold">
                                        Energy
                                    </div>
                                )}
                                {nutritional.energy &&
                                    Object.keys(nutritional.energy).map(
                                        (key, index) => (
                                            <div
                                                key={`energy-${index}`}
                                                className={cn('w-[30%]')}>
                                                <p className="text-paragraph-4 font-bold lg:text-paragraph-3 lg:font-bold">
                                                    {key}
                                                </p>
                                                <p className="text-paragraph-4 lg:text-paragraph-3">
                                                    {nutritional.energy?.[key]}
                                                </p>
                                            </div>
                                        )
                                    )}
                            </div>

                            {nutritional.nutrients && (
                                <div>
                                    {nutritional.nutrients.map(
                                        (nutrient, index) => (
                                            <div
                                                key={`nutrient-${index}`}
                                                className="flex gap-[18px]">
                                                <p className="w-[40%] text-paragraph-4 lg:text-paragraph-3">
                                                    {nutrient.name}
                                                </p>
                                                <p className="w-[30%] text-paragraph-4 lg:text-paragraph-3">
                                                    {nutrient.amount}
                                                </p>
                                                <p className="w-[30%] text-paragraph-4 lg:text-paragraph-3">
                                                    {nutrient.nrv}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Additional Information */}
                            {nutritional.additional && (
                                <div>
                                    {nutritional.additional.map(
                                        (additional, index) => (
                                            <p
                                                key={`nutritional-additional-${index}`}
                                                className="text-paragraph-4 lg:text-paragraph-3">
                                                {additional}
                                            </p>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Warning */}
                            <p className="text-paragraph-4 lg:text-paragraph-3">
                                {`WARNING! ${nutritional.warning}`}
                            </p>

                            {/* End Note */}
                            <p className="text-paragraph-4 lg:text-paragraph-3">
                                {nutritional.end}
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            )}
            <AccordionItem value="how-to-use">
                <AccordionTrigger>How to use</AccordionTrigger>
                <AccordionContent>{product.details.howToTake}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping  ">
                <AccordionTrigger>Shipping</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col gap-2">
                        {/* Shipping */}
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">Shipping</p>
                            <div>
                                {product.details?.shipping?.shipping?.map(
                                    (shipping, index) => (
                                        <p
                                            key={`shipping-${index}`}
                                            className="text-paragraph-4 lg:text-paragraph-3">
                                            {shipping}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>
                        {/* Tracking */}
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">Tracking</p>
                            <div>
                                {product.details?.shipping?.Tracking?.map(
                                    (tracking, index) => (
                                        <p
                                            key={`tracking-${index}`}
                                            className="text-paragraph-4 lg:text-paragraph-3">
                                            {tracking}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>
                        {/* Dispatch */}
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">Dispatch</p>
                            <div>
                                {product.details?.shipping?.dispatch?.map(
                                    (dispatch, index) => (
                                        <p
                                            key={`dispatch-${index}`}
                                            className="text-paragraph-4 lg:text-paragraph-3">
                                            {dispatch}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionInfo;
