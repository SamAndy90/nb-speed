'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataList } from '@/components/ui/datalist';
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Eye, EyeClosed, Trash2 } from 'lucide-react';
import { HTMLInputTypeAttribute, PropsWithChildren, useState } from 'react';
import { FieldValues, Control, Path, useFieldArray } from 'react-hook-form';

type FormFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;

    placeholder?: string;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
};

export function LabelledSelectField<T extends FieldValues>({
    control,
    name,
    placeholder,
    required,
    label,
    options,
}: FormFieldProps<T> & { options: string[] }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value);
                                // Manually mark as touched
                                field.onBlur();
                            }}
                            defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger
                                    className={cn(
                                        'flex h-[58px] w-full rounded-xs border border-input bg-background',
                                        'text-sm font-semibold ring-offset-background',
                                        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                                        'outline-none placeholder:text-neutral-400',
                                        'disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
                                        '[&_p]:pl-4 [&_p]:pt-4',
                                        'overflow-hidden'
                                    )}>
                                    <SelectValue
                                        placeholder={placeholder}
                                        className="px-4 py-[5px]"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    {label && (
                        <FormLabel
                            className={cn(
                                'absolute left-4 top-[6px] text-xs font-normal z-[1]',
                                'group-data-[state=error]:text-error-600',
                                'group-data-[state=valid]:text-success-600'
                            )}>
                            {label}
                        </FormLabel>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function SelectField<T extends FieldValues>({
    control,
    name,
    placeholder,
    options,
    className = '',
}: FormFieldProps<T> & { options: string[]; className?: string }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem
                    validCheckIconClassName="right-[7px]"
                    className={className}>
                    <FormControl>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value);
                                // Manually mark as touched
                                field.onBlur();
                            }}
                            defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="h-9 overflow-hidden [&_p]:px-4">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function LabelledInputField<T extends FieldValues>({
    control,
    name,
    placeholder,
    required,
    label,
    type,
}: FormFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormControl>
                        <Input
                            className="flex h-[58px] w-full rounded-xs border border-input bg-background px-4 py-[5px] pt-[29px] text-sm font-semibold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                            placeholder={placeholder}
                            required={required}
                            {...field}
                            type={type}
                        />
                    </FormControl>
                    {label && (
                        <FormLabel className="absolute left-4 top-[6px] text-xs font-normal z-[1]">
                            {label}
                        </FormLabel>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
Input.displayName = 'Input';
export function InputField<T extends FieldValues>({
    control,
    name,
    placeholder,
    required,
    label,
    type,
}: FormFieldProps<T>) {
    if (label)
        return (
            <LabelledInputField
                {...{ control, name, placeholder, required, label, type }}
            />
        );
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            required={required}
                            {...field}
                            type={type}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function CheckboxField<T extends FieldValues>({
    control,
    name,
    children,
    required,
}: FormFieldProps<T> & PropsWithChildren) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                required={required}
                            />
                            <FormLabel>{children}</FormLabel>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
export function EmailField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
}: FormFieldProps<T>) {
    return (
        <InputField
            control={control}
            name={name}
            label={label}
            placeholder={placeholder ?? 'Your email'}
            type="email"
        />
    );
}

export function LabelledPasswordField<T extends FieldValues>({
    control,
    name,
    placeholder,
    required,
    label,
}: FormFieldProps<T>) {
    const [type, setType] = useState('password');
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative" showValidCheck={false}>
                    <div className="relative flex items-center justify-end">
                        <FormControl>
                            <Input
                                className="peer flex h-[58px] w-full rounded-xs border border-input bg-background px-4 py-[5px] pt-[29px] text-sm font-semibold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                                placeholder={placeholder}
                                required={required}
                                {...field}
                                type={type}
                            />
                        </FormControl>
                        {label && (
                            <FormLabel className="absolute z-[1] left-4 top-[6px] text-xs font-normal peer-[:user-invalid]:text-red-500">
                                {label}
                            </FormLabel>
                        )}
                        <Button
                            className="absolute right-0 z-[1] mr-1 p-2 hover:bg-transparent"
                            onClick={(e) => {
                                e.preventDefault();
                                setType((oldType) =>
                                    oldType === 'input' ? 'password' : 'input'
                                );
                            }}
                            variant="ghost"
                            size="inline"
                            tabIndex={-1}>
                            {type === 'password' ? <Eye /> : <EyeClosed />}
                        </Button>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
export function PasswordField<T extends FieldValues>({
    control,
    name,
    required = true,
    placeholder = 'Password',
    label,
}: FormFieldProps<T>) {
    const [type, setType] = useState('password');
    if (label)
        return (
            <LabelledPasswordField
                {...{ control, name, placeholder, required, label, type }}
            />
        );
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative" showValidCheck={false}>
                    <div className="flex items-center justify-end">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                required={required}
                                {...field}
                                type={type}
                            />
                        </FormControl>
                        <Button
                            className="absolute right-0 mr-1 z-[1] p-2 hover:bg-transparent"
                            onClick={(e) => {
                                e.preventDefault();
                                setType((oldType) =>
                                    oldType === 'input' ? 'password' : 'input'
                                );
                            }}
                            variant="ghost"
                            size="inline"
                            tabIndex={-1}>
                            {type === 'password' ? <Eye /> : <EyeClosed />}
                        </Button>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

type MultipleLineFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
};

export function MultipleLineField<T extends FieldValues>({
    control,
    name,
    placeholder,
    required,
    label,
    rows = 4,
}: MultipleLineFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormControl>
                        <Textarea
                            className="flex min-h-[100px] w-full rounded-xs border border-input bg-background px-4 py-[5px] pt-[29px] text-sm font-semibold ring-offset-background placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                            placeholder={placeholder}
                            required={required}
                            rows={rows}
                            {...field}
                        />
                    </FormControl>
                    {label && (
                        <FormLabel className="absolute left-4 top-[6px] text-xs font-normal">
                            {label}
                        </FormLabel>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function LabelledMultipleLineField<T extends FieldValues>(
    props: MultipleLineFieldProps<T>
) {
    if (props.label) return <MultipleLineField {...props} />;

    return (
        <FormField
            control={props.control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Textarea
                            placeholder={props.placeholder}
                            required={props.required}
                            rows={props.rows}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

/*function PasswordToggle() {
    return (
        
    );
}*/
