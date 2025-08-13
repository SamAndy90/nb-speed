// src/lib/recharge/address.ts

import { RECHARGE_API_URL, RECHARGE_API_VERSION } from './config';
import { RechargeAPIError } from './error';
import {
    AddressCreateInput,
    AddressValidation,
    RechargeAddress,
    RechargeAddressResponse,
    ValidationResponse,
} from './types';

export class AddressService {
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
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw RechargeAPIError.fromResponse(
                    response.status,
                    response.statusText,
                    errorData
                );
            }

            return await response.json();
        } catch (error) {
            console.error('Recharge API request failed:', error);
            throw error;
        }
    }

    async list(
        params: {
            limit?: number;
            page?: number;
            customer_id?: number;
            created_at_min?: string;
            created_at_max?: string;
            updated_at_min?: string;
            updated_at_max?: string;
            discount_id?: string;
            discount_code?: string;
        } = {}
    ): Promise<RechargeAddressResponse<RechargeAddress>> {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) queryParams.append(key, value.toString());
        });

        return this.fetchRecharge<RechargeAddressResponse<RechargeAddress>>(
            `/addresses?${queryParams.toString()}`
        );
    }

    async get(id: number): Promise<RechargeAddressResponse<RechargeAddress>> {
        return this.fetchRecharge<RechargeAddressResponse<RechargeAddress>>(
            `/addresses/${id}`
        );
    }

    async create(
        customerId: number,
        data: AddressCreateInput
    ): Promise<RechargeAddressResponse<RechargeAddress>> {
        return this.fetchRecharge<RechargeAddressResponse<RechargeAddress>>(
            '/addresses',
            {
                method: 'POST',
                body: JSON.stringify({ ...data, customer_id: customerId }),
            }
        );
    }

    async update(
        id: number,
        data: Partial<AddressCreateInput>
    ): Promise<RechargeAddressResponse<RechargeAddress>> {
        return this.fetchRecharge<RechargeAddressResponse<RechargeAddress>>(
            `/addresses/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
            }
        );
    }

    async delete(id: number): Promise<void> {
        await this.fetchRecharge(`/addresses/${id}`, {
            method: 'DELETE',
        });
    }

    async validate(data: AddressValidation): Promise<ValidationResponse> {
        return this.fetchRecharge('/addresses/validate', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}
