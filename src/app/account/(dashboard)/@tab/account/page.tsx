import { AccountDetailsForm } from '@/features/account-details/components/AccountDetailsForm';
import { DashboardContent } from '@/features/dashboard/components/DashboardContent';
import { getCurrentCustomer } from '@/features/shopify/server';

//TODO: No way to get the user's password from the API, so we can't prefill the password field
export default async function AccountPage() {
    const currentCustomer = await getCurrentCustomer();
    if (!currentCustomer) return null;

    return (
        <DashboardContent>
            <DashboardContent.Header>
                <h4>Personal Details</h4>
            </DashboardContent.Header>
            <DashboardContent.Body className="md:px flex-col gap-4 px-5 py-8 md:flex-row md:px-8">
                <AccountDetailsForm currentCustomer={currentCustomer} />
            </DashboardContent.Body>
        </DashboardContent>
    );
}
