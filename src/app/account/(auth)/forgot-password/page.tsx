import { Button } from '@/components/ui/button';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import Link from 'next/link';

/**
 * Forgot password form page. The user requests the password reset email from this page.
 */
export default function ForgotPasswordPage() {
    return (
        <>
            <ForgotPasswordForm />
            <AuthFooter>
                <AuthFooter.NotAMemberYet />
            </AuthFooter>
        </>
    );
}
