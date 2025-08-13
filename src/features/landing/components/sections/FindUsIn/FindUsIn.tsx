import asda from '../../../assets/find-us-in/asda.webp';
import wholeFoods from '../../../assets/find-us-in/whole-foods.webp';
import boots from '../../../assets/find-us-in/boots.webp';
import harrods from '../../../assets/find-us-in/harrods.webp';
import tesco from '../../../assets/find-us-in/tesco.webp';
import Image, { ImageProps } from 'next/image';
import { FindUsInMarquee } from '../../HeroMarquee';
import { cn } from '@/lib/utils';
import Container from '@/components/container';

function FindUsInImage({ className, ...props }: ImageProps) {
    return (
        <div className="relative flex h-[42px] items-center grayscale md:h-[74px]">
            <Image
                {...props}
                sizes={'20vw'}
                className={cn(
                    'h-auto w-[82px] max-w-full object-contain md:h-full md:w-auto',
                    className
                )}
            />
        </div>
    );
}
export function FindUsIn() {
    return (
        <section className="w-full overflow-x-clip">
            <Container className="flex flex-col gap-6">
                <p className="text-paragraph-3 font-bold">Available at</p>
                <div className="-mx-4 flex flex-col items-center gap-3 md:mx-0 md:gap-8">
                    <FindUsInMarquee>
                        <FindUsInImage src={harrods} alt="" />
                        <FindUsInImage
                            className="max-md:max-w-[64px]"
                            src={wholeFoods}
                            alt=""
                        />
                        <FindUsInImage src={boots} alt="" />
                        <FindUsInImage src={tesco} alt="" />
                        <FindUsInImage src={asda} alt="" className="md:py-4" />
                    </FindUsInMarquee>
                </div>
            </Container>
        </section>
    );
}
