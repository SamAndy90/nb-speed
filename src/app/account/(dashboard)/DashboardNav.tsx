'use client';
import { HeadingTitle } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/features/auth/actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

import { DashboardTabs } from './consts';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DashboardNav({
    tabs,
    customerAccessToken,
    customerFirstName,
}: {
    tabs: DashboardTabs;
    customerAccessToken: string;
    customerFirstName: string;
}) {
    const segments = useSelectedLayoutSegments('tab');

    const activeTab = tabs.find((tab) => segments.includes(tab.value));
    const title =
        activeTab?.label === 'Overview'
            ? `Hello ${customerFirstName}!`
            : activeTab?.label;

    return (
        <div className="mb-8 flex w-full flex-wrap items-center justify-between gap-8 lg:mb-[80px]">
            <h2>{title}</h2>
            <ScrollArea>
                <nav className="flex h-fit w-fit shrink-0 gap-4 *:w-fit *:whitespace-nowrap max-md:mb-4">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.value}
                            href={`/account/${tab.value}`}
                            className={cn(
                                'text-sm font-semibold text-neutral-400 no-underline transition-all hover:text-primary-foreground md:text-base',
                                tab.value === activeTab?.value &&
                                    'text-foreground'
                            )}>
                            {tab.label}
                        </Link>
                    ))}

                    <Button
                        variant="link"
                        className={cn(
                            'h-fit px-0 py-0 text-sm font-semibold text-neutral-400 no-underline hover:text-primary-foreground md:text-base'
                        )}
                        onClick={() =>
                            logoutAction(customerFirstName, customerAccessToken)
                        }>
                        Log Out
                    </Button>
                </nav>
            </ScrollArea>
        </div>
    );
}
