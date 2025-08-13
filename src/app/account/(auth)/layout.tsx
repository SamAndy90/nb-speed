export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full grow flex-col items-center justify-start overflow-x-clip px-9 pt-6 md:pt-16 lg:pt-44">
            {children}
        </div>
    );
}
