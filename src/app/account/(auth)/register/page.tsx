import { Heading, HeadingTitle, HeadingTop } from '@/components/Heading';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <>
            <Heading>
                <HeadingTop>Join the community</HeadingTop>
                <HeadingTitle>Create an Account</HeadingTitle>
            </Heading>
            <RegisterForm />
            <AuthFooter>
                <AuthFooter.AlreadyAMember />
            </AuthFooter>
        </>
    );
}
