import React from "react";
import MapView, { Marker as MapMarker, MapViewProps } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Event } from "@/model/event";
import {getEventTypeDetails} from "@/util/eventTypes";
import CustomMarker from "@/components/custom_components/CustomMarker";
import {ScaledSheet} from "react-native-size-matters";

export interface Props {
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

const styles = ScaledSheet.create({
    map: { flex: 1 },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
});
