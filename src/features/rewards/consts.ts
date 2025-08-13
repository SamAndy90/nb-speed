import Grad2Tier from '@/assets/icons/tier/grad-2-tier.svg';
import Grad3Tier from '@/assets/icons/tier/grad-3-tier.svg';
import SilverTier from '@/assets/icons/tier/silver-tier.svg';
import GradientCakeIcon from '@/components/icons/reward-icons/cake-birthday';
import GradientFacebookIcon from '@/components/icons/reward-icons/facebook';
import GradientInstagramIcon from '@/components/icons/reward-icons/instagram';
import GradientRefreshIcon from '@/components/icons/reward-icons/refresh';
import GradientTikTokIcon from '@/components/icons/reward-icons/tiktok';

export const SOCIAL_REWARDS_DATA = [
    {
        icon: GradientFacebookIcon,
        points: 100,
        value: '£1',
        action: 'Like us on Facebook',
    },
    {
        icon: GradientTikTokIcon,
        points: 300,
        value: '£3',
        action: 'Follow us on TikTok',
    },
    {
        icon: GradientInstagramIcon,
        points: 300,
        value: '£3',
        action: 'Follow us on Instagram',
    },
    {
        icon: GradientCakeIcon,
        points: 100,
        value: '£1',
        action: 'Birthday Gift',
    },
    {
        icon: GradientRefreshIcon,
        points: 500,
        value: '£5',
        action: 'Create a subscription',
    },
];

export const TIERS = [
    {
        icon: Grad2Tier,
        title: 'Standard Tier',
        description:
            "Join and start enjoying basic member benefits right away. You'll receive welcome points, access to our standard support service, and early notifications about new products and sales.",
    },
    {
        icon: SilverTier,
        title: 'Premium Tier',
        description:
            'Step up to more exclusive perks. Premium members enjoy everything in the Standard tier plus free shipping on all orders, access to exclusive sales events, and enhanced customer support.',
    },
    {
        icon: Grad3Tier,
        title: 'Ultimate Tier',
        description:
            'Our top-tier membership designed for our most dedicated supporters. Enjoy all the benefits of the Premium tier, exclusive access to VIP events & special birthday rewards.',
    },
];
