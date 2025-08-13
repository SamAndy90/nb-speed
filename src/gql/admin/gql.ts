/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    fragment Image on Image {\n        url\n        altText\n        width\n        height\n    }\n": types.ImageFragmentDoc,
    "\n    fragment Order on Order {\n        id\n        name\n        processedAt\n        displayFulfillmentStatus\n        fulfillments(first: 100) {\n            displayStatus\n            status\n            estimatedDeliveryAt\n            deliveredAt\n        }\n        currentTotalPriceSet {\n            presentmentMoney {\n                amount\n                currencyCode\n            }\n        }\n        displayFinancialStatus\n        displayFulfillmentStatus\n        lineItems(first: 10) {\n            edges {\n                node {\n                    id\n                    image {\n                        ...Image\n                    }\n                    product {\n                        variants(first: 100) {\n                            edges {\n                                node {\n                                    id\n                                }\n                            }\n                        }\n                    }\n                    quantity\n                }\n            }\n        }\n        shippingAddress {\n            formatted(withName: true)\n        }\n        tags\n        transactions(first: 10) {\n            status\n            paymentDetails {\n                ... on CardPaymentDetails {\n                    paymentMethodName\n                }\n                ... on ShopPayInstallmentsPaymentDetails {\n                    paymentMethodName\n                }\n            }\n            paymentIcon {\n                altText\n                width\n                height\n                id\n                url\n            }\n        }\n    }\n": types.OrderFragmentDoc,
    "\n    query getCustomers {\n        customers(first: 10) {\n            edges {\n                node {\n                    id\n                }\n            }\n        }\n    }\n": types.GetCustomersDocument,
    "\n    query getCustomerOrders($customerId: ID!) {\n        customer(id: $customerId) {\n            orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {\n                edges {\n                    node {\n                        ...Order\n                    }\n                }\n            }\n        }\n    }\n": types.GetCustomerOrdersDocument,
    "\n    query getOrder($orderId: ID!) {\n        order(id: $orderId) {\n            ...Order\n        }\n    }\n": types.GetOrderDocument,
    "\n    query checkoutProfiles {\n        checkoutProfiles(first: 1, query: \"is_published:true\") {\n            edges {\n                node {\n                    id\n                    name\n                }\n            }\n        }\n    }\n": types.CheckoutProfilesDocument,
    "\n    query queryFiles {\n        files(first: 10, query: \"media_type:GenericFile\") {\n            edges {\n                node {\n                    ... on GenericFile {\n                        id\n                        url\n                        fileStatus\n                    }\n                }\n            }\n        }\n    }\n": types.QueryFilesDocument,
    "\n    mutation checkoutBrandingUpsert(\n        $checkoutBrandingInput: CheckoutBrandingInput!\n        $checkoutProfileId: ID!\n    ) {\n        checkoutBrandingUpsert(\n            checkoutBrandingInput: $checkoutBrandingInput\n            checkoutProfileId: $checkoutProfileId\n        ) {\n            checkoutBranding {\n                designSystem {\n                    typography {\n                        secondary {\n                            base {\n                                sources\n                                weight\n                            }\n                            bold {\n                                sources\n                                weight\n                            }\n                            name\n                        }\n                    }\n                }\n            }\n            userErrors {\n                code\n                field\n                message\n            }\n        }\n    }\n": types.CheckoutBrandingUpsertDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment Image on Image {\n        url\n        altText\n        width\n        height\n    }\n"): typeof import('./graphql').ImageFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment Order on Order {\n        id\n        name\n        processedAt\n        displayFulfillmentStatus\n        fulfillments(first: 100) {\n            displayStatus\n            status\n            estimatedDeliveryAt\n            deliveredAt\n        }\n        currentTotalPriceSet {\n            presentmentMoney {\n                amount\n                currencyCode\n            }\n        }\n        displayFinancialStatus\n        displayFulfillmentStatus\n        lineItems(first: 10) {\n            edges {\n                node {\n                    id\n                    image {\n                        ...Image\n                    }\n                    product {\n                        variants(first: 100) {\n                            edges {\n                                node {\n                                    id\n                                }\n                            }\n                        }\n                    }\n                    quantity\n                }\n            }\n        }\n        shippingAddress {\n            formatted(withName: true)\n        }\n        tags\n        transactions(first: 10) {\n            status\n            paymentDetails {\n                ... on CardPaymentDetails {\n                    paymentMethodName\n                }\n                ... on ShopPayInstallmentsPaymentDetails {\n                    paymentMethodName\n                }\n            }\n            paymentIcon {\n                altText\n                width\n                height\n                id\n                url\n            }\n        }\n    }\n"): typeof import('./graphql').OrderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCustomers {\n        customers(first: 10) {\n            edges {\n                node {\n                    id\n                }\n            }\n        }\n    }\n"): typeof import('./graphql').GetCustomersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCustomerOrders($customerId: ID!) {\n        customer(id: $customerId) {\n            orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {\n                edges {\n                    node {\n                        ...Order\n                    }\n                }\n            }\n        }\n    }\n"): typeof import('./graphql').GetCustomerOrdersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getOrder($orderId: ID!) {\n        order(id: $orderId) {\n            ...Order\n        }\n    }\n"): typeof import('./graphql').GetOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query checkoutProfiles {\n        checkoutProfiles(first: 1, query: \"is_published:true\") {\n            edges {\n                node {\n                    id\n                    name\n                }\n            }\n        }\n    }\n"): typeof import('./graphql').CheckoutProfilesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query queryFiles {\n        files(first: 10, query: \"media_type:GenericFile\") {\n            edges {\n                node {\n                    ... on GenericFile {\n                        id\n                        url\n                        fileStatus\n                    }\n                }\n            }\n        }\n    }\n"): typeof import('./graphql').QueryFilesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation checkoutBrandingUpsert(\n        $checkoutBrandingInput: CheckoutBrandingInput!\n        $checkoutProfileId: ID!\n    ) {\n        checkoutBrandingUpsert(\n            checkoutBrandingInput: $checkoutBrandingInput\n            checkoutProfileId: $checkoutProfileId\n        ) {\n            checkoutBranding {\n                designSystem {\n                    typography {\n                        secondary {\n                            base {\n                                sources\n                                weight\n                            }\n                            bold {\n                                sources\n                                weight\n                            }\n                            name\n                        }\n                    }\n                }\n            }\n            userErrors {\n                code\n                field\n                message\n            }\n        }\n    }\n"): typeof import('./graphql').CheckoutBrandingUpsertDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
