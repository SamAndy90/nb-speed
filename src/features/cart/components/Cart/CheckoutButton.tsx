import { PrimaryButton } from '@/components/PrimaryButton';
import { ComponentProps } from 'react';
import Lock from '@/assets/icons/lock.svg';
import Link from 'next/link';

/**
 * Button that links to the checkout page.
 */
function CheckoutButton({ href }: ComponentProps<typeof Link>) {
    return (
        <PrimaryButton
            type="submit"
            className="relative h-[46px] w-full flex-row items-center justify-center"
            as={Link}
            href={href}>
            <Lock /> Checkout
        </PrimaryButton>
    );
}

export default CheckoutButton;
