import {
    CartFragment,
    CustomerFragment,
    ImageFragment,
    ProductFragment,
} from '@/gql/storefront/graphql';
import { CustomerAccessToken } from '../auth/schemas';
import { OrderFragment } from '@/gql/admin/graphql';

type RechargeSubscriptionStatus = 'active' | 'cancelled' | 'expired';
type RechargeIntervalUnit = 'day' | 'week' | 'month';
type RechargeOrderIntervalOption =
    | {
          orderIntervalUnit: 'week';
          orderDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
      }
    | {
          orderIntervalUnit: 'month';
          orderDayOfMonth: number;
      }
    | { orderIntervalUnit: 'day' };

type RechargeChargeIntervalOption =
    | {
          chargeIntervalUnit: 'week';
          orderDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
      }
    | {
          chargeIntervalUnit: 'month';
          orderDayOfMonth: number;
      }
    | { chargeIntervalUnit: 'day' };
export type RechargeSubscription = {
    id: string;
    status: RechargeSubscriptionStatus;
    price: string;
    scheduledAt: string;
    startedAt: string;
    deliveryAddress: string;
    externalProductId: string;
    items: { id: string; image: { url: string; altText: string } }[];
    orderIntervalFrequency: number;
    chargeIntervalFrequency: number;
} & RechargeOrderIntervalOption &
    RechargeChargeIntervalOption;
type RechargeCreditCardPaymentDetails = {
    brand: string;
    expMonth: string;
    expYear: string;
    last4: string;
};
export type RechargePaymentMethod = {
    customerId: string;
    createdAt: string;
    default: boolean;
    paymentDetails: RechargeCreditCardPaymentDetails;
    paymentType: 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
};
export type RemoveEdgesAndNodes<T> = {
    [Property in keyof T]: T[Property] extends Connection<infer U>
        ? U[]
        : T[Property] extends Record<string, unknown>
          ? T[Property]
          : T[Property];
};

export type Cart = RemoveEdgesAndNodes<CartFragment>;

export type CartItem = Cart['lines'][0];
export type CartProductVariant =
    ProductFragment['variants']['edges'][0]['node'];

/**
 * Old, manually created types
 * Replaced by generated types
 */
type ShopifyId = `gid://${string}`;

type ShopifyPrice = {
    amount: string;
    currencyCode: string;
};
type ShopifyImage = {
    url: string;
    altText: string;
    width: number;
    height: number;
};
type ShopifyProductVariant = Pick<
    ShopifyProduct,
    'id' | 'title' | 'availableForSale'
> & {
    selectedOptions: { name: string; value: string }[];
    price: ShopifyPrice;
};

type Graph<T> = { edges: { node: T }[] };

export type Maybe<T> = T | null;

export type Connection<T> = {
    edges: Array<Edge<T>>;
};

export type Edge<T> = {
    node: T;
};

export type CartProduct = {
    id: string;
    handle: string;
    title: string;
    featuredImage: Image;
};

export type Collection = ShopifyCollection & {
    path: string;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type Menu = {
    title: string;
    path: string;
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type Page = {
    id: string;
    title: string;
    handle: string;
    body: string;
    bodySummary: string;
    seo?: SEO;
    createdAt: string;
    updatedAt: string;
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: Money;
};

export type SEO = {
    title: string;
    description: string;
};

export type ShopifyCart = {
    id: string | undefined;
    checkoutUrl: string;
    cost: {
        subtotalAmount: Money;
        totalAmount: Money;
        totalTaxAmount: Money;
    };
    lines: Connection<CartItem>;
    totalQuantity: number;
};

export type ShopifyCollection = {
    handle: string;
    title: string;
    description: string;
    seo: SEO;
    updatedAt: string;
};

export type ShopifyProduct = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: {
        maxVariantPrice: Money;
        minVariantPrice: Money;
    };
    variants: Connection<ProductVariant>;
    featuredImage: Image;
    images: Connection<Image>;
    seo: SEO;
    tags: string[];
    updatedAt: string;
};

export type ShopifyCartOperation = {
    data: {
        cart: ShopifyCart;
    };
    variables: {
        cartId: string;
    };
};

export type ShopifyCreateCartOperation = {
    data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
    data: {
        cartLinesAdd: {
            cart: ShopifyCart;
        };
    };
    variables: {
        cartId: string;
        lines: {
            merchandiseId: string;
            quantity: number;
        }[];
    };
};

export type ShopifyRemoveFromCartOperation = {
    data: {
        cartLinesRemove: {
            cart: ShopifyCart;
        };
    };
    variables: {
        cartId: string;
        lineIds: string[];
    };
};

export type ShopifyUpdateCartOperation = {
    data: {
        cartLinesUpdate: {
            cart: ShopifyCart;
        };
    };
    variables: {
        cartId: string;
        lines: {
            id: string;
            merchandiseId: string;
            quantity: number;
        }[];
    };
};

export type ShopifyCollectionOperation = {
    data: {
        collection: ShopifyCollection;
    };
    variables: {
        handle: string;
    };
};

export type ShopifyCollectionProductsOperation = {
    data: {
        collection: {
            products: Connection<ShopifyProduct>;
        };
    };
    variables: {
        handle: string;
        reverse?: boolean;
        sortKey?: string;
    };
};

export type ShopifyCollectionsOperation = {
    data: {
        collections: Connection<ShopifyCollection>;
    };
};

export type ShopifyMenuOperation = {
    data: {
        menu?: {
            items: {
                title: string;
                url: string;
            }[];
        };
    };
    variables: {
        handle: string;
    };
};

export type ShopifyPageOperation = {
    data: { pageByHandle: Page };
    variables: { handle: string };
};

export type ShopifyPagesOperation = {
    data: {
        pages: Connection<Page>;
    };
};

export type ShopifyProductOperation = {
    data: { product: ShopifyProduct };
    variables: {
        handle: string;
    };
};

export type ShopifyProductRecommendationsOperation = {
    data: {
        productRecommendations: ShopifyProduct[];
    };
    variables: {
        productId: string;
    };
};

export type ShopifyProductsOperation = {
    data: {
        products: Connection<ShopifyProduct>;
    };
    variables: {
        query?: string;
        reverse?: boolean;
        sortKey?: string;
    };
};

export type CustomerUserError = {
    message: string;
};

export type ShopifyCreateCustomerAccessTokenOperation = {
    data: {
        customerAccessTokenCreate:
            | {
                  customerAccessToken: CustomerAccessToken;
                  customerUserErrors: [];
              }
            | {
                  customerAccessToken: null;
                  customerUserErrors: CustomerUserError[];
              };
    };
    variables: { email: string; password: string };
};

export type ShopifyRenewCustomerAccessTokenOperation = {
    data: {
        customerAccessTokenRenew: {
            customerAccessToken: CustomerAccessToken;
        };
    };
    variables: { customerAccessToken: string };
};

export type ShopifyCreateCustomerOperation = {
    data: {
        customerCreate:
            | {
                  customer: CustomerFragment;
                  customerUserErrors: [];
              }
            | { customer: null; customerUserErrors: CustomerUserError[] };
    };
    variables: {
        input: Pick<CustomerFragment, 'firstName' | 'email'> & {
            password: string;
        };
    };
};

export type ShopifyGetCustomerOperation = {
    data: {
        customer: CustomerFragment;
    };
    variables: {
        customerAccessToken: string;
    };
};

export type ShopifyRecoverCustomerOperation = {
    data: {
        customerRecover: {
            customerUserErrors: CustomerUserError[];
        };
    };
    variables: {
        email: string;
    };
};

export type ShopifyResetCustomerOperation = {
    data:
        | {
              customer: CustomerFragment;
              customerUserErrors: [];
          }
        | { customerUserErrors: CustomerUserError[] };
    variables: {
        id: string;
        customerResetInput: {
            password: string;
            resetToken: string;
        };
    };
};

//| { customerUserErrors: CustomerUserError[] };
export type ShopifyResetCustomerByUrlOperation = {
    data: {
        customerResetByUrl:
            | {
                  customer: CustomerFragment;
                  customerAccessToken: CustomerAccessToken;
                  customerUserErrors: [];
              }
            | {
                  customer: null;
                  customerAccessToken: null;
                  customerUserErrors: CustomerUserError[];
              };
    };
    variables: {
        password: string;
        resetUrl: string;
    };
};
