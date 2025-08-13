'use client';

import {
    createContext,
    PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from 'react';
import { storeData, TStore } from './tesco_stores';
import { LatLngLiteral } from 'leaflet';
import { useUserLocation } from '@/hooks/useUserLocation';

export const distanceOptions = [
    { value: '5', label: '5 Miles' },
    { value: '10', label: '10 Miles' },
    { value: '25', label: '25 Miles' },
    { value: '45', label: '45 Miles' },
];

export const resultsOptions = [
    { value: '15', label: '15 Results' },
    { value: '25', label: '25 Results' },
    { value: '50', label: '50 Results' },
];

export type FindStoreContextType = {
    stores: TStore[];
    distance: string;
    resultsAmount: string;
    query: string;
    selectedLocation: TStore | undefined;
    setDistance: (v: string) => void;
    setResultsAmount: (v: string) => void;
    setQuery: (v: string) => void;
    setSelectedLocation: (s: TStore) => void;
};

const FindStoreContext = createContext<FindStoreContextType | null>(null);

function getDistanceInKm(from: LatLngLiteral, to: LatLngLiteral): number {
    const R = 6371;
    const dLat = (to.lat - from.lat) * (Math.PI / 180);
    const dLon = (to.lng - from.lng) * (Math.PI / 180);

    const lat1 = from.lat * (Math.PI / 180);
    const lat2 = to.lat * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export function FindStoreProvider({ children }: PropsWithChildren) {
    const [distance, setDistance] = useState('');
    const [resultsAmount, setResultsAmount] = useState('');
    const [query, setQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<
        TStore | undefined
    >();

    const userLocation = useUserLocation();

    const filteredStores = useMemo(() => {
        let filtered = storeData;

        if (query?.trim()) {
            const search = query.trim().toLowerCase();
            filtered = filtered?.filter((store) => {
                return (
                    store.post_code?.toLowerCase().includes(search) ||
                    store.city?.toLowerCase().includes(search) ||
                    store.county?.toLowerCase().includes(search)
                );
            });
        }

        if (distance && userLocation) {
            const maxDistanceKm = parseInt(distance) * 1.60934;

            filtered = filtered?.filter((store) => {
                if (!store.latitude || !store.longitude) return false;
                const dist = getDistanceInKm(
                    { lat: userLocation.latitude, lng: userLocation.longitude },
                    { lat: store.latitude, lng: store.longitude }
                );
                return dist <= maxDistanceKm;
            });
        }

        if (resultsAmount) {
            filtered = filtered?.slice(0, parseInt(resultsAmount));
        }

        return filtered;
    }, [distance, resultsAmount, query, userLocation]);

    const value: FindStoreContextType = {
        stores: filteredStores || [],
        distance,
        resultsAmount,
        query,
        selectedLocation,
        setDistance: (v: string) => setDistance(v),
        setResultsAmount: (v: string) => setResultsAmount(v),
        setQuery: (v: string) => setQuery(v),
        setSelectedLocation: (s: TStore) => setSelectedLocation(s),
    };

    return (
        <FindStoreContext.Provider value={value}>
            {children}
        </FindStoreContext.Provider>
    );
}

export function useFindStore() {
    const findStoreContext = useContext(FindStoreContext);
    if (!findStoreContext) {
        throw new Error('useFindStore must be used within a FindStoreProvider');
    }
    return findStoreContext;
}
