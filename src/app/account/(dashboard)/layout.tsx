import { redirect } from 'next/navigation';
import { DashboardNav } from './DashboardNav';
import { cookies } from 'next/headers';
import { CustomerAccessTokenSchema } from '@/features/auth/schemas';
import { tabs } from './consts';
import { getCurrentCustomer } from '@/features/shopify/server';
import { Suspense } from 'react';
import { DashboardFooter } from '@/features/dashboard/components/DashboardFooter';
import Container from '@/components/container';
export const dynamic = 'force-dynamic';
export default async function Layout({ tab }: { tab: React.ReactNode }) {
    const token = (await cookies()).get('shopifyAccessToken');
    const parsedToken = CustomerAccessTokenSchema.safeParse(
        JSON.parse(token?.value ?? '{}')
    );
    if (!parsedToken.success) return redirect('/account/login');
    const currentCustomer = await getCurrentCustomer();
    if (!currentCustomer) return redirect('/account/login');
    return (
        <div className="min-h-landing-screen-sm flex w-full grow flex-col gap-8 pt-12 lg:min-h-landing-screen lg:gap-24 lg:pt-28">
            <Container className="flex-1">
                <DashboardNav
                    tabs={tabs}
                    customerAccessToken={parsedToken.data.accessToken}
                    customerFirstName={currentCustomer.firstName ?? ''}
                />

                <Suspense fallback="Loading">{tab}</Suspense>
            </Container>
            <DashboardFooter />
        </div>
    );
}
