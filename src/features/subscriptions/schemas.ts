import { z } from 'zod';
import { PaymentType } from '@/lib/recharge';

const currentYear = new Date().getFullYear();

export const paymentMethodSchema = z
    .object({
        paymentType: z.nativeEnum(PaymentType),
        cardNumber: z.string().nullable().optional(),
        nameOnCard: z.string().nullable().optional(),
        expiryMonth: z.string().nullable().optional(),
        expiryYear: z.string().nullable().optional(),
        isPrimaryPaymentMethod: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
        if (data.paymentType === PaymentType.CREDIT_CARD) {
            if (!data.cardNumber?.match(/^\d{16}$/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Card number must be 16 digits',
                    path: ['cardNumber'],
                });
            }
            if (!data.nameOnCard) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Name on card is required',
                    path: ['nameOnCard'],
                });
            }
            if (!data.expiryMonth?.match(/^(0[1-9]|1[0-2])$/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid month format',
                    path: ['expiryMonth'],
                });
            }
            if (!data.expiryYear?.match(/^\d{4}$/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid year format',
                    path: ['expiryYear'],
                });
            } else if (parseInt(data.expiryYear) < currentYear) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Year must be in the future',
                    path: ['expiryYear'],
                });
            }
        }
    });
