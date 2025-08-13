import { cn } from '@/lib/utils';
import {
    Dialog as HuiDialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from '../ui/button';
import Close from '@/assets/icons/close.svg';

export type DialogProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: {
        overlay?: string;
        contentWrapper?: string;
        content?: string;
    };
};

export function Dialog(props: DialogProps) {
    const {
        open = false,
        onClose = () => {
            console.warn('Close dialog not implemented');
        },
        children,
        className,
    } = props;

    return (
        <Transition show={open}>
            <div
                className={cn(
                    'no-scrollbar fixed inset-0 z-[200] max-h-full w-full max-w-full overflow-y-auto overflow-x-hidden bg-[#FEFEFC] px-5 py-[58px] pb-3 shadow-lg transition duration-300',
                    'data-[closed]:translate-x-full data-[closed]:opacity-0',
                    'data-[leave]:duration-200 data-[leave]:ease-in-out',
                    'data-[leave]:data-[closed]:translate-x-20'
                )}>
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-[20px] top-[9px]"
                    onClick={onClose}>
                    {<Close className="size-4" />}
                </Button>
                {children}
            </div>
        </Transition>
    );
}
