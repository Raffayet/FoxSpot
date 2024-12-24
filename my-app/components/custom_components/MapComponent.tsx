import { AppEvent } from "@/model/event";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export interface Props {
    events: AppEvent[];
    onMarkerPress: (event: AppEvent) => void;
}

export default function MapComponent({ events, onMarkerPress }: Props) {
    if (events.length === 0) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 45.2671,
                longitude: 19.8335,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {events.map((event) => (
                <Marker
                    key={event.id}
                    coordinate={{
                        latitude: event.location.lat,
                        longitude: event.location.long,
                    }}
                    title={event.name}
                    onPress={() => onMarkerPress(event)}
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: { flex: 1 },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
});
