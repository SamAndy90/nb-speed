import { useMemo } from 'react';
import useGeolocation from 'react-hook-geolocation';

export function useUserLocation() {
    const geolocation = useGeolocation({
        enableHighAccuracy: false,
        maximumAge: 1000 * 60 * 5,
    });

    return useMemo(() => {
        if (geolocation.latitude && geolocation.longitude) {
            return {
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
            } as const;
        }

        return null;
    }, [geolocation.latitude, geolocation.longitude]);
}
