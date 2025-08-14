import React from 'react';

interface SectionSpacerProps {
    hasBackground?: boolean;
    customSpacing?: string;
}

const SectionSpacer: React.FC<SectionSpacerProps> = ({
    hasBackground = false,
    customSpacing,
}) => {
    const getSpacingClass = (): string => {
        if (customSpacing) return customSpacing;

        return hasBackground
            ? 'h-0 md:h-auto max-md:h-[45px]' // 45px only on mobile
            : 'h-0 md:h-auto max-md:h-[90px]'; // 90px only on mobile
    };

    return <div className={`w-full ${getSpacingClass()} `} />;
};

export default SectionSpacer;
