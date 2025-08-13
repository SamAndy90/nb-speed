import { Separator } from '@/components/ui/separator';
import GlutenFree from '@/assets/icons/gluten-free.svg';
import Vegan from '@/assets/icons/Vegan.svg';
import Halal from '@/assets/icons/Halal.svg';
import Kosher from '@/assets/icons/Kosher.svg';
import NoArtificialColours from '@/assets/icons/Colours.svg';
import NoArtificialFlavours from '@/assets/icons/Flavours.svg';
import SugarFree from '@/assets/icons/Sugar.svg';
import { FC, SVGProps } from 'react';
import Image from 'next/image';
import InformedBadge from '@/assets/qualifications/informed.webp';

// import ashwagandaNutrition from '@/assets/ashwaganda-nutrition.webp';

const ICON_MAP = {
    'Sugar Free': SugarFree,
    Vegan: Vegan,
    'No artificial flavours': NoArtificialFlavours,
    'No artificial colours': NoArtificialColours,
    'Halal Certified': Halal,
    'Kosher Permited': Kosher,
    'Gluten Free': GlutenFree,
    // 'Informed Sport Certified': InformedSport,
};

function CareItem({
    Icon = GlutenFree,
    children,
}: {
    Icon?: FC<SVGProps<SVGElement>>;
    children: React.ReactNode;
}) {
    return (
        <li className="flex items-center gap-2.5 text-xs md:text-base">
            {Icon && <Icon className="h-[38px] w-[38px]" />} {children}
        </li>
    );
}

export function FormulatedWithCare({ values }: { values: string[] }) {
    return (
        <section className="flex flex-col gap-8">
            <Separator className="md:hidden" />
            <h3 className="w-fit text-mobile-h2 md:text-desktop-h3">
                Formulated <b>with care</b>
            </h3>
            <div className="flex justify-between">
                <ul className="grid w-full grid-cols-2 gap-3">
                    {values.map((value, index) => {
                        const Icon =
                            ICON_MAP[value as keyof typeof ICON_MAP] ?? null;
                        const isInformed = value === 'Informed Sport Certified';
                        if (isInformed) {
                            return (
                                <li
                                    key={`formulated-item-${index}`}
                                    className="flex items-center gap-2.5 text-xs md:text-base">
                                    <Image
                                        src={InformedBadge}
                                        alt="Informed Sport Certified"
                                        className="h-[38px] w-[38px]"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                    />
                                    {value}
                                </li>
                            );
                        }
                        return (
                            <CareItem
                                key={`formulated-item-${index}`}
                                Icon={Icon}>
                                {value}
                            </CareItem>
                        );
                    })}
                </ul>
            </div>

            {/* <Image
                src={sustainabilityClaims}
                alt="Sustainability claims"
                className="hidden w-[54%] md:block"
            /> */}
        </section>
    );
}
