import { Button } from '@/components/ui/button';
import {
    ProductSectionSubtitle,
    ProductSectionTitle,
} from '@/features/product/components/ProductHeading/ProductHeading';
import { HoverImage } from './HoverImage';
import Container from '@/components/container';

export function MeetOurNutritionist() {
    return (
        <section className="w-full pb-[50px] pt-[100px] lg:py-[120px]">
            <Container className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-[78px]">
                <ProductSectionTitle className="block text-left md:text-center lg:hidden">
                    Meet our Nutritionist,
                    <br />
                    <span className="bg-cooper-text-gradient bg-clip-text font-medium text-transparent">
                        Christianna Karaolis
                    </span>
                </ProductSectionTitle>

                <HoverImage />

                <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center">
                    <ProductSectionTitle className="hidden text-left md:text-center lg:block">
                        Meet our Nutritionist,
                        <br />
                        <span className="bg-cooper-text-gradient bg-clip-text font-medium text-transparent">
                            Christianna Karaolis
                        </span>
                    </ProductSectionTitle>
                    <ProductSectionSubtitle className="mb-5 text-start text-paragraph-4 lg:mb-6 lg:mt-8 lg:text-center lg:text-paragraph-2">
                        Christianna, a registered nutritionist, joins Nutriburst
                        with expertise in women&apos;s and family health,
                        focusing on personalized nutrition and lifestyle plans.
                    </ProductSectionSubtitle>
                    {/* <div className="flex gap-3">
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
                    </div> */}
                </div>
            </Container>
        </section>
    );
}
