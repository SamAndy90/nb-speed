// @deprecated

import Image from 'next/image';
import {
    ProductSectionHeading,
    ProductSectionSubtitle,
    ProductSectionTitle,
} from '../../ProductHeading/ProductHeading';
import { ProductSection } from '../../ProductSection';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import christianna from '@/assets/christianna.webp';
export function OurCommitment() {
    return (
        <ProductSection className="flex flex-col items-start gap-32 bg-gradient-to-b from-primary to-theme-50">
            <div className="flex grid-cols-2 flex-col gap-8 md:grid">
                <div className="max-md:order-2">
                    <Image
                        src={christianna}
                        alt=""
                        className="aspect-[580/480] w-[580px] rounded-3xl object-cover"
                    />
                </div>
                <ProductSectionHeading className="contents items-center justify-center md:flex">
                    <ProductSectionTitle className="">
                        Meet our Nutritionist,
                        <br />
                        <b className="text-accent-ocean-blue">
                            Christianna Karaolis
                        </b>
                    </ProductSectionTitle>
                    <ProductSectionSubtitle className="order-3 max-w-lg text-sm md:mb-4 md:mt-6 md:text-lg">
                        Christianna, a registered nutritionist, joins Nutriburst
                        with expertise in women&apos;s and family health,
                        focusing on personalized nutrition and lifestyle plans.
                    </ProductSectionSubtitle>
                    <div className="order-4 flex gap-3">
                        <Button
                            asChild
                            variant="dark"
                            size="md"
                            sizeDesktop="lg"
                            className="h-[34px]">
                            <Link href="/">Shop her choices</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="md"
                            sizeDesktop="lg"
                            className="h-[34px]">
                            <Link href="/">Find out more</Link>
                        </Button>
                    </div>
                </ProductSectionHeading>
            </div>
        </ProductSection>
    );
}
