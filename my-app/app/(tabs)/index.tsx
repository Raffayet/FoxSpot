import React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";

export default function App() {
    if (Platform.OS === "web") {
        return (
            <View style={styles.container}>
                <Text>Maps are not supported on the web!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1,
        width: "100%",
    },
});
