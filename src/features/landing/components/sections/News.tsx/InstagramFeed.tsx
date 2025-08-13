import { Socials } from '@/components/Socials';
import post1 from '../../../assets/instagram/post-1.webp';
import post2 from '../../../assets/instagram/post-2.webp';
import post3 from '../../../assets/instagram/post-3.webp';
import post4 from '../../../assets/instagram/post-4.webp';
import post5 from '../../../assets/instagram/post-5.webp';
import post6 from '../../../assets/instagram/post-6.webp';
import Image from 'next/image';
export function InstagramFeed() {
    return (
        <div className="flex w-full flex-col gap-4 md:gap-8">
            <ul className="grid h-auto grid-cols-2 grid-rows-3 gap-2 *:aspect-square *:w-full *:overflow-clip *:rounded-xs md:grid-cols-3 md:grid-rows-2 md:gap-4">
                <div className="relative bg-success-400">
                    <Image
                        src={post1}
                        alt=""
                        className="size-full object-cover"
                    />
                </div>
                <div className="relative bg-success-400">
                    <Image
                        src={post2}
                        alt=""
                        className="size-full object-cover"
                    />
                </div>
                <div className="relative bg-success-400">
                    <Image
                        src={post3}
                        alt=""
                        className="size-full object-cover"
                    />
                </div>
                <div className="relative bg-success-400">
                    <Image
                        src={post4}
                        alt=""
                        className="size-full object-cover"
                    />
                </div>
                <div className="relative bg-success-400">
                    <Image
                        src={post5}
                        alt=""
                        className="size-full object-cover"
                    />
                </div>
                <div className="relative bg-success-400">
                    <Image
                        src={post6}
                        alt=""
                        className="size-full object-cover"
                    />
                </div>
            </ul>
            <div className="flex flex-wrap items-center gap-2.5 text-base font-bold md:gap-4 md:text-xl">
                <Socials className="[&_svg]:size-9 md:[&_svg]:size-14" />
                💌 Let's connect
            </div>
        </div>
    );
}
