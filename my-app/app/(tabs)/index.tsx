import React, {useState, useRef, useEffect} from "react";
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
import {EventService} from "@/service/event.service";
import {Event} from '@/model/event'
import Constants from "expo-constants/src/Constants";
import MapComponent from "@/components/custom_components/MapComponent";
import {useFonts} from "expo-font";


export default function App() {
    const [events, setEvents] = useState<any>([])
    const [markers, setMarkers] = useState<any[]>([]);
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
            .then((eventsData) => {
                setEvents(eventsData);
                console.log("Fetched Events:", eventsData);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Updated Events State:", events);
    }, [events]);

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
            setNewMarker({
                ...newMarker,
                image: result.assets[0].uri,
            });
        } else {
            alert("No image selected.");
        }
    };

    // const handleAddMarker = async () => {
    //     if (
    //         !newMarker.title ||
    //         !newMarker.description ||
    //         !newMarker.city ||
    //         !newMarker.eventType ||
    //         !newMarker.image
    //     ) {
    //         alert("Please fill in all fields and select an image.");
    //         return;
    //     }
    //
    //     try {
    //         const fullAddress = `${newMarker.title}, ${newMarker.city}`;
    //         const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
    //             params: {
    //                 q: fullAddress,
    //                 format: "json",
    //             },
    //             headers: {
    //                 "User-Agent": "YourAppName/1.0 (your-email@example.com)",
    //             },
    //         });
    //
    //         if (response.data.length > 0) {
    //             const { lat, lon } = response.data[0];
    //             const markerWithCoordinates = {
    //                 ...newMarker,
    //                 latitude: parseFloat(lat),
    //                 longitude: parseFloat(lon),
    //                 tags: newMarker.eventType === "Party" ? ["Music", "Dance"] : ["General"],
    //             };
    //
    //             setMarkers([...markers, markerWithCoordinates]);
    //             setModalVisible(false);
    //             setNewMarker({
    //                 title: "",
    //                 description: "",
    //                 city: "",
    //                 eventType: "",
    //                 image: "",
    //                 tags: [],
    //             });
    //         } else {
    //             alert("Address not found. Please try again with more details.");
    //         }
    //     } catch (error) {
    //         alert("Failed to geocode the address. Please check your internet connection.");
    //     }
    // };

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
                params: {
                    q: fullAddress,
                    format: "json",
                },
                headers: {
                    "User-Agent": "YourAppName/1.0 (your-email@example.com)",
                },
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];

                // Assign tags based on the event type
                let tags = [];
                switch (newMarker.eventType.toLowerCase()) {
                    case "party":
                        tags = ["Music", "Dance", "Fun"];
                        break;
                    case "culture":
                        tags = ["Art", "History", "Exhibition"];
                        break;
                    case "meeting":
                        tags = ["Business", "Networking", "Discussion"];
                        break;
                    case "work":
                        tags = ["Productivity", "Teamwork", "Focus"];
                        break;
                    case "dinner":
                        tags = ["Food", "Friends", "Relax"];
                        break;
                    case "exercise":
                        tags = ["Fitness", "Health", "Energy"];
                        break;
                    default:
                        tags = ["General"];
                }

                const markerWithCoordinates = {
                    name: newMarker.title, // Name
                    address: newMarker.title, // Address
                    city: newMarker.city, // City
                    eventType: newMarker.eventType, // Type of Event
                    description: newMarker.description, // Description
                    image: newMarker.image, // Image URL
                    tags, // Tags dynamically assigned
                    location: { lat: parseFloat(lat), long: parseFloat(lon) }, // Latitude and Longitude
                };

                // Save the event using EventService
                const savedEvent = await EventService.createEvent(markerWithCoordinates);

                // Update the events state directly to include the new event
                setEvents((prevEvents) => [...prevEvents, savedEvent]);

                setModalVisible(false);
                setNewMarker({
                    title: "",
                    description: "",
                    city: "",
                    eventType: "",
                    image: "",
                    tags: [],
                });
            } else {
                alert("Address not found. Please try again with more details.");
            }
        } catch (error) {
            console.error("Failed to save the event:", error);
            alert("Failed to save the event. Please check your internet connection.");
        }
    };




    const handleMarkerPress = (event: Event) => {
        setSelectedMarker(event);
        setPopupVisible(true);
        Animated.timing(popupAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleClosePopup = () => {
        Animated.timing(popupAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setPopupVisible(false));
    };

    return (
        <View style={styles.container}>
            <MapComponent events={events} onMarkerPress={handleMarkerPress} />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>ADD EVENT</Text>
            </TouchableOpacity>

            {popupVisible && selectedMarker && (
                <Animated.View
                    style={[styles.popup, { transform: [{ translateY: popupAnim }] }]}
                >
                    <ImageBackground
                        source={{ uri: selectedMarker.image }}
                        style={styles.popupImage}
                    >
                        <View style={styles.overlay}>
                            <Text style={styles.popupTitle}>{selectedMarker.name}</Text>
                            <Text style={styles.popupDescription}>
                                {selectedMarker.description}
                            </Text>
                            <Text style={styles.popupDetails}>
                                Event: {selectedMarker.eventType}
                            </Text>
                            <Text style={styles.popupDetails}>City: {selectedMarker.city}</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleClosePopup}
                            >
                                <Text style={styles.closeButtonText}>CLOSE</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
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
                                onChangeText={(text) =>
                                    setNewMarker({ ...newMarker, eventType: text })
                                }
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Description"
                                value={newMarker.description}
                                onChangeText={(text) =>
                                    setNewMarker({ ...newMarker, description: text })
                                }
                                style={styles.input}
                                multiline
                            />
                            <TouchableOpacity
                                style={styles.imageButton}
                                onPress={handleImagePick}
                            >
                                <Text style={styles.imageButtonText}>
                                    {newMarker.image ? "Change Image" : "Select Image"}
                                </Text>
                            </TouchableOpacity>
                            {newMarker.image && (
                                <Image
                                    source={{ uri: newMarker.image }}
                                    style={styles.previewImage}
                                />
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
    popupImage: {
        height: 200,
        justifyContent: "flex-end",
    },
    overlay: { padding: 33, backgroundColor: "rgba(0,0,0,0.5)" },
    popupTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
    popupDescription: { fontSize: 14, color: "white", marginBottom: 5 },
    popupDetails: { fontSize: 12, color: "white" },
    tagsContainer: { flexDirection: "row", marginTop: 10 },
    tag: {
        backgroundColor: "#007BFF",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
    },
    tagText: { color: "white", fontSize: 12 },
    closeButton: {
        backgroundColor: "#FF6347",
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 15,
        alignItems: "center",
    },
    closeButtonText: { color: "white", fontWeight: "bold" },
});

