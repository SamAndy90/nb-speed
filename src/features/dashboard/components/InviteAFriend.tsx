'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Copy from '@/assets/icons/copy.svg';
import { cn } from '@/lib/utils';
import Check from '@/assets/icons/check.svg';
import { toast } from 'sonner';
import { Socials } from '@/components/Socials';
import { PropsWithClassName } from '@/types';
function PrimaryInput({
    value,
    status,
    id,
    name,
}: {
    value: string;
    status: 'pending' | 'success' | 'error' | null;
    id: string;
    name: string;
}) {
    console.log('status:', status);
    const isSuccess = status === 'success';
    return (
        <div className="group relative flex w-full items-center overflow-clip rounded-full p-px *:duration-700">
            <Button
                className={cn(
                    'absolute left-[-20%] z-20 size-[calc(3.5rem-8px)] rounded-full bg-gradient-2 transition-all',
                    !isSuccess && 'group-hover:left-1'
                )}
                size="icon"
                type="submit">
                <Copy className="h-4 w-4" />
            </Button>
            <input
                className={cn(
                    'peer/input z-10 h-14 w-full rounded-full pl-4 font-semibold outline-none transition-all placeholder:font-semibold placeholder:text-neutral-400 focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
                    isSuccess ? '' : 'focus:bg-theme-50 group-hover:pl-[20%]'
                )}
                required
                name={name}
                id={id}
                value={value}
            />
            <Button
                className={cn(
                    'absolute right-1 z-20 size-[calc(3.5rem-8px)] rounded-full transition-all',
                    isSuccess
                        ? 'bg-transparent text-success-600'
                        : 'bg-gradient-2 group-hover:right-[-20%]'
                )}
                size="icon">
                {isSuccess ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </Button>
            <div
                key={status}
                className={cn(
                    'absolute inset-0 size-full rounded-full bg-border transition-all animate-in fade-in',
                    isSuccess
                        ? 'bg-success-600'
                        : 'bg-border peer-focus/input:bg-gradient-3'
                )}
            />
        </div>
    );
}
export function InviteAFriend({
    className,
    variant = 'rewards',
    referralLink,
}: PropsWithClassName & {
    variant?: 'overview' | 'rewards';
    referralLink: string;
}) {
    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            console.log('Copied to clipboard:', text);
            toast.success('Copied to clipboard');
        } catch (e) {
            console.error('Failed to copy to clipboard:', e);
        }
    };
    return (
        <div
            className={cn(
                'flex w-full max-w-[429px] items-center justify-between px-5 py-7 md:rounded-[calc(var(--radius)-6px)] md:px-8 md:py-8',
                className,
                variant == 'overview' && ''
            )}>
            <div className="flex flex-col">
                <div className="text-xl font-bold">Invite a friend</div>
                <p className="mb-6 mt-2.5 max-w-48 text-sm font-normal">
                    Invite a friend and receive up 2500 Nutripoints.
                </p>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="dark" size="sm">
                            Invite a friend
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100%-40px)] max-w-[542px] pb-8 md:pb-20">
                        <div className="md:px-14">
                            <DialogTitle className="mb-3">
                                Refer a friend & get rewarded
                            </DialogTitle>
                            <p className="mb-8">
                                Share your unique referral link with family and
                                friends and get rewards. They will receive £10
                                discount and you will receive £10 discount.
                            </p>
                            <form
                                className="mb-8 w-full"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    //Get form values:
                                    const form = e.target as HTMLFormElement;
                                    const formData = new FormData(form);
                                    const referral = formData.get(
                                        'referral'
                                    ) as string;
                                    console.log('referral:', referral);
                                    copyToClipboard(referral);
                                }}>
                                <PrimaryInput
                                    status={null}
                                    value={referralLink}
                                    id="referral"
                                    name="referral"
                                />
                            </form>
                            <Socials className="w-full justify-between [&_svg]:size-9" />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gradient-3-from via-gradient-3-via to-gradient-3-to font-heading text-[28px] font-medium text-white md:size-32 md:text-[40px]">
                £25
            </div>
        </div>
    );
}
