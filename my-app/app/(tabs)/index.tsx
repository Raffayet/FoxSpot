import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

// Define types for react-leaflet components
let MapContainer: React.ComponentType<any> | null = null;
let TileLayer: React.ComponentType<any> | null = null;
let Marker: React.ComponentType<any> | null = null;
let Popup: React.ComponentType<any> | null = null;

if (Platform.OS === "web") {
    const ReactLeaflet = require("react-leaflet");
    MapContainer = ReactLeaflet.MapContainer;
    TileLayer = ReactLeaflet.TileLayer;
    Marker = ReactLeaflet.Marker;
    Popup = ReactLeaflet.Popup;
}

export default function App() {
    const [selectedMarkers, setSelectedMarkers] = useState<string[]>([]);

    // List of predefined markers (latitude, longitude, and address name)
    const markers = [
        { id: "1", lat: 45.2671, lng: 19.8335, address: "Novi Sad Center" },
        { id: "2", lat: 45.2600, lng: 19.8500, address: "Petrovaradin Fortress" },
        { id: "3", lat: 45.2510, lng: 19.8100, address: "Danube Park" },
    ];

    const handleMarkerSelect = (id: string) => {
        setSelectedMarkers((prev) =>
            prev.includes(id) ? prev.filter((markerId) => markerId !== id) : [...prev, id]
        );
    };

    if (Platform.OS === "web" && MapContainer && TileLayer && Marker && Popup) {
        return (
            <View style={styles.webContainer}>
                <MapContainer
                    center={[45.2671, 19.8335]} // Coordinates of Novi Sad
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={[marker.lat, marker.lng]}
                            eventHandlers={{
                                click: () => handleMarkerSelect(marker.id),
                            }}
                        >
                            <Popup>
                                {marker.address}
                                {selectedMarkers.includes(marker.id) && " ✅"}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </View>
        );
    }

    // Mobile implementation using react-native-maps
    const MapView = require("react-native-maps").default;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 45.2671,
                    longitude: 19.8335,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {markers.map((marker) => (
                    <MapView.Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                        onPress={() => handleMarkerSelect(marker.id)}
                        title={marker.address}
                        description={
                            selectedMarkers.includes(marker.id) ? "✅ Selected" : ""
                        }
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        width: "100%",
    },
    webContainer: {
        flex: 1,
        height: "100%", // Corrected from 100vh
        width: "100%",  // Corrected from 100vw
    },
});
