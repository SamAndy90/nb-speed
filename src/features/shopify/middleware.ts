import { NextRequest, NextResponse } from 'next/server';
import { CustomerAccessTokenSchema } from '../auth/schemas';
import { renewCustomerAccessToken } from './api/fetch';
import { getCurrentCustomer } from './server';
import { TOKEN_REFRESH_THRESHOLD_SECONDS } from './consts';

//TODO: Protect routes here or in layout?
const protectedPaths = [
    '/account/account',
    '/account/orders',
    '/account/rewards',
    '/account/address-book',
    '/account/subscriptions',
];

/**
 * Uses the shopify customer access token stored in cookies to refresh the session.
 * This middleware also currently handles protected routes, but this could be moved to a layout component.
 * TODO: Research pros and cons of each method
 */
export async function updateSession(request: NextRequest) {
    let nextResponse = NextResponse.next({
        request,
    });
    //console.log('Cookies:', request.cookies.getAll());
    try {
        const token = request.cookies.get('shopifyAccessToken');

        const parsedToken = CustomerAccessTokenSchema.safeParse(
            JSON.parse(token?.value ?? '{}')
        );

        if (parsedToken.success) {
            const expiryDate = new Date(parsedToken.data.expiresAt);
            const timeTilExpiry = expiryDate.getTime() - Date.now();
            const secondsTilExpiry = timeTilExpiry / 1000;
            if (secondsTilExpiry < TOKEN_REFRESH_THRESHOLD_SECONDS) {
                const newTokenResponse = await renewCustomerAccessToken(
                    parsedToken.data.accessToken
                );
                console.log('Body:', newTokenResponse.body);
                const newToken =
                    newTokenResponse.body.customerAccessTokenRenew
                        ?.customerAccessToken;

                if (newToken) {
                    nextResponse.cookies.set(
                        'shopifyAccessToken',
                        JSON.stringify(newToken)
                    );
                }
            }
        }
    } catch (error) {
        //console.error('Error when refreshing token:', error);
    }
    const customer = await getCurrentCustomer();

    if (
        !customer &&
        protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/account/login';
        return NextResponse.redirect(url);
    }
    return nextResponse;
}
