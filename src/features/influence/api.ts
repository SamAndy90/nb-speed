import 'server-only';
import { createInfluenceCustomerDigest } from './utils/utils';
import {
    InfluenceCustomer,
    InfluenceCustomerActiveReward,
    InfluenceCustomerRedeemResponse,
    InfluenceEarnRule,
    InfluenceLoyaltyTier,
    InfluenceReward,
} from './types';
const INFLUENCE_API_URL = process.env.INFLUENCE_API_URL ?? '';
const INFLUENCE_LAUNCHER_API_URL =
    process.env.INFLUENCE_LAUNCHER_API_URL ?? '';
const INFLUENCE_API_KEY = process.env.INFLUENCE_API_KEY ?? '';
const SHOP_KEY = process.env.INFLUENCE_SHOP_KEY ?? '';
// const TEST_CUSTOMER_ID = '8532878557507';

export const TEST_EMAIL = 'louisewatling@hotmail.com';

export async function influenceFetch<T>({
    cache = 'no-cache',
    headers,
    path,
    params,
    body,
    tags,
    method = 'GET',
    isLauncher = false,
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    path: string;
    params?: Record<string, string>;
    body?: Record<string, unknown>;
    tags?: string[];
    method?: 'GET' | 'POST';
    isLauncher?: boolean;
}): Promise<{ success: true; data: T } | { success: false; error: string }> {
    const fullPath = `${isLauncher ? INFLUENCE_LAUNCHER_API_URL : INFLUENCE_API_URL}/${path}?${new URLSearchParams(params)}`;

    try {
        const result = await fetch(fullPath, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                accept: 'application/json',
                'x-api-key': INFLUENCE_API_KEY,
                ...headers,
            },
            cache,
            ...(tags && { next: { tags } }),
            ...(body && { body: JSON.stringify(body) }),
        });

        if (!result.ok) {
            return { success: false, error: result.statusText };
        }

        const res = await result.json();
        return { success: true, data: res };
    } catch (e) {
        console.error(e);
        return { success: false, error: e as string };
    }
}

export async function getInfluenceCustomer(
    shopKey = SHOP_KEY,
    customerEmail: string
) {
    try {
        const params = {
            email: customerEmail,
            shop: shopKey,
        };
        const res = await influenceFetch<{ customers: InfluenceCustomer[] }>({
            params,
            path: 'customers',
        });

        if (res.success) {
            return res.data?.customers.find((r) => r.email === customerEmail);
        }
        throw new Error(res.error);
    } catch (err) {
        console.error(err);
    }
    return null;
}

export async function getInfluenceCustomerActiveRewards(
    customerId: string,
    shopifyCustomerId: string,
    customerEmail: string
) {
    const digest = await createInfluenceCustomerDigest(
        SHOP_KEY,
        INFLUENCE_API_KEY,
        customerEmail,
        shopifyCustomerId
    );
    try {
        const params = {
            customer_id: customerId,
            customer_email: customerEmail,
            shop: SHOP_KEY,
            digest,
        };
        const res = await influenceFetch<{
            items: InfluenceCustomerActiveReward[];
        }>({
            params,
            path: 'customer/all-rewards',
            isLauncher: true,
        });
        if (res.success) return res.data.items;
        throw new Error(res.error);
    } catch (err) {
        console.error(err);
    }
    return [];
}

export async function getInfluenceShopRedeemRules(shopKey = SHOP_KEY) {
    try {
        const params = {
            shop: shopKey,
        };
        const res = await influenceFetch<{ rules: InfluenceReward[] }>({
            params,
            path: 'shop/rules/redeem',
            isLauncher: true,
        });
        if (res.success) return res.data.rules;
        throw new Error(res.error);
    } catch (err) {
        console.error(err);
    }
    return [];
}

export async function getInfluenceShopEarnRules(shopKey = SHOP_KEY) {
    try {
        const params = {
            shop: shopKey,
        };
        const res = await influenceFetch<{ rules: InfluenceEarnRule[] }>({
            params,
            path: 'shop/rules/earn',
            isLauncher: true,
        });
        if (res.success) return res.data.rules;
        throw new Error(res.error);
    } catch (err) {
        console.error(err);
    }
    return [];
}

export async function getInfluenceShopInfo(shopKey = SHOP_KEY) {
    try {
        const params = {
            shop: shopKey,
        };
        const res = await influenceFetch<{ rules: InfluenceEarnRule[] }>({
            params,
            path: 'shop',
            isLauncher: true,
        });
        if (res.success) return res.data;
        throw new Error(res.error);
    } catch (err) {
        console.error(err);
    }
    return null;
}

export async function getInfluenceShopLoyaltyTiers(shopKey = SHOP_KEY) {
    try {
        const params = {
            shop: shopKey,
        };
        const res = await influenceFetch<{ rules: InfluenceLoyaltyTier[] }>({
            params,
            path: 'shop/tiers',
            isLauncher: true,
        });
        if (res.success) return res.data.rules;
        throw new Error(res.error);
    } catch (err) {
        console.error(err);
    }
    return [] as InfluenceLoyaltyTier[];
}

export async function postRedeemCustomerReward(
    customerId: string,
    shopifyCustomerId: string,
    customerEmail: string,
    ruleId: string
) {
    const digest = await createInfluenceCustomerDigest(
        SHOP_KEY,
        INFLUENCE_API_KEY,
        customerEmail,
        shopifyCustomerId
    );
    const body = {
        customer: { id: customerId, email: customerEmail },
        shop: SHOP_KEY,
        ruleId: ruleId,
        points: 0,
        digest,
    };
    try {
        const res = await influenceFetch<InfluenceCustomerRedeemResponse>({
            body,
            path: 'customer/redeem',
            method: 'POST',
            isLauncher: true,
        });
        if (res.success) return res.data.couponCode;
    } catch (err) {
        console.error(err);
    }
    return null;
}
