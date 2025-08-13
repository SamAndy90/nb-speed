import { Heading, HeadingTitle, HeadingTop } from '@/components/Heading';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { LoginForm } from '@/features/auth/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <>
            <Heading>
                <HeadingTop>Nice to see you</HeadingTop>
                <HeadingTitle>Welcome Back</HeadingTitle>
            </Heading>
            <LoginForm />

            <Link
                href="/account/forgot-password"
                className="text-xs font-bold text-neutral-500 underline md:text-sm">
                Forgot your password?
            </Link>
            <AuthFooter>
                <AuthFooter.NotAMemberYet />
            </AuthFooter>
        </>
    );
}
