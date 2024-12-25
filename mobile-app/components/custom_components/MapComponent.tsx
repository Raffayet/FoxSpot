import React from "react";
import MapView, { Marker as MapMarker, MapViewProps } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Event } from "@/model/event";
import {getEventTypeDetails} from "@/util/eventTypes";

export interface Props extends MapViewProps {
    events: Event[];
    onMarkerPress: (event: Event) => void;
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
                <CustomMarker
                    key={event.id}
                    event={event}
                    onPress={() => onMarkerPress(event)}
                />
            ))}
        </MapView>
    );
}

const CustomMarker = ({ event, onPress }: { event: Event; onPress: () => void }) => {
    const { icon, tags, color } = getEventTypeDetails(event.eventType);

    return (
        <MapMarker
            coordinate={{
                latitude: event.location.lat,
                longitude: event.location.long,
            }}
            onPress={onPress}
        >
            <View style={[styles.markerContainer, { backgroundColor: color }]}>
                <FontAwesome name={icon} size={12} color="#FFF" />
            </View>
            <View style={[styles.markerPointer, { borderTopColor: color }]} />
        </MapMarker>
    );
};

const styles = StyleSheet.create({
    map: { flex: 1 },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    markerContainer: {
        width: 25,
        height: 25,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    markerPointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderTopWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        alignSelf: "center",
        bottom:2
    },
});
