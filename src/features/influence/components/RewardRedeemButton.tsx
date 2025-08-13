'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Ticket from '@/assets/icons/reward-icons/ticket.svg';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { redeemCustomerRewardAction } from '../actions';
import { InfluenceReward, InfluenceCustomer } from '../types';
import { RewardCard } from './RewardCard';
import { Spinner } from '@/components/Spinner';
import { Input } from '@/components/ui/input';
function RewardRedeemButton() {
    const status = useFormStatus();
    return (
        <Button size="md" variant="dark" className="w-full">
            {status.pending ? <Spinner /> : 'Redeem'}
        </Button>
    );
}
export function RewardRedeemDialogButton({
    reward,
    customer,
    shopifyCustomerId,
}: {
    reward: InfluenceReward;
    customer: InfluenceCustomer;
    shopifyCustomerId: string;
}) {
    const canAfford = customer.pointBalance >= reward.pointCost;
    const [state, formAction] = useFormState(redeemCustomerRewardAction, null);
    const couponCode = state?.success ? state.data.couponCode : null;
    //const [pending, startTransition] = useTransition();

    //Log state on change with useEffect
    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="group">
                    <RewardCard
                        icon={Ticket}
                        title={reward.title}
                        description={`${reward.pointCost} Nutri Points`}
                    />
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl text-center">
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center justify-center gap-8 text-center">
                        <Ticket />
                        {reward.title}
                    </DialogTitle>
                    <DialogDescription className="flex flex-col items-center py-6 text-base font-semibold text-primary-foreground">
                        {!couponCode ? (
                            <>
                                You have {customer.pointBalance} Nutri Points
                                available.
                                <wbr />
                                This will require {reward.pointCost} Nutri
                                Points.
                                {!canAfford && (
                                    <b className="w-full text-center font-bold">
                                        <br />
                                        You don't have enough Nutri Points.
                                    </b>
                                )}
                            </>
                        ) : (
                            <Input
                                value={couponCode!}
                                className="text-center"
                            />
                        )}
                    </DialogDescription>
                </DialogHeader>
                {!couponCode && canAfford && (
                    <DialogFooter>
                        <form action={formAction}>
                            <input
                                value={customer.email}
                                name="customerEmail"
                                type="hidden"
                            />
                            <input
                                value={reward.id}
                                name="ruleId"
                                type="hidden"
                            />
                            <input
                                value={customer.id}
                                name="customerId"
                                type="hidden"
                            />
                            <input
                                value={shopifyCustomerId}
                                name="shopifyCustomerId"
                                type="hidden"
                            />
                            <RewardRedeemButton />
                        </form>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
