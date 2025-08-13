'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Pencil from '@/assets/icons/pencil.svg';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useTransition } from 'react';
import {
    setDefaultPaymentMethodAction,
    createPaymentMethodAction,
    deletePaymentMethodAction,
} from '../actions';
import { paymentMethodSchema } from '../schemas';
import { Separator } from '@/components/ui/separator';
import { Form } from '@/components/ui/form';
import { InputField } from '@/features/auth/components/form-fields';
import { ServerError } from '@/features/auth/components/ServerError';
import Paypal from '@/assets/icons/paypal.svg';
import {
    PaymentType,
    RechargePaymentMethod,
    type PaymentMethodFormData,
} from '@/lib/recharge/types';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentMethodRadioItemProps {
    value: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

export function PaymentMethodRadioItem({
    value,
    title,
    description,
    icon,
}: PaymentMethodRadioItemProps) {
    return (
        <div className="flex items-center gap-3">
            <RadioGroupItem value={value} id={value} variant="gradient" />
            <Label
                htmlFor={value}
                className="flex flex-1 flex-col items-center gap-3 lg:flex-row lg:gap-8">
                <div className="flex items-center gap-3">
                    {icon}
                    <p className="text-paragraph-3 font-semibold">{title}</p>
                </div>
                {description && (
                    <p className="text-paragraph-4 text-neutral-500">
                        {description}
                    </p>
                )}
            </Label>
        </div>
    );
}

interface PaymentMethodCardProps {
    method: RechargePaymentMethod;
    onDelete: (id: number) => void;
}

function PaymentMethodCard({ method, onDelete }: PaymentMethodCardProps) {
    const icon = method.payment_type === 'PAYPAL' ? <Paypal /> : null; // Add credit card icons as needed
    const paymentDetail = Array.isArray(method.payment_details)
        ? method.payment_details[0]
        : method.payment_details;
    const title =
        method.payment_type === 'PAYPAL' ? 'PayPal' : `${paymentDetail.brand}`;
    const description =
        method.payment_type === 'PAYPAL'
            ? paymentDetail.paypal_email
            : `•••• ${paymentDetail.last4} - Expires ${paymentDetail.exp_month}/${paymentDetail.exp_year}`;

    return (
        <div className="flex items-center gap-3">
            <RadioGroupItem
                value={String(method.id)}
                id={String(method.id)}
                variant="gradient"
            />
            <Label
                htmlFor={String(method.id)}
                className="flex flex-1 items-center gap-3 lg:gap-8">
                <div className="flex items-center gap-3">
                    {icon}
                    <p className="text-paragraph-3 font-semibold">{title}</p>
                </div>
                <div className="flex flex-1 items-center gap-3">
                    <p className="flex-1 text-right text-paragraph-4 text-neutral-500">
                        {description}
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(method.id);
                        }}
                        className="text-neutral-500 hover:text-neutral-900">
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </Label>
        </div>
    );
}

interface SubscriptionEditPaymentDialogProps {
    customerId: number;
    paymentMethods: RechargePaymentMethod[];
    currentPaymentMethod?: number;
}

export function SubscriptionEditPaymentDialog({
    customerId,
    paymentMethods,
    currentPaymentMethod,
}: SubscriptionEditPaymentDialogProps) {
    const [isPending, startTransition] = useTransition();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedPaymentMethod, setPaymentMethod] = useState<string>(
        String(currentPaymentMethod || '')
    );
    const router = useRouter();
    const form = useForm<PaymentMethodFormData>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            cardNumber: '',
            nameOnCard: '',
            expiryMonth: '',
            expiryYear: '',
            isPrimaryPaymentMethod: false,
            paymentType: PaymentType.CREDIT_CARD,
        },
    });

    const { control, watch, trigger } = form;
    const paymentType = watch('paymentType');

    const handleSubmit = async (data: PaymentMethodFormData) => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append('customer_id', String(customerId));
                Object.entries(data).forEach(([key, value]) => {
                    formData.append(key, String(value));
                });

                const result = await createPaymentMethodAction(formData);

                if (result.success) {
                    toast.success('Payment method saved successfully');
                    handleOpenChange(false);
                    router.refresh();
                    form.reset();
                } else {
                    toast.error(
                        result.error || 'Failed to save payment method'
                    );
                }
            } catch (error) {
                toast.error('Failed to save payment method');
            }
        });
    };

    const handleDelete = async (id: number) => {
        startTransition(async () => {
            const result = await deletePaymentMethodAction(id);
            if (result.success) {
                toast.success('Payment method removed successfully');
                router.refresh();
                handleOpenChange(false);
            } else {
                toast.error(result.error || 'Failed to remove payment method');
            }
        });
    };

    const handleUpdateAddressPaymentMethod = async (id: number) => {
        startTransition(async () => {
            const result = await setDefaultPaymentMethodAction(id);
            if (result.success) {
                toast.success('Default payment method updated');
                router.refresh();
                handleOpenChange(false);
            } else {
                toast.error(
                    result.error || 'Failed to update default payment method'
                );
            }
        });
    };

    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setShowAddForm(false);
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Pencil className="size-4" />
            </DialogTrigger>
            <DialogContent className="max-h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] max-w-[764px] overflow-y-auto px-5 md:pb-20 lg:px-6 lg:pt-6">
                <DialogTitle className="mb-8 text-mobile-h4 lg:mb-[60px] lg:px-10 lg:text-desktop-h4">
                    Payment method
                </DialogTitle>

                <div className="flex flex-col gap-16 lg:px-10">
                    <div className="flex flex-col gap-6">
                        {/* Existing Payment Methods */}
                        {paymentMethods.length > 0 && (
                            <RadioGroup
                                defaultValue={selectedPaymentMethod}
                                value={selectedPaymentMethod}
                                onValueChange={(value) => {
                                    setShowAddForm(value === 'new');
                                    setPaymentMethod(String(value));
                                }}
                                className="flex flex-col gap-6">
                                {paymentMethods.map((method) => (
                                    <PaymentMethodCard
                                        key={method.id}
                                        method={method}
                                        onDelete={handleDelete}
                                    />
                                ))}
                                <Separator />
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-row items-center gap-3">
                                        <RadioGroupItem
                                            value="new"
                                            id="payment-method-new"
                                            variant="gradient"
                                        />
                                        <Label htmlFor={'payment-method-new'}>
                                            <div className="text-paragraph-3 font-semibold">
                                                Add a Payment Method
                                            </div>
                                        </Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        )}

                        {paymentMethods.length < 1 && !showAddForm && (
                            <p className="text-center text-paragraph-3">
                                You have no payment method yet
                            </p>
                        )}

                        {showAddForm && (
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(handleSubmit)}
                                    className="flex flex-col items-start gap-6 px-3">
                                    <div className="flex w-full flex-col gap-6">
                                        <RadioGroup
                                            defaultValue={paymentType}
                                            value={paymentType}
                                            onValueChange={(value) => {
                                                form.setValue(
                                                    'paymentType',
                                                    value as PaymentType
                                                );
                                                trigger();
                                            }}
                                            className="flex flex-col gap-3">
                                            <PaymentMethodRadioItem
                                                value={PaymentType.CREDIT_CARD}
                                                title="Card Payment"
                                                description="Visa, Mastercard, American Express, Discovery, Maestro"
                                            />

                                            {paymentType ===
                                                PaymentType.CREDIT_CARD && (
                                                <div className="flex w-full flex-col flex-wrap gap-6">
                                                    <InputField
                                                        control={control}
                                                        name="cardNumber"
                                                        label="Card Number"
                                                        placeholder="XXXX XXXX XXXX XXXX"
                                                    />
                                                    <InputField
                                                        control={control}
                                                        name="nameOnCard"
                                                        label="Name on card"
                                                        placeholder="Your name"
                                                    />
                                                    <div className="flex gap-6">
                                                        <InputField
                                                            control={control}
                                                            name="expiryMonth"
                                                            label="Expiry Month"
                                                            placeholder="MM"
                                                        />
                                                        <InputField
                                                            control={control}
                                                            name="expiryYear"
                                                            label="Expiry Year"
                                                            placeholder="YYYY"
                                                        />
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id="isPrimaryPaymentMethod"
                                                            checked={form.watch(
                                                                'isPrimaryPaymentMethod'
                                                            )}
                                                            onCheckedChange={(
                                                                checked
                                                            ) =>
                                                                form.setValue(
                                                                    'isPrimaryPaymentMethod',
                                                                    Boolean(
                                                                        checked
                                                                    )
                                                                )
                                                            }
                                                        />
                                                        <Label htmlFor="isPrimaryPaymentMethod">
                                                            Set as primary
                                                            payment method
                                                        </Label>
                                                    </div>
                                                </div>
                                            )}

                                            <Separator className="my-4" />

                                            <PaymentMethodRadioItem
                                                value={PaymentType.PAYPAL}
                                                title="PayPal"
                                                icon={<Paypal />}
                                            />
                                        </RadioGroup>

                                        <ServerError
                                            error={
                                                form.formState.errors?.root
                                                    ?.message
                                            }
                                        />

                                        <div className="flex gap-6">
                                            <Button
                                                type="submit"
                                                variant="dark"
                                                size="md"
                                                className="h-[34px]"
                                                disabled={isPending}>
                                                {isPending
                                                    ? 'Processing...'
                                                    : 'Save Changes'}
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="md"
                                                className="h-[34px]"
                                                disabled={isPending}
                                                onClick={() => {
                                                    setShowAddForm(false);
                                                    setPaymentMethod(
                                                        String(
                                                            currentPaymentMethod ||
                                                                ''
                                                        )
                                                    );
                                                }}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </div>

                    {paymentMethods.length > 0 && (
                        <>
                            {String(selectedPaymentMethod) !==
                                String(currentPaymentMethod) &&
                                !showAddForm && (
                                    <Button
                                        onClick={() =>
                                            handleUpdateAddressPaymentMethod(
                                                Number(selectedPaymentMethod)
                                            )
                                        }
                                        variant="dark"
                                        size="md"
                                        disabled={
                                            isPending ||
                                            selectedPaymentMethod === 'new'
                                        }>
                                        {isPending
                                            ? 'Processing...'
                                            : 'Save Changes'}
                                    </Button>
                                )}
                        </>
                    )}

                    {paymentMethods.length < 1 && !showAddForm && (
                        <Button
                            onClick={() => setShowAddForm(true)}
                            variant="outline"
                            size="sm"
                            className="w-full">
                            {'Add Payment Method'}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
