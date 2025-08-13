import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignedOut({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const name = searchParams.name;
    const message = name ? `Goodbye, ${name}!` : 'Goodbye!';
    return (
        <>
            <h1>{message}</h1>
            <p>You have been securely logged out. See you soon. </p>
            <div className="flex flex-row gap-3">
                <Button asChild variant="dark">
                    <Link href="/account/login">Login again</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Return home</Link>
                </Button>
            </div>
        </>
    );
}
