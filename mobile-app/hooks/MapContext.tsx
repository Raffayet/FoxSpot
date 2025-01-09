import React, { createContext, useRef, useContext } from "react";
import MapView from "react-native-maps";

type MapContextType = {
    mapRef: React.MutableRefObject<MapView | null>;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const mapRef = useRef<MapView | null>(null);

    return (
        <MapContext.Provider value={{ mapRef }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMap must be used within a MapProvider");
    }
    return context;
};
