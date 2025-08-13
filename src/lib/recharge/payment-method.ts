// src/lib/recharge/payment-method.ts

import { RECHARGE_API_URL, RECHARGE_API_VERSION } from './config';
import { RechargeAPIError } from './error';
import type {
    RechargePaymentMethod,
    PaymentMethodCreateInput,
    PaymentMethodUpdateInput,
    RechargePaymentMethodResponse,
} from './types';

export class PaymentMethodService {
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

            const data = await response.json();

            if (!response.ok) {
                throw RechargeAPIError.fromResponse(
                    response.status,
                    response.statusText,
                    data
                );
            }

            return data;
        } catch (error) {
            if (error instanceof RechargeAPIError) {
                throw error;
            }
            throw new RechargeAPIError(500, 'Internal Server Error', {
                error: [(error as Error).message],
            });
        }
    }

    async list(
        params: {
            limit?: number;
            page?: number;
            customer_id?: string;
            created_at_min?: string;
            created_at_max?: string;
            cursor?: string;
        } = {}
    ): Promise<RechargePaymentMethodResponse> {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value.toString());
            }
        });

        const queryString = queryParams.toString();
        return this.fetchRecharge<RechargePaymentMethodResponse>(
            `/payment_methods${queryString ? `?${queryString}` : ''}`
        );
    }

    async get(id: number): Promise<RechargePaymentMethod> {
        const response =
            await this.fetchRecharge<RechargePaymentMethodResponse>(
                `/payment_methods/${id}`
            );

        if (!response.payment_method) {
            throw new RechargeAPIError(404, 'Payment method not found', {
                error: ['Payment method not found'],
            });
        }

        return response.payment_method;
    }

    async create(
        data: PaymentMethodCreateInput
    ): Promise<RechargePaymentMethodResponse> {
        return this.fetchRecharge<RechargePaymentMethodResponse>(
            '/payment_methods',
            {
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
    }

    async update(
        id: number,
        data: PaymentMethodUpdateInput
    ): Promise<RechargePaymentMethodResponse> {
        return this.fetchRecharge<RechargePaymentMethodResponse>(
            `/payment_methods/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
            }
        );
    }

    async delete(id: number): Promise<void> {
        await this.fetchRecharge(`/payment_methods/${id}`, {
            method: 'DELETE',
        });
    }

    async setAsDefault(id: number): Promise<RechargePaymentMethodResponse> {
        return this.update(id, { default: true });
    }
}
