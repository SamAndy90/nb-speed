'use client';

import { memo } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    ZoomControl,
    Popup,
} from 'react-leaflet';
import { Icon, LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useFindStore } from './FindStoreProvider';
import GeoIcon from './static/icons/geo-default.png';
import ActiveGeoIcon from './static/icons/geo-active.png';
import Link from 'next/link';

const DEFAULT_MAP_POSITION = { lat: 51.50735, lng: -0.12776 };

const SelectedLocation = ({ center }: { center: LatLngLiteral }) => {
    const map = useMap();
    map.panTo(center, { animate: true });
    return null;
};

export const Map: React.FC = memo(() => {
    const { stores, selectedLocation, setSelectedLocation } = useFindStore();

    const mapMarkIcon = new Icon({
        iconUrl: GeoIcon.src,
        iconSize: [28, 28],
    });
    const mapMarkActiveIcon = new Icon({
        iconUrl: ActiveGeoIcon.src,
        iconSize: [28, 28],
    });

    const renderMarks = () => {
        return stores?.map((s) => (
            <div key={s.id}>
                <Marker
                    icon={
                        s.id === selectedLocation?.id
                            ? mapMarkActiveIcon
                            : mapMarkIcon
                    }
                    position={{
                        lat: s.latitude,
                        lng: s.longitude,
                    }}
                    eventHandlers={{
                        click: () => {
                            setSelectedLocation(s);
                        },
                    }}>
                    <Popup>
                        <div className={'flex flex-col gap-y-0.5'}>
                            <div>{s.post_code}</div>
                            <div>
                                {s.address_line_1}, {s.city}, {s.post_code}
                            </div>
                            {/* {s.phone && (
                                <Link
                                    href={`tel:${s.phone.replace(/\D/g, '')}`}
                                    className={'hover:underline'}>
                                    Tel: {s.phone}
                                </Link>
                            )} */}
                        </div>
                    </Popup>
                </Marker>
            </div>
        ));
    };

    return (
        <MapContainer
            center={DEFAULT_MAP_POSITION}
            zoom={13}
            minZoom={5}
            zoomControl={false}
            attributionControl={false}
            className={'h-auto w-full sm:h-full'}>
            <TileLayer
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                // url={'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'}
            />
            {selectedLocation && (
                <SelectedLocation
                    center={{
                        lat: selectedLocation.latitude,
                        lng: selectedLocation.longitude,
                    }}
                />
            )}
            {renderMarks()}
            <ZoomControl position="topright" />
        </MapContainer>
    );
});
