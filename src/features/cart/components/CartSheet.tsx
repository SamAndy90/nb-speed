'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import ShoppingBag from '@/assets/icons/shopping-bag.svg';
import { InnerSheetCart } from './InnerCart';
import { useCart } from '../context/cart';

/**
    Sheet displayed when clicking the shopping cart icon in the header.
 */
export function CartSheet() {
    const { isOpen, setIsOpen } = useCart();
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <ShoppingBag />
                </Button>
            </SheetTrigger>
            <InnerSheetCart />
        </Sheet>
    );
}
