'use client';
import '@/styles/globals.css';
import Check from '@/assets/icons/check.svg';
import { useReward } from 'react-rewards';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const REDIRECT_TIMEOUT = 3000;
export default function GreeterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { reward, isAnimating } = useReward('rewardId', 'confetti');
    useEffect(() => {
        reward();
    }, []);
    const router = useRouter();
    //Redirect to dashboard after 3 seconds, just a normal setTimeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/account/overview');
        }, REDIRECT_TIMEOUT);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <main className="flex flex-col items-center justify-between gap-2 overflow-x-hidden md:gap-8">
            <div className="flex items-center justify-center rounded-full bg-theme-50 text-primary md:size-24">
                <div className="w-fit rounded-full bg-gradient-to-br from-gradient-3-from via-gradient-3-via to-gradient-3-to p-3">
                    <Check className="size-3 md:size-6" />
                </div>
            </div>
            {children}
            <span id="rewardId" />
        </main>
    );
}
