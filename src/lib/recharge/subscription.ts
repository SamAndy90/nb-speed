// src/lib/recharge/subscription.ts
import { RECHARGE_API_URL, RECHARGE_API_VERSION } from './config';
import { RechargeAPIError } from './error';
import type { RechargeSubscription, RechargeResponse } from './types';

export class SubscriptionService {
    private token: string;

    constructor(token: string) {
        if (!token) {
            throw new Error('Recharge API token is required');
        }
        this.token = token;
    }

    private async fetchRecharge<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${RECHARGE_API_URL}${endpoint}`;
        const headers = {
            'X-Recharge-Access-Token': this.token,
            'X-Recharge-Version': RECHARGE_API_VERSION,
            'Content-Type': 'application/json',
            ...options.headers,
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers,
                next: {
                    revalidate: 0,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw RechargeAPIError.fromResponse(
                    response.status,
                    response.statusText,
                    errorData
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async list(
        params: {
            limit?: number;
            page?: number;
            customer_id?: string;
            status?: 'active' | 'cancelled' | 'expired';
            created_at_min?: string;
            created_at_max?: string;
            cursor?: string;
        } = {}
    ): Promise<RechargeResponse<RechargeSubscription>> {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) queryParams.append(key, value.toString());
        });

        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/subscriptions?${queryParams.toString()}`
        );
    }

    async listChargesByCustomerId(
        customerId: number
    ): Promise<RechargeResponse<any>> {
        return this.fetchRecharge<RechargeResponse<any>>(
            `/charges?customer_id=${customerId}`
        );
    }

    async listChargesByPurchaseItemId(purchaseItemId: number): Promise<any> {
        const response = await this.fetchRecharge<any>(
            `/charges?purchase_item_ids=${purchaseItemId}`
        );
        return response.charges;
    }

    async get(id: number): Promise<RechargeSubscription> {
        const response = await this.fetchRecharge<{
            subscription: RechargeSubscription;
        }>(`/subscriptions/${id}`, { method: 'GET' });

        return response.subscription;
    }

    async create(
        data: Partial<RechargeSubscription>
    ): Promise<RechargeResponse<RechargeSubscription>> {
        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            '/subscriptions',
            {
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
    }

    async skip(
        chargeId: number,
        purchaseItemId: number
    ): Promise<RechargeResponse<RechargeSubscription>> {
        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/charges/${chargeId}/skip`,
            {
                method: 'POST',
                body: JSON.stringify({ purchase_item_id: purchaseItemId }),
            }
        );
    }

    async changeNextChargeDate(
        id: number,
        date: string
    ): Promise<RechargeResponse<RechargeSubscription>> {
        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/subscriptions/${id}/set_next_charge_date`,
            {
                method: 'POST',
                body: JSON.stringify({ date }),
            }
        );
    }

    async update(
        id: number,
        data: Partial<RechargeSubscription>
    ): Promise<RechargeResponse<RechargeSubscription>> {
        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/subscriptions/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
            }
        );
    }

    async cancel(
        id: number,
        reason: string,
        comments?: string
    ): Promise<RechargeResponse<RechargeSubscription>> {
        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/subscriptions/${id}/cancel`,
            {
                method: 'POST',
                body: JSON.stringify({
                    cancellation_reason: reason,
                    cancellation_reason_comments: comments,
                }),
            }
        );
    }

    async activate(
        id: number
    ): Promise<RechargeResponse<RechargeSubscription>> {
        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/subscriptions/${id}/activate`,
            {
                method: 'POST',
            }
        );
    }

    async setNextChargeDate(
        id: number,
        date: string
    ): Promise<RechargeResponse<RechargeSubscription>> {
        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/subscriptions/${id}/set_next_charge_date`,
            {
                method: 'POST',
                body: JSON.stringify({ date }),
            }
        );
    }

    async changeAddress(
        id: number,
        addressId: number,
        nextChargeDate?: string
    ): Promise<RechargeResponse<RechargeSubscription>> {
        const body: { address_id: number; next_charge_scheduled_at?: string } =
            {
                address_id: addressId,
            };

        if (nextChargeDate) {
            body.next_charge_scheduled_at = nextChargeDate;
        }

        return this.fetchRecharge<RechargeResponse<RechargeSubscription>>(
            `/subscriptions/${id}/change_address`,
            {
                method: 'POST',
                body: JSON.stringify(body),
            }
        );
    }
}
