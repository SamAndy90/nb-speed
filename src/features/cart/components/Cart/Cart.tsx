'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import ShoppingBag from '@/assets/icons/shopping-bag.svg';
import { InnerSheetCart } from './InnerCartSheet';
import { useCart } from '../../context/cart';

const Cart = () => {
    const { cart, isOpen, setIsOpen } = useCart();
    const handleOpen = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };
    const handleClose = () => {
        setIsOpen(false);
        document.body.removeAttribute('style');
    };

    const totalItems = cart?.lines
        ? cart.lines.reduce((acc, line) => acc + line.quantity, 0)
        : 0;

    return (
        <div>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleOpen}
                className="relative">
                <ShoppingBag />
                {totalItems > 0 && (
                    <div className="absolute flex size-4 items-end justify-end">
                        <span className="relative flex size-4 min-w-4 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-gradient-3 text-[10px] font-bold">
                            {totalItems}
                        </span>
                    </div>
                )}
            </Button>
            <InnerSheetCart open={isOpen} onClose={handleClose} />
        </div>
    );
};

export default Cart;
