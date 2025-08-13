import React from 'react';
import Link from 'next/link';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { ElementType } from 'react';

type BaseProps = {
    buttonText: string;
    className?: string;
    as?: ElementType;
};

type LinkProps = BaseProps & {
    as: typeof Link;
    href: string;
    onClick?: never;
};

type ButtonProps = BaseProps & {
    as?: Exclude<ElementType, typeof Link>;
    onClick: () => void;
    href?: never;
};

type ArrowTextButtonProps = LinkProps | ButtonProps;

const ArrowTextButton = ({
    as: Component = 'span',
    buttonText,
    onClick,
    href,
    className = '',
    ...props
}: ArrowTextButtonProps) => {
    const baseClasses =
        'flex cursor-pointer items-center gap-[3px] text-[14px] font-bold leading-[1] transition-all duration-300 group';

    return (
        <Component
            className={`${baseClasses} ${className}`}
            onClick={onClick}
            href={href}
            {...props}>
            {buttonText}
            <ChevronRight className="relative top-0.5 w-[14px] transition-transform duration-300 group-hover:translate-x-1" />
        </Component>
    );
};

export default ArrowTextButton;
