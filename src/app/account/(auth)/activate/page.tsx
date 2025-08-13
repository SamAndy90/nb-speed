import { Heading, HeadingTitle, HeadingTop } from '@/components/Heading';
import { ActivateForm } from '@/features/auth/components/ActivateForm';
import { AuthFooter } from '@/features/auth/components/AuthFooter';

/**
 * Forgot password form page. The user requests the password reset email from this page.
 */
export default function AccountActivatePage() {
    return (
        <>
            <Heading>
                <HeadingTop>Create your password to activate your account</HeadingTop>
                <HeadingTitle>Activate your account</HeadingTitle>
            </Heading>

            <ActivateForm />
            <AuthFooter>
                <AuthFooter.NotAMemberYet />
            </AuthFooter>
        </>
    );
}
