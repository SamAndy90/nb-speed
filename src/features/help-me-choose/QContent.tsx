import { Progress } from './progress';
import { Radio, RadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Steps, QOption } from './quiz';

type QContentProps = {
    step: Steps;
    selected: QOption | null;
    setSelected: (value: QOption | null) => void;
    progress: number;
};

export function QContent({
    step,
    progress,
    selected,
    setSelected,
}: QContentProps) {
    return (
        <motion.div
            className={'w-full max-w-[414px] pt-4'}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.7, ease: 'circInOut' }}>
            <p className={'mb-9 w-full text-mobile-h3 md:text-desktop-h4'}>
                {step.title}
            </p>
            <div className={'w-full pb-20'}>
                <RadioGroup
                    value={selected}
                    onChange={setSelected}
                    className="space-y-3">
                    {step.options.map((o) => (
                        <Radio
                            key={o.value}
                            value={o}
                            as={'div'}
                            className={
                                'cursor-pointer rounded-xs bg-neutral-200 p-[1px] text-neutral-400 transition focus:outline-none data-[checked]:bg-cooper-gradient data-[checked]:text-black'
                            }>
                            <div className="flex w-full items-center gap-3 rounded-[7px] bg-primary-white px-6 py-4">
                                {o?.icon && o.icon}
                                <div>
                                    <div className="text-paragraph-4 font-bold md:text-paragraph-3 md:font-bold">
                                        {o.label}
                                    </div>
                                    {o?.description && (
                                        <p className="mt-0.5 text-paragraph-5 font-light leading-snug md:text-paragraph-5 md:font-light md:leading-snug">
                                            {o.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Radio>
                    ))}
                </RadioGroup>
            </div>
        </motion.div>
    );
}
