import { DashboardContent } from '@/features/dashboard/components/DashboardContent';
import { AddressCardForm } from '../../../../../features/address-book/components/AddressCardForm';
import { CreateAddressDialog } from '../../../../../features/address-book/components/AddressDialog';
export default async function AddressBookPage() {
    return (
        <DashboardContent>
            <DashboardContent.Header>
                <div className="flex w-full flex-wrap justify-between gap-6">
                    <h4>Your addresses</h4>
                    <CreateAddressDialog />
                </div>
            </DashboardContent.Header>
            <DashboardContent.Body>
                <AddressCardForm />
            </DashboardContent.Body>
        </DashboardContent>
    );
}
