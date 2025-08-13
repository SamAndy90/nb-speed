import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

function Pipe() {
    return <div className="mx-3 hidden text-neutral-200 md:block">|</div>;
}
export function DashboardFooter() {
    return (
        <footer className="flex w-full flex-col bg-theme-50 px-5 py-6 text-center text-xs font-semibold text-neutral-500 md:flex-row md:justify-between md:gap-6 md:px-36">
            <div className="mb-6 flex flex-col gap-3 md:mb-0 md:flex-row md:gap-0">
                <Link href="/">Back to the Homepage</Link>
                <Pipe />
                <Link href="/legal/toc">Terms & Conditions</Link>
                <Pipe />
                <Link href="/legal/refund">Return Policy</Link>
            </div>
            <Separator className="w-full md:hidden" />
            <p className="mt-3 md:mt-0">
                ©Nutriburst Ltd. {new Date().getFullYear()}
            </p>
        </footer>
    );
}
