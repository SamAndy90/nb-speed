export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-16 overflow-x-hidden">
            {children}
        </main>
    );
}
