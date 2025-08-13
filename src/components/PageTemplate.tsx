import { PropsWithChildren } from 'react';

export function PageTemplate({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto flex h-screen w-full flex-col items-center justify-center gap-4">
            <h1>{children}</h1>
        </div>
    );
}
