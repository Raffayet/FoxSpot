import React, { useState, useRef, useEffect } from "react";
import {
    Animated,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { EventService } from "@/service/event.service";
import MapComponent from "@/components/custom_components/MapComponent";
import { FontAwesome } from "@expo/vector-icons";
import {getEventTypeDetails} from "@/util/eventTypes";

export default function App() {
    const [events, setEvents] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const popupAnim = useRef(new Animated.Value(300)).current; // Slide from bottom
    const [newMarker, setNewMarker] = useState({
        title: "",
        description: "",
        city: "",
        eventType: "",
        image: "",
        tags: [],
    });

    useEffect(() => {
        EventService.getAllEvents()
            .then((eventsData) => setEvents(eventsData))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

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
            !newMarker.title ||
            !newMarker.description ||
            !newMarker.city ||
            !newMarker.eventType ||
            !newMarker.image
        ) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        try {
            const fullAddress = `${newMarker.title}, ${newMarker.city}`;
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: { q: fullAddress, format: "json" },
                headers: { "User-Agent": "YourAppName/1.0 (your-email@example.com)" },
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const { icon, tags, color } = getEventTypeDetails(newMarker.eventType);

                // Explicitly include the `address` field
                const markerWithCoordinates = {
                    name: newMarker.title,
                    address: fullAddress, // Ensure address is included
                    city: newMarker.city,
                    eventType: newMarker.eventType,
                    description: newMarker.description,
                    image: newMarker.image,
                    tags,
                    location: { lat: parseFloat(lat), long: parseFloat(lon) },
                };

                const savedEvent = await EventService.createEvent(markerWithCoordinates);
                setEvents((prevEvents) => [...prevEvents, savedEvent]);

                setModalVisible(false);
                setNewMarker({ title: "", description: "", city: "", eventType: "", image: "", tags: [] });
            } else {
                alert("Address not found.");
            }
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Error saving event. Please try again.");
        }
    };


    const handleMarkerPress = (event: any) => {
        setSelectedMarker({
            ...event,
            tags: event.tags || [], // Ensure tags is always an array
        });
        setPopupVisible(true);
        Animated.timing(popupAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    };


    const handleClosePopup = () => {
        Animated.timing(popupAnim, { toValue: 300, duration: 300, useNativeDriver: true }).start(() =>
            setPopupVisible(false)
        );
    };

    const handleDeleteEvent = async () => {
        if (!selectedMarker) return;

        try {
            await EventService.deleteEvent(selectedMarker.id); // Assuming `id` is the unique identifier
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedMarker.id));
            alert("Event deleted successfully!");
            setPopupVisible(false);
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event. Please try again.");
        }
    };

    const handleSaveChanges = async () => {
        if (!selectedMarker) return;

        try {
            // Perform PUT request with the updated `selectedMarker`
            await EventService.updateEvent(selectedMarker.id, selectedMarker);

            // Update the state to reflect changes without creating new objects
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === selectedMarker.id ? { ...event, ...selectedMarker } : event
                )
            );

            alert("Event updated successfully!");
            setPopupVisible(false);

        } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update event. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <MapComponent events={events} onMarkerPress={handleMarkerPress} />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>ADD EVENT</Text>
            </TouchableOpacity>

            {popupVisible && selectedMarker && (
                <Animated.View style={[styles.popup, { transform: [{ translateY: popupAnim }] }]}>
                    <ImageBackground source={{ uri: selectedMarker.image }} style={styles.popupImage}>
                        <View style={styles.overlay}>
                            <TextInput
                                style={styles.popupTitle}
                                value={selectedMarker.name}
                                onChangeText={(text) => setSelectedMarker({ ...selectedMarker, name: text })}
                                placeholder="Event Name"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                            />
                            <TextInput
                                style={styles.popupDescription}
                                value={selectedMarker.description}
                                onChangeText={(text) => setSelectedMarker({ ...selectedMarker, description: text })}
                                placeholder="Event Description"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                multiline
                            />

                            <TextInput
                                style={styles.popupDetails}
                                value={selectedMarker.city}
                                onChangeText={(text) => setSelectedMarker({ ...selectedMarker, city: text })}
                                placeholder="City"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                            />
                            {(() => {
                                const { icon, tags, color } = getEventTypeDetails(selectedMarker.eventType);
                                return (
                                    <View style={[styles.tagWithIcon, { backgroundColor: color }]}>
                                        <FontAwesome name={icon} size={16} color="#FFF" style={styles.tagIcon} />
                                        <Text style={styles.tagText}>{(tags as string[])[0]}</Text>
                                    </View>
                                );
                            })()}
                        </View>
                    </ImageBackground>
                    <View style={styles.tagsContainer}>
                        {Array.isArray(selectedMarker?.tags) &&
                            selectedMarker.tags.map((tag: string, index: number) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                    </View>
                    <View style={styles.popupButtons}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                            <Text style={styles.saveButtonText}>SAVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteEvent}>
                            <Text style={styles.deleteButtonText}>DELETE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={handleClosePopup}>
                            <Text style={styles.closeButtonText}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}


            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <KeyboardAvoidingView
                    style={styles.fullscreenModalContainer}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.fullscreenModalContent}>
                            <Text style={styles.modalTitle}>Add Event</Text>
                            <TextInput
                                placeholder="Title"
                                value={newMarker.title}
                                onChangeText={(text) => setNewMarker({ ...newMarker, title: text })}
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
                                    onPress={() => setModalVisible(false)}
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
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1 },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    },
    addButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    fullscreenModalContainer: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" },
    scrollContent: { flexGrow: 1 },
    fullscreenModalContent: {
        flex: 0,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 20,
        padding: 20,
        justifyContent: "center",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    imageButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center",
    },
    imageButtonText: { color: "white", fontSize: 16 },
    previewImage: {
        width: "100%",
        height: 150,
        borderRadius: 5,
        marginBottom: 20,
    },
    fullscreenModalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelButton: { backgroundColor: "#FF6347" },
    addButtonInModal: { backgroundColor: "#32CD32" },
    modalButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    popup: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    popupImage: {
        height: 200,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: "hidden",
        marginBottom: 10,
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 15,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    popupTitle: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#ffffff",
        marginTop: 12,
    },
    popupDescription: {
        fontSize: 16,
        color: "#ffffff",
        marginBottom: 10,
    },
    popupDetails: {
        fontSize: 14,
        color: "#ffffff",
        marginBottom: 5,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        justifyContent: "center",
    },
    tag: {
        backgroundColor: "#007BFF",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        alignItems: "center",
    },
    tagText: { color: "white", fontSize: 12 },
    popupButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: "#FF6347",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "#007BFF",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    tagContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    tagWithIcon: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginHorizontal: 5,
        backgroundColor: "#FF5733",
        elevation: 3,
        width: "35%",
    },
    tagIcon: {
        marginRight: 8,

    },
    saveButton: {
        backgroundColor: "#32CD32",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: "center",

    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

