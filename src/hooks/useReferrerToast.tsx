'use client';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { LOGOUT_REF } from '@/consts';
const TOAST_DELAY = 1000;
export function useReferrerToast() {
    const searchParams = useSearchParams();
    const ref = searchParams.get('ref');
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (ref === LOGOUT_REF) {
            //Show toast after 1 second
            timeout = setTimeout(() => {
                console.log('Showing toast');
                toast.success('You have been logged out');
            }, TOAST_DELAY);
        }
        return () => clearTimeout(timeout);
    }, [ref]);
}

export function ReferrerToast() {
    useReferrerToast();
    return null;
}
