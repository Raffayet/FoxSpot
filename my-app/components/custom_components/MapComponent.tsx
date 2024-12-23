import {Event} from "@/model/event";
import MapView, {Marker} from "react-native-maps";
import React from "react";
import {StyleSheet} from "react-native";

export interface Props {
    events: Event[]
}

export default function MapComponent(props: Props) {
    return(
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 45.2671,
                longitude: 19.8335,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {/*{markers.map((marker, index) => (*/}
            {/*    <Marker*/}
            {/*        key={index}*/}
            {/*        coordinate={{*/}
            {/*            latitude: marker.latitude,*/}
            {/*            longitude: marker.longitude,*/}
            {/*        }}*/}
            {/*        onPress={() => handleMarkerPress(marker)}*/}
            {/*    />*/}
            {/*))}*/}
            {props.events.length > 0 &&
                props.events?.map((event: Event) => (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: event.location.lat,
                            longitude: event.location.long,
                        }}
                        title={event.name}
                    />
                ))}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: { flex: 1 },
})
