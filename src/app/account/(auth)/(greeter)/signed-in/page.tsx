import { getCurrentCustomer } from '@/features/shopify/server';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default async function SignedIn() {
    const customer = await getCurrentCustomer();
    if (!customer) return redirect('/account/login');
    return <h1>Hello, {customer.firstName}</h1>;
}
