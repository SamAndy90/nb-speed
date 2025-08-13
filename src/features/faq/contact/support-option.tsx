import React from 'react';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ArrowTextButton from '@/components/arrow-text-button';

interface SupportOptionProps {
    icon: ({ className }: { className?: string }) => JSX.Element;
    title: string;
    description: string;
    buttonText: string;
    type: string;
    onClick: (type: string) => void;
}

const SupportOption = ({
    icon,
    title,
    description,
    buttonText,
    type,
    onClick,
}: SupportOptionProps) => {
    const Icon = icon;
    return (
        <div className="flex h-[335px] flex-col items-center justify-center gap-6 rounded-[10px] bg-white px-10 py-3 text-center shadow-soft md:h-[422px]">
            <Icon className="h-[39px]" />
            <h4>{title}</h4>
            <p className="text-paragraph-4 md:text-paragraph-3">
                {description}
            </p>

            <ArrowTextButton
                buttonText={buttonText}
                onClick={() => onClick(type)}
            />
        </div>
    );
};

export default SupportOption;
