import { cn, FREE_SHIPPING_PRICE } from '@/lib/utils';
import Check from '@/assets/icons/check.svg';
import { PropsWithChildren, useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useCart } from '../context/cart';

// These are hardcoded for now, but in the future could be replaced and connected to Shopify
const REWARDS = ['Free Shipping'];

/**
 * A progress bar that displays the rewards the user can get.
 */
export function RewardsProgressBar() {
    const { cart } = useCart();
    const progress = useMemo(() => {
        const totalPrice =
            cart?.lines.reduce(
                (acc, line) => acc + Number(line.cost.totalAmount.amount),
                0
            ) || 0;
        return (totalPrice / FREE_SHIPPING_PRICE) * 100;
    }, [cart]);

    return (
        <div className="mx-auto flex w-full max-w-[344px] flex-col gap-3">
            <div className="relative flex w-full items-center justify-center">
                <Progress
                    value={progress}
                    className="absolute h-1 w-full max-w-[240px]"
                />

                <div className="mx-auto grid w-full grid-cols-3 items-center gap-[37px]">
                    <div className="w-[86px]" />
                    <div className="w-[86px]" />
                    <div className="flex justify-center">
                        <RewardTick active={progress >= 100} />
                    </div>
                </div>
            </div>

            <div className="mx-auto grid gap-[37px] w-full grid-cols-3 items-center">
                <div className="w-[86px]" />
                <div className="w-[86px]" />
                <Reward active={progress >= 100}>Free Shipping</Reward>
            </div>
        </div>
    );

    // return (
    //     <div className="relative w-full space-y-8 px-[22.5px] text-paragraph-5 font-bold md:text-paragraph-4 md:font-bold">
    //         <div className="flex flex-col gap-3">
    //             <div className="relative flex items-center justify-around gap-[37px]">
    //                 <div className="absolute w-full">
    //                     <Progress
    //                         value={progress * 100}
    //                         className="mx-auto h-1 w-2/3"
    //                     />
    //                 </div>
    //                 {REWARDS.map((reward, index) => (
    //                     <RewardTick
    //                         key={reward}
    //                         active={
    //                             Math.round(progress * REWARDS.length) >=
    //                             index + 1
    //                         }
    //                     />
    //                 ))}
    //             </div>
    //             <div className="grid grid-cols-3 gap-[37px]">
    //                 {REWARDS.map((reward, index) => (
    //                     <Reward
    //                         key={reward}
    //                         active={progress >= index / REWARDS.length}>
    //                         {reward}
    //                     </Reward>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );
}

function Reward({
    active = false,
    children,
}: { active?: boolean } & PropsWithChildren) {
    return (
        <div
            className={cn(
                'flex flex-col items-center w-[86px] justify-center gap-3 whitespace-nowrap',
                {
                    'text-neutral-400': !active,
                }
            )}>
            <div className="text-paragraph-4 font-bold">{children}</div>
        </div>
    );
}

function RewardTick({ active = false }: { active?: boolean }) {
    return (
        <div
            className={cn(
                'relative flex size-7 items-center justify-center rounded-full bg-gradient-2 p-px',
                active ? 'bg-gradient-2' : 'text-theme-400'
            )}>
            <div
                className={cn(
                    'flex size-full items-center justify-center rounded-full',
                    active ? 'bg-none' : 'bg-primary'
                )}>
                <Check className="size-3.5" />
            </div>
        </div>
    );
}
