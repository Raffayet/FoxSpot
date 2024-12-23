import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitude: 45.250445, // Latitude for Adija Endrea 33, Novi Sad
                    longitude: 19.830203, // Longitude for Adija Endrea 33, Novi Sad
                    latitudeDelta: 0.01, // Zoom level for latitude
                    longitudeDelta: 0.01, // Zoom level for longitude
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 45.250445,
                        longitude: 19.830203,
                    }}
                    title="Adija Endrea 33"
                    description="Novi Sad, Serbia"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
