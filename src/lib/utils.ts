import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';
const customTwMerge = extendTailwindMerge({
    extend: {
        theme: {
            // The `boxShadow` key isn't actually supported
            padding: ['page-desktop', 'page-mobile', '30', '35', '25'],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return customTwMerge(clsx(inputs));
}

export function setBenefitContextHelper(
    str: string,
    strSetter: (v: string) => void
) {
    if ((str as string).includes('Advanced')) {
        strSetter('Advanced');
    } else if ((str as string).includes('Kids')) {
        strSetter('Kids');
    } else if ((str as string).includes('Daily')) {
        strSetter('Daily');
    } else {
        strSetter('');
    }
}

export const createUrl = (pathname: string, params: URLSearchParams) => {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
    stringToCheck.startsWith(startsWith)
        ? stringToCheck
        : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
    const requiredEnvironmentVariables = [
        'SHOPIFY_STORE_DOMAIN',
        'SHOPIFY_STOREFRONT_ACCESS_TOKEN',
    ];
    const missingEnvironmentVariables = [] as string[];

    requiredEnvironmentVariables.forEach((envVar) => {
        if (!process.env[envVar]) {
            missingEnvironmentVariables.push(envVar);
        }
    });

    if (missingEnvironmentVariables.length) {
        throw new Error(
            `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
                '\n'
            )}\n`
        );
    }

    if (
        process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
        process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
    ) {
        throw new Error(
            'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.'
        );
    }
};

export function objectToFormData(obj: Record<string, any>) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
}

export const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

export const shortCurrencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

//Formats the date as dd mm yyyy
export function formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-DE');
}

//Format date to Day, dd-mm-yyyy
export function formatFullDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-DE', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export function repeat(arr: unknown[], n: number) {
    return Array.from({ length: n }).flatMap(() => arr);
}

export function stripIdNumber(id: string) {
    return id.split('/').pop();
}

export function toCapitalCase(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}

export function getNextChargeInfo(dateStr: string) {
    const nextChargeDate = new Date(dateStr);

    const formatted = nextChargeDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const oneMonthLater = new Date(nextChargeDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    return {
        raw: nextChargeDate,
        formatted,
        afterSkip: oneMonthLater,
        afterSkipFormatted: oneMonthLater.toISOString().split('T')[0],
    };
}

export const FREE_SHIPPING_PRICE = 30;
