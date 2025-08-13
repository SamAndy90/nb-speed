// src/lib/recharge/client.ts
import { AddressService } from './address';
import { CustomerService } from './customer';
import { PaymentMethodService } from './payment-method';
import { SubscriptionService } from './subscription';

if (!process.env.RECHARGE_API_TOKEN) {
    throw new Error('Missing RECHARGE_API_TOKEN environment variable');
}

export const subscriptionService = new SubscriptionService(
    process.env.RECHARGE_API_TOKEN
);

export const addressService = new AddressService(
    process.env.RECHARGE_API_TOKEN
);

export const paymentMethodService = new PaymentMethodService(
    process.env.RECHARGE_API_TOKEN
);
export const customerService = new CustomerService(
    process.env.RECHARGE_API_TOKEN
);
