import { z } from 'zod';

//Zod Validation schemas for forms
const PasswordSchema = z.string().min(8);
const BooleanSchema = z.preprocess((val) => {
    return val === 'true'; //Coerce string to boolean. Zod handles this the native JS way, i.e. "false" would be truthy
}, z.boolean());
export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: PasswordSchema,
    staySignedIn: BooleanSchema,
});

export const RegisterFormSchema = LoginFormSchema.extend({
    firstName: z.string(),
    lastName: z.string(),
    agree: BooleanSchema,
}).omit({ staySignedIn: true });

export const ForgotPasswordFormSchema = LoginFormSchema.pick({ email: true });

export const ResetPasswordFormSchema = z.object({
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
    url: z.string(),
});

export const AccountDetailsFormSchema = z.object({
    oldEmail: z.string().email(),
    email: z.string().email().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    currentPassword: PasswordSchema.optional().or(z.literal('')),
    newPassword: PasswordSchema.optional().or(z.literal('')),
    confirmNewPassword: PasswordSchema.optional().or(z.literal('')),
});

export const UpdatePasswordFormSchema = z.object({
    email: z.string().email(),
    currentPassword: PasswordSchema,
    newPassword: PasswordSchema,
    confirmNewPassword: PasswordSchema,
});

export const CustomerAccessTokenSchema = z.object({
    accessToken: z.string(),
    expiresAt: z.string(),
});
export const CreateAddressFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required').min(2, 'First name is too short'),
    lastName: z.string().min(1, 'Last name is required').min(2, 'Last name is too short'),
    address1: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    zip: z.string().min(1, 'ZIP code is required'),
});

export const UpdateAddressFormSchema = CreateAddressFormSchema.extend({
    addressId: z.string(),
});

export const ContactFormSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name is too long'),

    email: z.string().email('Please enter a valid email address'),

    subject: z
        .string()
        .min(1, 'Subject is required')
        .max(200, 'Subject is too long'),

    message: z
        .string()
        .min(1, 'Message is required')
        .max(1000, 'Message is too long'),
});

export const ShipFrequencyFormSchema = z.object({
    frequency: z.string().min(1, 'Frequency is required'),
    unit: z.string().min(1, 'Unit is required'),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;
export type RegisterFormFields = z.infer<typeof RegisterFormSchema>;
export type ForgotPasswordFormFields = z.infer<typeof ForgotPasswordFormSchema>;
export type ResetPasswordFormFields = z.infer<typeof ResetPasswordFormSchema>;
export type AccountDetailsFormFields = z.infer<typeof AccountDetailsFormSchema>;
export type UpdatePasswordFormFields = z.infer<typeof UpdatePasswordFormSchema>;
export type CreateAddressFormFields = z.infer<typeof CreateAddressFormSchema>;
export type ContactFormFields = z.infer<typeof ContactFormSchema>;
export type UpdateAddressFormFields = z.infer<typeof UpdateAddressFormSchema>;
export type CustomerAccessToken = z.infer<typeof CustomerAccessTokenSchema>;
export type ShipFrequencyFormFields = z.infer<typeof ShipFrequencyFormSchema>;
