'use server';

import { cookies } from 'next/headers';
import { CustomerAccessTokenSchema } from '../auth/schemas';
import { fetchCustomer, renewCustomerAccessToken } from './api/fetch';

/**
 * Retrieves the current customer from the Shopify API using the token stored in the user's cookies.
 * @returns The current customer if they are authenticated, otherwise null
 */
export async function getCurrentCustomer() {
    //TODO: Don't refresh token every request
    try {
        const token = cookies().get('shopifyAccessToken');
        const parsedToken = CustomerAccessTokenSchema.safeParse(
            JSON.parse(token?.value ?? '{}')
        );

        if (!parsedToken.success) return null;
        const res = await fetchCustomer(parsedToken.data.accessToken);
        return res.body.customer;
    } catch (error) {
        console.error('Error when fetching customer:', error);
    }
}
