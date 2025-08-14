import BgIMG from '@/assets/about-us/trusted-sertified-bg.jpg';
import Image from 'next/image';

import Link from 'next/link';
import { MainUrls } from '@/route-urls';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const SustainabilityPromise = () => {
    return (
        <div
            className={
                'relative flex aspect-[1.28] w-full overflow-hidden rounded-[0.625rem] shadow-soft lg:aspect-auto'
            }>
            <div className="relative flex h-full w-full">
                <Image
                    src={BgIMG}
                    alt="Family Tree"
                    fill
                    className={'select-none rounded-[inherit] object-cover'}
                />
                <Link
                    href={MainUrls.getSustainability()}
                    className="z-[1] flex w-full items-end justify-between gap-2 rounded-[inherit] bg-gradient-4 p-4 md:p-8">
                    <div className="flex max-w-[310px] flex-col gap-2 text-primary-white">
                        <div className="text-paragraph-3 font-semibold">
                            ENVIRONMENTAL CLAIM
                        </div>

                        <h4 className="font-light md:font-light">
                            Returning more than what we take
                        </h4>
                    </div>
                    <Button className="mb-2.5 flex h-[34px] w-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-full bg-gradient-2 p-0">
                        <ChevronRight size={16} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SustainabilityPromise;
