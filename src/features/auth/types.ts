import { CustomerUserError } from '../shopify/types';

export type Payload<T> = NonNullable<T[keyof Omit<T, '__typename'>]>;
export type ActionState<T = {}> = MutationSuccessOrError<Payload<T>> | null;
/**
 * Extracts the success type from a mutation response in order to return from the action
 * Some queries don't return a result, so we just return a success flag
 * Most queries also just redirect, so the return value so far isn't used much on the front-end
 */
export type MutationSuccess<T> =
    T extends Required<Omit<Payload<T>, '__typename' | 'customerUserErrors'>>
        ? { success: true; data: T }
        : { success: true };

export type MutationError<T> = (T extends {
    customerUserErrors: (infer U extends CustomerUserError)[];
}
    ? {
          error: U['message'];
      }
    : { error: string }) & { success: false };
type MutationSuccessOrError<T> = MutationSuccess<T> | MutationError<T>;

export type FormAction<T> = (
    prev: ActionState<T>,
    data: FormData
) => Promise<ActionState<T>>;
