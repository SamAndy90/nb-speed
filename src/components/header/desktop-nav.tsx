import { MenuItemFragment } from '@/gql/storefront/graphql';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { memo } from 'react';

const DesktopNav = ({
    activeMenu,
    menuItems,
    hasWhiteColor,
    onMouseLeave,
    onMouseEnter,
}: {
    hasWhiteColor: boolean;
    activeMenu: null | number;
    onMouseLeave: (index: null) => void;
    onMouseEnter: (index: number) => void;
    menuItems: MenuItemFragment[];
}) => {
    const handleMouseEnter = (item: MenuItemFragment, index: number) => {
        if (item.items.length <= 0) return;
        onMouseEnter(index);
    };
    const handleMouseLeave = (item: MenuItemFragment) => {
        if (item.items.length <= 0) return;
        onMouseLeave(null);
    };

    return (
        <ul className="hidden items-center lg:flex">
            {menuItems.map((item, index) => (
                <li
                    key={index}
                    onMouseEnter={() => handleMouseEnter(item, index)}
                    onMouseLeave={() => handleMouseLeave(item)}
                    className="flex h-auto items-center text-base font-semibold text-inherit">
                    {item.items.length > 0 ? (
                        <div
                            className={cn(
                                'flex cursor-pointer items-center gap-1 px-2',
                                { 'text-primary-black': activeMenu === index }
                            )}>
                            <button>{item.title}</button>
                            <ChevronDown
                                size={16}
                                className={cn({
                                    'rotate-180': activeMenu === index,
                                })}
                            />
                        </div>
                    ) : (
                        <Link
                            href={item.url}
                            className={cn('px-2 text-inherit', {
                                'hover:text-primary-black': !hasWhiteColor,
                            })}>
                            {item.title}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default memo(DesktopNav);
