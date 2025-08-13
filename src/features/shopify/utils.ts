import {
    OrderDisplayFulfillmentStatus,
    OrderFragment,
} from '@/gql/admin/graphql';
import { Connection, RemoveEdgesAndNodes } from './types';
import { CartFragment } from '@/gql/storefront/graphql';

export function resolveOrderStatus(order: OrderFragment) {
    const financialStatus = order.displayFinancialStatus;
    const orderStatus = order.displayFulfillmentStatus;
}

/**
 * Converts an uppercase status code to a more human readable format
 * For now just converrts from UPPER_CASE to Upper Case
 * @param originalStatus UPPER_CASE status code
 * @returns
 */
export function prettifyOrderStatus(
    originalStatus: OrderDisplayFulfillmentStatus
) {
    //Converts the uppercase case string to a more human readable format
    return originalStatus
        .split('_')
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
}

export function trimId(id: string) {
    const idPattern = /gid:\/\/shopify\/[a-zA-Z]+\/[0-9]+/g;
    return id.match(idPattern)![0];
}

export function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
}

export function reshapeCart(
    cart: CartFragment
): RemoveEdgesAndNodes<CartFragment> {
    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines),
    };
}
