import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, TextInput, Button, Modal, Alert } from "react-native";

export default function App() {
    const [markers, setMarkers] = useState([
        {
            id: "1",
            latitude: 45.250445,
            longitude: 19.830203,
            title: "Adija Endrea 33",
            description: "Novi Sad, Serbia",
        },
        {
            id: "2",
            latitude: 45.260100,
            longitude: 19.844500,
            title: "Bulevar Oslobođenja 34",
            description: "Novi Sad, Serbia",
        },
    ]);

    const [isModalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [eventType, setEventType] = useState("");

    const handleAddEvent = () => {
        setModalVisible(true);
    };

    const handleAddMarker = () => {
        // Simulate adding a marker with approximate latitude and longitude
        if (!address || !city || !eventType) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        const newMarker = {
            id: Date.now().toString(),
            latitude: markers[0].latitude + Math.random() * 0.01 - 0.005, // Randomize near existing markers
            longitude: markers[0].longitude + Math.random() * 0.01 - 0.005,
            title: `${address} (${eventType})`,
            description: city,
        };

        setMarkers([...markers, newMarker]);
        setModalVisible(false);
        setAddress("");
        setCity("");
        setEventType("");
    };

    return (
        <View style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitude: 45.250445,
                    longitude: 19.830203,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>

            {/* Add Event Button */}
            <View style={styles.buttonContainer}>
                <Button title="Add Event" onPress={handleAddEvent} />
            </View>

            {/* Modal for Adding Marker */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Event</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="City"
                            value={city}
                            onChangeText={setCity}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Type of Event"
                            value={eventType}
                            onChangeText={setEventType}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Add Marker" onPress={handleAddMarker} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
});
