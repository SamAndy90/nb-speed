'use server';

import {
    createCustomer,
    createCustomerAccessToken,
    createCustomerAddress,
    deleteCustomerAccessToken,
    recoverCustomer,
    resetCustomerPasswordByUrl,
    updateCustomer,
    updateCustomerAddress,
} from '@/features/shopify/api/fetch';
import {
    AccountDetailsFormSchema,
    UpdateAddressFormSchema,
    CustomerAccessToken,
    CustomerAccessTokenSchema,
    ForgotPasswordFormSchema,
    LoginFormSchema,
    RegisterFormSchema,
    ResetPasswordFormSchema,
    CreateAddressFormSchema,
    UpdatePasswordFormSchema,
    AccountDetailsFormFields,
} from './schemas';
import { isGraphQlError, isObject, isShopifyError } from '@/type-guards';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';
import {
    CustomerAccessTokenCreateMutation,
    CustomerAccessTokenDeleteMutation,
    CustomerAddressCreateMutation,
    CustomerAddressUpdateMutation,
    CustomerCreateMutation,
    CustomerRecoverMutation,
    CustomerResetByUrlMutation,
    CustomerUpdateMutation,
} from '@/gql/storefront/graphql';
import { LOGOUT_REF } from '@/consts';
import { ActionState } from './types';
import { ZodError } from 'zod';

type RegisterActionState = ActionState<CustomerCreateMutation>;
type LoginActionState = ActionState<CustomerAccessTokenCreateMutation>;
type LogoutActionState = ActionState<CustomerAccessTokenDeleteMutation>;
type UpdateCustomerActionState = ActionState<CustomerUpdateMutation>;
type RecoverCustomerActionState = ActionState<CustomerRecoverMutation>;
type ResetPasswordState = ActionState<CustomerResetByUrlMutation>;
type UpdateCustomerAddressActionState =
    ActionState<CustomerAddressUpdateMutation>;
export type CreateCustomerAddressActionState =
    ActionState<CustomerAddressCreateMutation>;

const UNKNOWN_ERROR = 'An unknown error occurred';
/*
 * NB: Shopify has two account systems, classic and new customer accounts
 * Classic accounts are created with a password and email
 * New customer accounts are passwordless
 * See https://www.shopify.com/uk/partners/blog/introducing-customer-account-api-for-headless-stores
 */

function getAndParseToken() {
    const token = cookies().get('shopifyAccessToken');
    if (!token) throw new Error('No Customer Access Token found in cookies');
    const parsedToken = CustomerAccessTokenSchema.safeParse(
        JSON.parse(token.value)
    );
    if (!parsedToken.success)
        throw new Error('Failed to parse Customer Access Token');
    return parsedToken.data;
}

function parseError(error: any) {
    if (
        isObject(error) &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        return error.message;
    }
    if (isShopifyError(error)) {
        return error.message.message;
    }
    if (isGraphQlError(error)) {
        return error.error.message;
    }
    if (typeof error === 'string') return error;

    return UNKNOWN_ERROR;
}
/**
 * Handles the registration action, attempting to create a new customer with the provided details.
 * Does not return any authentication tokens
 * @param prevState The previous state of the action. Unused, but required for useFormState.
 * @param formData
 * @returns
 */
export async function registerAction(
    prevState: RegisterActionState | LoginActionState,
    formData: FormData
): Promise<RegisterActionState | LoginActionState> {
    console.log(formData);
    const { firstName, lastName, email, password } = RegisterFormSchema.parse(
        Object.fromEntries(formData.entries())
    );
    try {
        //The customer still needs to be authenticated after registration
        const res = await createCustomer(firstName, lastName, email, password);

        if (!res.body.customerCreate) {
            return { error: UNKNOWN_ERROR, success: false };
        }
        if (hasCustomerUserErrors(res.body.customerCreate)) {
            return {
                error:
                    res.body.customerCreate?.customerUserErrors[0].message ??
                    UNKNOWN_ERROR,
                success: false,
            };
        }

        //return { ...res.body.customerCreate!, success: true };
    } catch (error) {
        console.error('Failed to create customer:', error);
        return { error: parseError(error), success: false };
    }
    //Registering creates the customer, but does not log them in
    //Then we log in to get a token
    return await loginAction(null, formData);
}
function hasCustomerUserErrors(res: { customerUserErrors?: unknown[] }) {
    return res.customerUserErrors && res.customerUserErrors.length > 0;
}

export async function recoverCustomerAction(
    prevState: RecoverCustomerActionState,
    formData: FormData
): Promise<RecoverCustomerActionState> {
    try {
        const { email } = ForgotPasswordFormSchema.parse(
            Object.fromEntries(formData.entries())
        );
        const resData = await recoverCustomer(email);
        
        if (!resData || !resData.customerRecover)
            throw new Error('No customer received');
        if (hasCustomerUserErrors(resData.customerRecover))
            throw new Error(
                resData.customerRecover.customerUserErrors[0].message
            );

        return { success: true };
    } catch (error) {
        console.error('Failed to send customer recover email:', error);
        return { error: parseError(error), success: false };
    }
}

function updateCustomerAccessTokenCookie(token: CustomerAccessToken) {
    console.log('Updating customer access token cookie');
    cookies().set('shopifyAccessToken', JSON.stringify(token), {
        httpOnly: true,
        maxAge: 24 * 60 * 60, //TODO: Set this to the actual expiry time
        sameSite: 'strict',
    });
}
/**
 * Handles the login action, attempting to use the provided credentials to create a customer access token.
 * If a token is succesfully created, it is stored in a cookie, and the user is redirected to the dashboard page.
 * @param prevState The previous state of the action. Unused, but required for useFormState.
 * @param formData
 * @returns
 */
export async function loginAction(
    prevState: LoginActionState,
    formData: FormData
): Promise<LoginActionState> {
    try {
        const { email, password } = LoginFormSchema.parse(
            Object.fromEntries(formData.entries())
        );
        const resData = await createCustomerAccessToken(email, password);

        if (!resData || !resData.customerAccessTokenCreate)
            throw new Error('An unknown error occurred');
        if (hasCustomerUserErrors(resData.customerAccessTokenCreate))
            throw new Error(
                resData.customerAccessTokenCreate.customerUserErrors[0].message
            );
        if (!resData.customerAccessTokenCreate.customerAccessToken)
            throw new Error('No customer access token received');

        updateCustomerAccessTokenCookie(
            resData.customerAccessTokenCreate.customerAccessToken
        );
    } catch (error) {
        console.error('Failed to create customer:', error);
        return { error: parseError(error), success: false };
    }
    redirect('/account/signed-in');
}

/**
 * Handles the login action, attempting to use the provided credentials to create a customer access token.
 * If a token is succesfully created, it is stored in a cookie, and the user is redirected to the dashboard page.
 * @param prevState The previous state of the action. Unused, but required for useFormState.
 * @param formData
 * @returns
 */
export async function resetPasswordAction(
    prevState: ResetPasswordState,
    formData: FormData
): Promise<ResetPasswordState> {
    try {
        const { password, confirmPassword, url } =
            ResetPasswordFormSchema.parse(
                Object.fromEntries(formData.entries())
            );
        if (password !== confirmPassword)
            throw new Error('Passwords do not match');

        const resData = await resetCustomerPasswordByUrl(password, url);

        const customerResetByUrl = resData.customerResetByUrl;
        if (!customerResetByUrl) throw new Error('No customer received');
        if (
            !customerResetByUrl.customerAccessToken ||
            !customerResetByUrl.customer
        )
            throw new Error('No customer access token received');
        if (hasCustomerUserErrors(customerResetByUrl))
            throw new Error(customerResetByUrl.customerUserErrors[0].message);
        updateCustomerAccessTokenCookie(customerResetByUrl.customerAccessToken);
    } catch (error) {
        console.error('Failed to reset password:', error);
        return { error: parseError(error), success: false };
    }
    redirect('/account/signed-in'); //TODO: Redirect here or show a confirmation in the form
}

export async function logoutAction(
    name: string,
    token: string
): Promise<LogoutActionState> {
    const url = new URLSearchParams();
    url.append('name', name);
    try {
        //Construct url params

        await deleteCustomerAccessToken(token);
        (await cookies()).delete('shopifyAccessToken');
    } catch (error) {
        return { error: parseError(error), success: false };
    }

    redirect(`/account/signed-out?${url.toString()}`);
}

async function testLogin(email: string, password: string) {
    const resData = await createCustomerAccessToken(email, password);
    return Boolean(resData.customerAccessTokenCreate?.customerAccessToken);
}

export async function updateCustomerAction(
    prevState: UpdateCustomerActionState,
    formData: FormData
): Promise<UpdateCustomerActionState> {
    const dataWithoutUndefinedKeys = Array.from(formData.entries()).filter(
        ([, v]) => v !== undefined
    );

    try {
        const parsedToken = getAndParseToken();

        const customer = AccountDetailsFormSchema.parse(
            Object.fromEntries(dataWithoutUndefinedKeys)
        );

        if (
            customer.currentPassword &&
            customer.newPassword &&
            customer.confirmNewPassword
        )
            await validateCustomerPassword(
                customer.oldEmail,
                customer.currentPassword,
                customer.newPassword,
                customer.confirmNewPassword
            );
        const customerVariables = {
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            password: customer.newPassword ?? customer.currentPassword,
        };
        const resData = await updateCustomer(
            customerVariables,
            parsedToken.accessToken
        );

        if (!resData) throw new Error('Data is undefined');

        if (hasCustomerUserErrors(resData))
            throw new Error(resData.customerUserErrors[0].message);
        // If the password changes, the token is updated
        if (resData.customerAccessToken) {
            console.log('Updating token');
            updateCustomerAccessTokenCookie(resData.customerAccessToken);
        }
        return { success: true, data: resData };
    } catch (error) {
        console.error('Failed to update customer:', error);
        return { error: parseError(error), success: false };
    }
}
async function validateCustomerPassword(
    email: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
) {
    if (newPassword !== confirmNewPassword) {
        throw new Error('Passwords do not match');
    }
    const loginSuccess = await testLogin(email, currentPassword);
    if (!loginSuccess) throw new Error('Current password is incorrect');
}
export async function updateCustomerPasswordAction(
    prevState: UpdateCustomerActionState,
    formData: FormData
): Promise<UpdateCustomerActionState> {
    try {
        const parsedToken = getAndParseToken();

        const { email, currentPassword, newPassword, confirmNewPassword } =
            UpdatePasswordFormSchema.parse(Object.fromEntries(formData));

        if (newPassword !== confirmNewPassword)
            throw new Error('Passwords do not match');
        const loginSuccess = await testLogin(email, currentPassword);
        if (!loginSuccess) throw new Error('Current password is incorrect');
        const resData = await updateCustomer(
            { password: newPassword },
            parsedToken.accessToken
        );
        if (!resData) throw new Error('Data is undefined');

        if (hasCustomerUserErrors(resData))
            throw new Error(resData.customerUserErrors[0].message);
        // If the password changes, the token is updated
        if (resData.customerAccessToken) {
            console.log('Updating token');
            updateCustomerAccessTokenCookie(resData.customerAccessToken);
        }
        return { success: true, data: resData };
    } catch (error) {
        console.error('Failed to update customer:', error);
        return { error: parseError(error), success: false };
    }
}

export async function createCustomerAddressAction(
    prevState: CreateCustomerAddressActionState,
    formData: FormData
): Promise<CreateCustomerAddressActionState> {
    const dataWithoutUndefinedKeys = Array.from(formData.entries()).filter(
        ([, v]) => v !== undefined
    );

    try {
        const parsedToken = getAndParseToken();
        console.log('Creating address with data:', dataWithoutUndefinedKeys);
        const address = CreateAddressFormSchema.parse(
            Object.fromEntries(dataWithoutUndefinedKeys)
        );
        const resData = await createCustomerAddress(
            address,
            parsedToken.accessToken
        );
        if (!resData) throw new Error('Data is undefined');
        if (hasCustomerUserErrors(resData))
            throw new Error(resData.customerUserErrors[0].message);

        return { success: true, data: resData };
    } catch (error) {
        console.error('Failed to update customer:', error);
        return { error: parseError(error), success: false };
    }
}
export async function updateCustomerAddressAction(
    prevState: UpdateCustomerAddressActionState,
    resData: FormData
): Promise<UpdateCustomerAddressActionState> {
    const dataWithoutUndefinedKeys = Array.from(resData.entries()).filter(
        ([, v]) => v !== undefined
    );

    try {
        const parsedToken = getAndParseToken();

        console.log('Updating customer with data:', dataWithoutUndefinedKeys);
        const { addressId, ...address } = UpdateAddressFormSchema.parse(
            Object.fromEntries(dataWithoutUndefinedKeys)
        );

        const resData = await updateCustomerAddress(
            addressId,
            address,
            parsedToken.accessToken
        );
        if (!resData)
            return { error: 'An unknown error occurred', success: false };
        if (hasCustomerUserErrors(resData))
            throw new Error(resData.customerUserErrors[0].message);

        return { success: true, data: resData };
    } catch (error) {
        console.error('Failed to update customer:', error);
        return { error: parseError(error), success: false };
    }
}
