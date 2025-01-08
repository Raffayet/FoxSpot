import { MutableRefObject, RefObject } from 'react';
import MapView from 'react-native-maps';

// Service to hold the shared MapView ref
const MapService = {
    mapRef: null as RefObject<MapView> | MutableRefObject<MapView | null> | null,
};

export default MapService;
