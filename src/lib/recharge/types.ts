// src/lib/recharge/types.ts
export interface RechargeSubscription {
    id: number;
    address_id: number;
    customer_id: number;
    analytics_data: {
        utm_params: {
            utm_source?: string;
            utm_medium?: string;
        };
    };
    cancellation_reason: string | null;
    cancellation_reason_comments: string | null;
    cancelled_at: string | null;
    charge_interval_frequency: number;
    created_at: string;
    expire_after_specific_number_of_charges: number | null;
    external_product_id: {
        ecommerce: string;
    };
    external_variant_id: {
        ecommerce: string;
    };
    has_queued_charges: boolean;
    is_prepaid: boolean;
    is_skippable: boolean;
    is_swappable: boolean;
    max_retries_reached: boolean;
    next_charge_scheduled_at: string;
    order_day_of_month: number | null;
    order_day_of_week: number | null;
    order_interval_frequency: number;
    order_interval_unit: 'day' | 'week' | 'month';
    presentment_currency: string;
    price: string;
    product_title: string;
    properties: Array<{
        name: string;
        value: string;
    }>;
    quantity: number;
    sku: string | null;
    sku_override: boolean;
    status: 'active' | 'cancelled' | 'expired';
    updated_at: string;
    variant_title: string;
}

export interface RechargeResponse<T> {
    next_cursor?: string;
    previous_cursor?: string;
    subscriptions?: T[];
    subscription?: T;
}

export interface RechargeAddress {
    id: number;
    payment_method_id?: number;
    address1: string;
    address2?: string;
    city: string;
    company?: string;
    country_code: string;
    customer_id: number;
    first_name: string;
    last_name: string;
    order_attributes?: Array<{
        name: string;
        value: string;
    }>;
    order_note?: string;
    phone: string;
    presentment_currency?: string;
    province: string;
    shipping_lines_override?: Array<{
        code: string;
        price: string;
        title: string;
    }> | null;
    shipping_lines_conserved?: Array<any>;
    zip: string;
    created_at: string;
    updated_at: string;
}

export interface AddressValidation {
    address1: string;
    city: string;
    state: string;
    zipcode: string;
}

export interface AddressCreateInput {
    customer_id: number;
    first_name: string;
    last_name: string;
    address1: string;
    address2?: string;
    city: string;
    company?: string;
    country_code: string;
    payment_method_id?: number;
    phone: string;
    province: string;
    presentment_currency?: string;
    shipping_lines_override?: Array<{
        code: string;
        price: string;
        title: string;
    }>;
    zip: string;
}

export interface RechargeAddressResponse<T> {
    address?: T;
    addresses?: T[];
}

export interface ValidationResponse {
    city: string;
    errors: Record<string, string>;
    state: string;
    state_name: string;
    zipcode: string;
}

// Payment method

export interface PaymentDetails {
    brand?: string;
    exp_month?: string;
    exp_year?: string;
    last4?: string;
    paypal_email?: string;
    paypal_payer_id?: string;
    wallet_type?: string;
    funding_type?: string;
}

export interface PaymentMethodBillingAddress {
    address1: string;
    address2?: string;
    city: string;
    company?: string;
    country_code: string;
    first_name: string;
    last_name: string;
    phone: string;
    province: string;
    zip: string;
}

export enum PaymentType {
    CREDIT_CARD = 'CREDIT_CARD',
    PAYPAL = 'PAYPAL',
    // Future payment types:
    // APPLE_PAY = 'APPLE_PAY',
    // GOOGLE_PAY = 'GOOGLE_PAY',
    // SEPA_DEBIT = 'SEPA_DEBIT'
}

export interface RechargePaymentMethod {
    id: number;
    customer_id: number;
    billing_address: PaymentMethodBillingAddress;
    created_at: string;
    default: boolean;
    payment_details: PaymentDetails | PaymentDetails[];
    payment_type:
        | 'CREDIT_CARD'
        | 'PAYPAL'
        | 'APPLE_PAY'
        | 'GOOGLE_PAY'
        | 'SEPA_DEBIT';
    processor_customer_token: string;
    processor_name:
        | 'stripe'
        | 'braintree'
        | 'authorize'
        | 'shopify_payments'
        | 'mollie';
    processor_payment_method_token: string;
    status: 'unvalidated' | 'valid' | 'invalid' | 'empty' | null;
    status_reason: string | null;
    updated_at: string;
}

export interface PaymentMethodCreateInput {
    customer_id: number;
    payment_type: RechargePaymentMethod['payment_type'];
    processor_name: RechargePaymentMethod['processor_name'];
    processor_customer_token: string;
    processor_payment_method_token: string;
    default?: boolean;
    billing_address?: PaymentMethodBillingAddress;
    retry_charges?: boolean;
}

export interface PaymentMethodUpdateInput {
    default?: boolean;
    processor_name?: RechargePaymentMethod['processor_name'];
    billing_address?: Partial<PaymentMethodBillingAddress>;
}

export interface RechargePaymentMethodResponse {
    payment_method?: RechargePaymentMethod;
    payment_methods?: RechargePaymentMethod[];
    next_cursor?: string;
    previous_cursor?: string;
}

export interface PaymentMethodFormData {
    cardNumber: string;
    nameOnCard: string;
    expiryMonth: string;
    expiryYear: string;
    isPrimaryPaymentMethod: boolean;
    paymentType: PaymentType;
}


export type Customer = {
    id: number;
    analytics_data: {
      utm_params: {
        utm_source: string;
        utm_medium: string;
      }[];
    };
    created_at: string;
    email: string;
    external_customer_id: {
      ecommerce: string;
    };
    first_charge_processed_at: string;
    first_name: string;
    has_payment_method_in_dunning: boolean;
    has_valid_payment_method: boolean;
    hash: string;
    last_name: string;
    phone: string;
    subscriptions_active_count: number;
    subscriptions_total_count: number;
    tax_exempt: boolean;
    updated_at: string;
  };

  
export type CustomerResponse = {
    next_cursor: string;
    previous_cursor: string;
    customers: Customer[];
  };
  