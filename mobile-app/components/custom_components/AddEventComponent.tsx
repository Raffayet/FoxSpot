import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {getEventTypeDetails} from "@/util/eventTypes";
import {EventService} from "@/service/event.service";
import { Event } from "@/model/event";
import {Marker} from "@/model/marker";

interface Props {
    modalVisible: boolean
    setEvents: (update: Event[] | ((prevEvents: Event[]) => Event[])) => void;
    setModalVisible: (visible: boolean) => void
}

export default function AddEventComponent(props: Props) {
    const [newMarker, setNewMarker] = useState<Marker>({
        address: "",
        description: "",
        city: "",
        eventType: "",
        image: "",
        tags: [],
    });

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access the media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setNewMarker({ ...newMarker, image: result.assets[0].uri });
        }
    };

    const handleAddMarker = async () => {
        if (
            !newMarker.address ||
            !newMarker.description ||
            !newMarker.city ||
            !newMarker.eventType ||
            !newMarker.image
        ) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        try {
            const fullAddress = `${newMarker.address}, ${newMarker.city}`;
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: { q: fullAddress, format: "json" },
                headers: { "User-Agent": "YourAppName/1.0 (your-email@example.com)" },
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const { icon, tags, color } = getEventTypeDetails(newMarker.eventType);

                // Explicitly include the `address` field
                const markerWithCoordinates = {
                    name: newMarker.address,
                    address: fullAddress, // Ensure address is included
                    city: newMarker.city,
                    eventType: newMarker.eventType,
                    description: newMarker.description,
                    image: newMarker.image,
                    tags,
                    location: { lat: parseFloat(lat), long: parseFloat(lon) },
                };

                const savedEvent = await EventService.createEvent(markerWithCoordinates);
                props.setEvents((prevEvents: Event[]) => [...prevEvents, savedEvent]);

                props.setModalVisible(false);
                setNewMarker({ address: "", description: "", city: "", eventType: "", image: "", tags: [] });
            } else {
                alert("Address not found.");
            }
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Error saving event. Please try again.");
        }
    };

    return(
        <Modal visible={props.modalVisible} animationType="slide" transparent={true}>
            <KeyboardAvoidingView
                style={styles.fullscreenModalContainer}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.fullscreenModalContent}>
                        <Text style={styles.modalTitle}>Add Event</Text>
                        <TextInput
                            placeholder="Address"
                            value={newMarker.address}
                            onChangeText={(text) => setNewMarker({ ...newMarker, address: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="City"
                            value={newMarker.city}
                            onChangeText={(text) => setNewMarker({ ...newMarker, city: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Type of Event"
                            value={newMarker.eventType}
                            onChangeText={(text) => setNewMarker({ ...newMarker, eventType: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Description"
                            value={newMarker.description}
                            onChangeText={(text) => setNewMarker({ ...newMarker, description: text })}
                            style={styles.input}
                            multiline
                        />
                        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
                            <Text style={styles.imageButtonText}>
                                {newMarker.image ? "Change Image" : "Select Image"}
                            </Text>
                        </TouchableOpacity>
                        {newMarker.image && (
                            <Image source={{ uri: newMarker.image }} style={styles.previewImage} />
                        )}
                        <View style={styles.fullscreenModalButtonRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => props.setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.addButtonInModal]}
                                onPress={handleAddMarker}
                            >
                                <Text style={styles.modalButtonText}>ADD EVENT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    fullscreenModalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
    },
    fullscreenModalContent: {
        flex: 0,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 20,
        padding: 20,
        marginTop: 200
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    scrollContent: { flexGrow: 1 },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    addButtonInModal: { backgroundColor: "#32CD32" },
    modalButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    cancelButton: { backgroundColor: "#FF6347" },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    fullscreenModalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    previewImage: {
        width: "100%",
        height: 150,
        borderRadius: 5,
        marginBottom: 20,
    },
    imageButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center",
    },
    imageButtonText: { color: "white", fontSize: 16 },
})
