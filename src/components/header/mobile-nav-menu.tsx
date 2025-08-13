import { MenuItemFragment } from '@/gql/storefront/graphql';
import { Button } from '../ui/button';
import Close from '@/assets/icons/close.svg';
import Menu from '@/assets/icons/menu.svg';
import { Accordion, AccordionContent, AccordionItem } from '../ui/accordion';
import React, { useEffect } from 'react';
import {
    PrimaryAccordionLink,
    PrimaryAccordionTrigger,
} from '../ui/nav-accordion';
import Link from 'next/link';
import User from '@/assets/icons/user.svg';
// import Help from '@/assets/icons/help.svg';
// import { NavMaryBadge } from '@/features/landing/components/ExpertBadge';
import { useMobileNav } from '../header';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../container';
import { useBenefit } from '@/features/collections/providers/BenefitProvider';
import { useRouter } from 'next/navigation';
import { setBenefitContextHelper } from '@/lib/utils';

function MobileNavItem({
    item: { items, title, url },
}: {
    item: MenuItemFragment;
}) {
    const { close } = useMobileNav();
    const { setBenefitValue } = useBenefit();
    const router = useRouter();
    if (items.length === 0)
        return (
            <PrimaryAccordionLink href={url} onClick={close}>
                {title}
            </PrimaryAccordionLink>
        );
    return (
        <AccordionItem value={title} className="border-b-0">
            <PrimaryAccordionTrigger value={title}>
                {title}
            </PrimaryAccordionTrigger>
            <AccordionContent className="pb-0">
                <ul className="my-2 flex flex-col gap-2">
                    {items.map((subItem) => {
                        return (
                            <li key={subItem.title}>
                                <Button
                                    asChild
                                    className="py-1 text-sm font-normal no-underline hover:underline"
                                    size="inline"
                                    variant="linkMuted">
                                    <Link
                                        href={subItem.url ?? ''}
                                        onClick={() => {
                                            setBenefitContextHelper(
                                                subItem.title,
                                                setBenefitValue
                                            );
                                            close();
                                        }}>
                                        {subItem.title}
                                    </Link>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </AccordionContent>
        </AccordionItem>
    );
}

function differentMenuItemTypes(a: MenuItemFragment, b?: MenuItemFragment) {
    if (!b) return false;
    return a.items.length > 0 != b.items.length > 0;
}

function MobileNavMenu({
    items,
    open,
    onOpenChange,
}: {
    items: MenuItemFragment[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const handleOnClick = () => {
        onOpenChange(!open);
    };

    useEffect(() => {
        const body = document.querySelector('body');
        if (!body) return;
        body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    return (
        <div>
            <Button
                size="icon"
                variant="ghost"
                className="order-3 lg:hidden"
                onClick={handleOnClick}>
                {open ? <Close className="size-4" /> : <Menu />}
            </Button>

            <AnimatePresence mode="wait">
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'calc(100vh - 58px)' }}
                        exit={{ height: 0 }}
                        transition={{
                            height: {
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1],
                            },
                        }}
                        className="fixed left-0 top-[58px] z-40 h-full w-full overflow-hidden text-primary-black">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1],
                            }}>
                            <div
                                style={{ height: 'calc(100vh - 58px)' }}
                                className="group w-full">
                                <Container className="flex h-full flex-col justify-between overflow-auto pt-[90px]">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex flex-col gap-4">
                                        {items.map((item, i, arr) => (
                                            <React.Fragment key={item.title}>
                                                <MobileNavItem item={item} />
                                                {differentMenuItemTypes(
                                                    item,
                                                    arr[i + 1]
                                                ) && <div className="h-2" />}
                                            </React.Fragment>
                                        ))}
                                    </Accordion>
                                    <div className="mt-10 flex flex-col gap-4">
                                        <PrimaryAccordionLink
                                            href="/account/overview"
                                            className="gap-3"
                                            onClick={handleOnClick}>
                                            <User /> Account
                                        </PrimaryAccordionLink>
                                    </div>
                                    {open && (
                                        <div className="mb-5 mt-10 flex grow flex-col justify-end">
                                            {/* <NavMaryBadge /> */}
                                        </div>
                                    )}
                                </Container>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MobileNavMenu;
