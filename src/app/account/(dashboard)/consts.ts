export const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Subscriptions', value: 'subscriptions' },
    {
        label: 'Orders',
        value: 'orders',
    },
    // { label: 'Rewards', value: 'rewards' },
    {
        label: 'Address Book',
        value: 'address-book',
    },
    {
        label: 'Account',
        value: 'account',
    },
] as const;

export type DashboardTabs = typeof tabs;
