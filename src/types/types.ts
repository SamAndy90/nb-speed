import { getCartId } from '@/features/cart/actions';
import { Cart } from '@/features/shopify/types';
import { ComponentProps } from 'react';

export type PropsWithClassName = { className?: string };
export type FormStatus = 'idle' | 'pending' | 'success' | 'error';
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type ExpandRecursively<T> = T extends object
    ? T extends infer O
        ? { [K in keyof O]: ExpandRecursively<O[K]> }
        : never
    : T;

export type GraphQlError = {
    message: string;
    path: string[];
    locations: { line: number; column: number }[];
};

export type ActionState<T = undefined> =
    | (T extends undefined ? { success: true } : { success: true; data: T })
    | { success: false; error: string };

export type ActionSuccess<T = undefined> = {
    success: true;
} & (T extends undefined ? {} : { data: T });
export type ActionError = { success: false; error: string };
export type ActionResult<T = undefined> = ActionSuccess<T> | ActionError;
export type AsProps<T extends React.ElementType = React.ElementType> = {
    as?: T;
} & ComponentProps<T>;
