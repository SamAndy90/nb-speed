import FacebookGradient from '@/assets/icons/facebook-gradient.svg';
import InstagramGradient from '@/assets/icons/instagram-gradient.svg';
import TiktokGradient from '@/assets/icons/tiktok-gradient.svg';
import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import Link from 'next/link';
export function Socials({ className }: PropsWithClassName) {
    return (
        <div
            className={cn(
                'flex gap-3 *:transition-all hover:*:scale-110',
                className
            )}>
            <Link
                href="https://www.facebook.com/nutriburstvitamins"
                target={'_blank'}>
                <FacebookGradient />
            </Link>
            <Link
                href="https://www.instagram.com/nutriburstvits"
                target={'_blank'}>
                <InstagramGradient />
            </Link>
            <Link href="https://www.tiktok.com/@nutriburst" target={'_blank'}>
                <TiktokGradient />
            </Link>
        </div>
    );
}
