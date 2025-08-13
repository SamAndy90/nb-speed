'use server';
import { ActionResult } from '@/types';
import { error } from 'console';
import { z } from 'zod';
import { postRedeemCustomerReward } from './api';

const CustomerRedeemSchema = z.object({
    customerId: z.string(),
    shopifyCustomerId: z.string(),
    customerEmail: z.string(),
    ruleId: z.string(),
});
export async function redeemCustomerRewardAction(
    prevState: unknown,
    formData: FormData
): Promise<ActionResult<{ couponCode: string }>> {
    const data = CustomerRedeemSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    if (!data.success) {
        return { success: false, error: 'Invalid form data' };
    }
    const { shopifyCustomerId, customerId, customerEmail, ruleId } = data.data;
    const couponCode = await postRedeemCustomerReward(
        customerId,
        shopifyCustomerId,
        customerEmail,
        ruleId
    );
    if (couponCode) {
        return { success: true, data: { couponCode } };
    }
    return { success: false, error: 'Failed to redeem reward' };
}
