// src/lib/recharge/subscription.ts
import { RECHARGE_API_URL, RECHARGE_API_VERSION } from './config';
import { RechargeAPIError } from './error';
import type { RechargeSubscription, RechargeResponse, CustomerResponse } from './types';

export class CustomerService {
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
            email?: string;
            hash?: string;
            customer_id?: string;
            limit?: number;
            page?: number;
            external_customer_id?: string;
        } = {}
    ): Promise<CustomerResponse> {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) queryParams.append(key, value.toString());
        });

        return this.fetchRecharge<CustomerResponse>(
            `/customers?${queryParams.toString()}`
        );
    }
}
