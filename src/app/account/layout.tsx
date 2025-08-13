import { DashboardFooter } from '@/features/dashboard/components/DashboardFooter';
import '@/styles/globals.css';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-between overflow-x-hidden">
            <div className="flex w-full grow flex-col items-center justify-start">
                {children}
            </div>
        </main>
    );
}
