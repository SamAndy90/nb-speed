import {
    Heading,
    HeadingDescription,
    HeadingSubtitle,
    HeadingTitle,
} from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import Link from 'next/link';
import { Suspense } from 'react';

/**
 * Reset password form page. The user will be redirected here from the reset password email.
 */
export default function ResetPasswordPage() {
    return (
        <>
            <Heading>
                <HeadingTitle>Reset Password</HeadingTitle>
            </Heading>
            <Suspense fallback={null}>
                <ResetPasswordForm />
            </Suspense>

            <AuthFooter>
                <AuthFooter.NotAMemberYet />
            </AuthFooter>
        </>
    );
}
