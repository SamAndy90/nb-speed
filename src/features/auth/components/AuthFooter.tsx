import Link from 'next/link';
import { PropsWithChildren } from 'react';

export function AuthFooter({ children }: PropsWithChildren) {
    return (
        <div className="bottom-6 mb-6 mt-auto flex flex-col items-center justify-center gap-2 text-sm lg:mb-12 [&_a]:underline">
            <p>{children}</p>
        </div>
    );
}

function NotAMemberYet() {
    return (
        <>
            Not a member yet? <Link href="/account/register">Register now</Link>
        </>
    );
}

function AlreadyAMember() {
    return (
        <>
            Already a member? <Link href="/account/login">Log In Here</Link>
        </>
    );
}

AuthFooter.NotAMemberYet = NotAMemberYet;
AuthFooter.AlreadyAMember = AlreadyAMember;
