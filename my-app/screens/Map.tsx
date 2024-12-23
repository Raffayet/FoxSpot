import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [markers, setMarkers] = useState<any[]>([]);
    const [newMarker, setNewMarker] = useState({
        title: "",
        description: "",
        latitude: 45.2671,
        longitude: 19.8335,
    });

    const handleAddMarker = () => {
        if (!newMarker.title || !newMarker.description) {
            alert("Please fill in all fields.");
            return;
        }
        setMarkers([...markers, newMarker]);
        setModalVisible(false);
        setNewMarker({ title: "", description: "", latitude: 45.2671, longitude: 19.8335 });
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 45.2671,
                    longitude: 19.8335,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Add Marker</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newMarker.title}
                            onChangeText={(text) => setNewMarker({ ...newMarker, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={newMarker.description}
                            onChangeText={(text) =>
                                setNewMarker({ ...newMarker, description: text })
                            }
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleAddMarker}
                        >
                            <Text style={styles.modalButtonText}>Add Marker</Text>
                        </TouchableOpacity>
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
    map: {
        flex: 1,
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 50,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: "#32CD32",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
