import { DashboardContent } from '@/features/dashboard/components/DashboardContent';
import { cn, shortCurrencyFormatter } from '@/lib/utils';
import NutriburstStar from '@/assets/icons/nutriburst-star.svg';
import { Progress } from '@/components/ui/progress';
import { InviteAFriend } from '@/features/dashboard/components/InviteAFriend';
import { RewardsPointCard } from '@/features/dashboard/components/RewardsPointCount';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
const API_KEY = process.env.INFLUENCE_API_KEY ?? '';

import {
    getInfluenceCustomer,
    getInfluenceShopEarnRules,
    getInfluenceShopInfo,
    getInfluenceShopLoyaltyTiers,
    getInfluenceCustomerActiveRewards,
    getInfluenceShopRedeemRules,
} from '@/features/influence/api';
import { getIconFromDescription } from '@/features/influence/utils/utils';
import { InfluenceLoyaltyTier } from '@/features/influence/types';
import { RewardCard } from '@/features/influence/components/RewardCard';
import { RewardRedeemDialogButton } from '@/features/influence/components/RewardRedeemButton';
import { getCurrentCustomer } from '@/features/shopify/server';
import { REFERRAL_URL, SHOP_KEY, TEST_CUSTOMER_ID } from '@/consts';
import { redirect } from 'next/navigation';

function RewardsTier({
    tier,
    index,
}: {
    tier: InfluenceLoyaltyTier;
    index: number;
}) {
    const description =
        tier.threshold === 0
            ? 'You start here'
            : `${tier.threshold} Nutri Points`;

    const backgrounds = [
        'from-gradient-2-from via-gradient-2-via to-gradient-2-to',
        'from-[#C0CEDB] via-[#F4FFFF] to-[#9BA1A7]',
        'from-gradient-3-from via-gradient-3-via to-gradient-3-to',
    ];

    return (
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
            <div
                className={cn(
                    'flex size-11 items-center justify-center rounded-full bg-gradient-to-br',
                    backgrounds[index % 3]
                )}>
                <NutriburstStar className="size-5" />
            </div>
            <div className="flex flex-col gap-1 text-center">
                <div className="text-sm font-semibold md:text-base">
                    {tier.title}
                </div>
                <div className="text-[10px] md:text-xs">{description}</div>
            </div>
        </div>
    );
}
function RewardsProgress({
    points,
    tiers,
}: {
    points: number;
    tiers: InfluenceLoyaltyTier[];
}) {
    const sortedTiers = tiers.sort((a, b) => a.threshold - b.threshold);
    const maxTier = sortedTiers[sortedTiers.length - 1];
    const progress = (points / maxTier.threshold) * 100;
    return (
        <div className="relative grid w-full grid-cols-3 md:gap-8">
            <div className="absolute w-full px-[15%] py-[20px]">
                <Progress
                    value={progress}
                    className="h-1 bg-primary *:bg-theme-200"
                />
            </div>
            {sortedTiers.map((tier, index) => (
                <RewardsTier key={tier.id} tier={tier} index={index} />
            ))}
        </div>
    );
}

export default async function RewardsPage() {
    return redirect('/account/overview');
    // const customer = await getCurrentCustomer();

    // if (!customer) {
    //     return (
    //         <DashboardContent>
    //             <p className="text-paragraph-3 font-semibold">
    //                 Customer Not Found
    //             </p>
    //         </DashboardContent>
    //     );
    // }

    // const influenceCustomer = await getInfluenceCustomer(
    //     SHOP_KEY,
    //     customer.email!
    // );

    // if (!influenceCustomer) {
    //     return (
    //         <DashboardContent>
    //             <p className="text-paragraph-3 font-semibold">
    //                 Customer Not Found
    //             </p>
    //         </DashboardContent>
    //     );
    // }

    // const rewardPoints = influenceCustomer.pointBalance;
    // const shopEarnRules = await getInfluenceShopEarnRules();
    // const shopRewards = await getInfluenceShopRedeemRules();
    // const shopLoyaltyTiers = await getInfluenceShopLoyaltyTiers();

    // // const shop = await getInfluenceShopInfo();
    // // const customerActiveRewards = await getInfluenceCustomerActiveRewards(
    // //     TEST_CUSTOMER_ID,
    // //     TEST_CUSTOMER_ID,
    // //     'marzipant.e@gmail.com'
    // // );

    // return (
    //     <DashboardContent>
    //         <DashboardContent.Header className="flex-col justify-between gap-6 px-5 md:flex-row">
    //             <div className="flex w-full flex-col gap-3 md:gap-4">
    //                 <h4>Loyalty & Rewards</h4>
    //                 <p className="text-sm md:text-base">
    //                     Earn points & save on your next order
    //                 </p>
    //             </div>
    //             <RewardsProgress
    //                 tiers={shopLoyaltyTiers}
    //                 points={influenceCustomer.pointBalance}
    //             />
    //         </DashboardContent.Header>

    //         <DashboardContent.Body className="gap-8 pb-8 md:gap-10 md:py-8">
    //             <div className="flex w-full flex-col md:flex-row md:gap-4 md:px-8">
    //                 <RewardsPointCard
    //                     points={rewardPoints}
    //                     className="border-b pb-8 pt-7 md:border"
    //                 />
    //                 <InviteAFriend
    //                     className="md:border"
    //                     referralLink={
    //                         REFERRAL_URL + influenceCustomer.referralLink
    //                     }
    //                 />
    //             </div>
    //             <div className="flex w-full flex-col gap-8 md:gap-10">
    //                 <h3 className="px-5 md:px-8">Claim your rewards</h3>
    //                 <ScrollArea className="w-full">
    //                     <ul className="flex shrink-0 gap-4 px-5 md:px-8">
    //                         {shopRewards.map((reward) => (
    //                             <RewardRedeemDialogButton
    //                                 key={reward.id}
    //                                 reward={reward}
    //                                 customer={influenceCustomer}
    //                                 shopifyCustomerId={TEST_CUSTOMER_ID}
    //                             />
    //                         ))}
    //                     </ul>
    //                     <ScrollBar orientation="horizontal" />
    //                 </ScrollArea>
    //             </div>
    //             <div className="flex w-full flex-col gap-8 md:gap-10">
    //                 <h3 className="px-5 md:px-8">Earn more rewards</h3>
    //                 <ScrollArea className="w-full">
    //                     <div className="flex flex-col gap-4 px-5 md:px-8">
    //                         <ul className="flex shrink-0 justify-center md:flex-wrap gap-4">
    //                             {shopEarnRules.map((rule) => (
    //                                 <RewardCard
    //                                     key={rule.id}
    //                                     icon={getIconFromDescription(
    //                                         rule.title
    //                                     )}
    //                                     description={rule.title}
    //                                     title={`${rule.earnValue} Points = ${shortCurrencyFormatter.format(rule.earnValue / 100)}`}
    //                                 />
    //                             ))}
    //                         </ul>
    //                     </div>
    //                     <ScrollBar orientation="horizontal" />
    //                 </ScrollArea>
    //             </div>
    //         </DashboardContent.Body>
    //     </DashboardContent>
    // );
}
