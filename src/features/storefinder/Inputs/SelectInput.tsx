import { cn } from '@/lib/utils';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa6';

type Option = {
    value: string;
    label: string;
};

type BaseProps = {
    prefix?: string;
    options: Option[];
    display?: string;
    className?: {
        wrapper?: string;
        button?: string;
    };
};

export type SelectInputProps =
    | ({
          value: string;
          onChange: (value: string) => void;
          multiple?: false;
      } & BaseProps)
    | ({
          value: string[];
          onChange: (value: string[]) => void;
          multiple: true;
      } & BaseProps);

export function SelectInput(props: SelectInputProps) {
    const {
        value,
        onChange,
        options,
        display = '',
        prefix = '',
        multiple,
        className = {},
    } = props;

    const { wrapper = '', button = '' } = className;

    let displayValue = display;
    if (multiple) {
        const activeOptionsLabel = options
            .filter((i) => value.includes(i.value))
            .map((i) => i.label)
            .join(', ');
        if (activeOptionsLabel) displayValue = activeOptionsLabel;
    } else {
        const activeOptionLabel = options.find((i) => i.value === value)?.label;
        if (activeOptionLabel) displayValue = activeOptionLabel;
    }

    return (
        <Listbox value={value} onChange={onChange} multiple={multiple}>
            <div className={cn('relative', wrapper)}>
                <ListboxButton className={'w-full outline-none'}>
                    {({ open, active }: { open: boolean; active: boolean }) => (
                        <div
                            className={cn(
                                'flex h-11 flex-nowrap items-center gap-x-2 rounded-full border border-[#1E1E1E]/70 px-3 text-paragraph-4 font-bold text-[#1E1E1E]/70 transition-colors',
                                {
                                    'border-grad-cooper text-[#1E1E1E]': active,
                                    'hover:border-[#1E1E1E]': !active,
                                },
                                button
                            )}>
                            <span
                                className={cn(
                                    'ml-1.5 line-clamp-1 flex-1 whitespace-nowrap text-left'
                                )}>
                                {prefix && prefix} {displayValue}
                            </span>
                            <FaChevronDown
                                className={cn('size-2.5 transition-transform', {
                                    'rotate-180 text-[#1E1E1E]': open,
                                })}
                            />
                        </div>
                    )}
                </ListboxButton>

                <ListboxOptions
                    anchor={'bottom start'}
                    transition
                    className={
                        'z-[1000] !max-h-56 w-[var(--button-width)] min-w-fit divide-y-[1px] divide-neutral-300 rounded-sm border border-neutral-300 bg-primary-white text-paragraph-4 font-bold transition duration-300 ease-out [--anchor-gap:3px] focus:outline-none data-[closed]:scale-95 data-[open]:scale-100 data-[closed]:opacity-0'
                    }>
                    <ListboxOption value={''} className={'overflow-x-hidden'}>
                        {({
                            focus,
                            selected,
                        }: {
                            focus: boolean;
                            selected: boolean;
                        }) => (
                            <div
                                className={cn(
                                    'flex cursor-pointer select-none items-center justify-between gap-x-2 text-nowrap px-3 py-2.5',
                                    {
                                        'bg-neutral-100': focus,
                                        'bg-primary-white text-neutral-400':
                                            selected,
                                    }
                                )}>
                                <span className={'truncate'}>–</span>
                            </div>
                        )}
                    </ListboxOption>
                    {options.map((i) => (
                        <ListboxOption
                            key={i.value}
                            value={i.value}
                            className={'overflow-x-hidden'}>
                            {({
                                focus,
                                selected,
                            }: {
                                focus: boolean;
                                selected: boolean;
                            }) => (
                                <div
                                    className={cn(
                                        'flex cursor-pointer select-none items-center justify-between gap-x-2 text-nowrap px-3 py-2.5',
                                        {
                                            'bg-neutral-100': focus,
                                            'bg-primary-white text-neutral-400':
                                                selected,
                                        }
                                    )}>
                                    <span className={'truncate'}>
                                        {i.label}
                                    </span>
                                </div>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
