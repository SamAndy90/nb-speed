import Image from 'next/image';
import naomi from '../../../assets/naomi.png';
import brandmarkCopper from '@/assets/logo/brandmark-copper.png';
import Container from '@/components/container';
export function NutriburstLifestyle() {
    return (
        <section
            className="relative aspect-[376/556] w-full md:aspect-[1440/556]"
            id="nutriburst-lifestyle">
            <div
                style={{
                    background:
                        'linear-gradient(265.44deg, rgba(255, 255, 255, 0) 38.98%, rgba(204, 242, 236, 0.78) 65.39%, rgba(205, 243, 237, 0.86) 86.32%)',
                }}
                className="absolute z-[1] inset-0 size-full max-sm:hidden"
            />
            <Image
                src={brandmarkCopper}
                alt=""
                className="absolute bottom-0 left-0 z-20 -mb-[50px] h-[216px] w-auto object-contain md:-mb-[170px] md:h-[390px]"
            />

            <div className="absolute aspect-[376/556] w-full overflow-clip md:aspect-[1440/556]">
                <Image
                    src={naomi}
                    className="size-full object-cover object-[70%_50%] max-sm:scale-[1.5] md:object-[50%_78%]"
                    alt=""
                />
            </div>
            <Container className="relative z-[2] flex h-full w-full items-start text-center lg:items-center">
                <div className="flex flex-col gap-1 pt-[50px] lg:gap-[6px] lg:pt-0">
                    <h2 className="lg:text-[70px] lg:leading-[1.142]">
                        Nutriburst
                        <br />
                        <b>Lifestyle</b>
                    </h2>
                    <p className="text-paragraph-5 md:text-[24px]">
                        #Nutriburst
                    </p>
                </div>
            </Container>
        </section>
    );
}
//
