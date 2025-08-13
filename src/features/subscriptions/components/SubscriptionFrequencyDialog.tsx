'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Pencil from '@/assets/icons/pencil.svg';
import { updateSubscriptionFrequency } from '../actions';
import { RechargeSubscription } from '@/lib/recharge';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import {
    ShipFrequencyFormFields,
    ShipFrequencyFormSchema,
} from '@/features/auth/schemas';
import { SelectField } from '@/features/auth/components/form-fields';
import { FormSubmitButton } from '@/components/FormSubmitButton';

const UNIT_LABELS = {
    day: 'Days',
    week: 'Weeks',
    month: 'Months',
};

export default function SubscriptionFrequencyDialog({
    id: subscription_id,
    charge_interval_frequency,
    order_interval_unit,
}: Pick<
    RechargeSubscription,
    'id' | 'charge_interval_frequency' | 'order_interval_unit'
>) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<ShipFrequencyFormFields>({
        resolver: zodResolver(ShipFrequencyFormSchema),
        defaultValues: {
            frequency: String(charge_interval_frequency),
            unit: UNIT_LABELS[order_interval_unit],
        },
    });
    const { formState, reset } = form;
    const handleSave = async (formData: ShipFrequencyFormFields) => {
        if (loading) return;
        setLoading(true);
        const unit = formData.unit
            .toLowerCase()
            .slice(
                0,
                formData.unit.length - 1
            ) as RechargeSubscription['order_interval_unit'];
        try {
            await updateSubscriptionFrequency(
                subscription_id,
                Number(formData.frequency),
                unit
            );
            reset();
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to update frequency:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        reset({
            frequency: String(charge_interval_frequency),
            unit: UNIT_LABELS[order_interval_unit],
        });
    }, [order_interval_unit, charge_interval_frequency]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Pencil className="size-4" />
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-2.5rem)] max-w-[506px] px-5 lg:px-6 lg:pb-20">
                <DialogTitle className="text-mobile-h4 lg:px-10 lg:text-desktop-h4">
                    How often do you want your order to ship?
                </DialogTitle>
                <Form {...form}>
                    <form
                        className="flex flex-col items-start gap-6"
                        onSubmit={form.handleSubmit(handleSave)}>
                        <div className="flex flex-col lg:px-10">
                            <div className="my-8 flex min-h-[172px] gap-5">
                                <SelectField
                                    control={form.control}
                                    name="frequency"
                                    placeholder="Nr"
                                    options={[...new Array(30)].map((_, i) =>
                                        String(i + 1)
                                    )}
                                />
                                <SelectField
                                    control={form.control}
                                    placeholder="Please select"
                                    name="unit"
                                    options={['Days', 'Weeks', 'Months']}
                                    className="w-40"
                                />
                            </div>
                            <FormSubmitButton
                                className="h-[34px] w-fit"
                                variant="dark"
                                pending={loading}
                                disabled={!formState.isDirty}
                                submitSuccessful={formState.isSubmitSuccessful}>
                                Save changes
                            </FormSubmitButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
