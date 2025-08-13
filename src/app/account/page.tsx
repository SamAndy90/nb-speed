import { redirect } from 'next/navigation';

/**
 * Currently a test page to show some data retrieved from the Shopify API using the stored token.
 */
export default async function DashboardPage() {
    return redirect('/account/overview');
}
