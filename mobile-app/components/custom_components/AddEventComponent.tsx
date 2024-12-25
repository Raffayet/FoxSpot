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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {ScaledSheet} from "react-native-size-matters";


interface Props {
    modalVisible: boolean
    setEvents: (update: Event[] | ((prevEvents: Event[]) => Event[])) => void;
    setModalVisible: (visible: boolean) => void
}

export default function AddEventComponent(props: Props) {
    const [newEvent, setNewEvent] = useState<Event>({
        address: "",
        description: "",
        city: "",
        eventType: "",
        image: "",
        tags: [],
    });

    const [startDatePickerVisible, setStartDatePickerVisible] = useState<boolean>()
    const [endDatePickerVisible, setEndDatePickerVisible] = useState<boolean>()

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
            setNewEvent({ ...newEvent, image: result.assets[0].uri });
        }
    };

    const handleAddMarker = async () => {
        if (
            !newEvent.address ||
            !newEvent.description ||
            !newEvent.city ||
            !newEvent.eventType ||
            !newEvent.startTime ||
            !newEvent.endTime
        ) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        try {
            const fullAddress = `${newEvent.address}, ${newEvent.city}`;
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: { q: fullAddress, format: "json" },
                headers: { "User-Agent": "YourAppName/1.0 (your-email@example.com)" },
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const { icon, tags, color } = getEventTypeDetails(newEvent.eventType);

                // Explicitly include the `address` field
                const eventToCreate: Event = {
                    name: newEvent.address,
                    address: fullAddress, // Ensure address is included
                    city: newEvent.city,
                    eventType: newEvent.eventType,
                    description: newEvent.description,
                    image: newEvent.image,
                    tags,
                    location: { lat: parseFloat(lat), long: parseFloat(lon) },

                    startTime: newEvent.startTime,
                    endTime: newEvent.endTime,
                };

                const savedEvent = await EventService.createEvent(eventToCreate);
                props.setEvents((prevEvents: Event[]) => [...prevEvents, savedEvent]);

                props.setModalVisible(false);
                setNewEvent({ address: "", description: "", city: "", eventType: "", image: "", tags: [] });
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
                            value={newEvent.address}
                            onChangeText={(text) => setNewEvent({ ...newEvent, address: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="City"
                            value={newEvent.city}
                            onChangeText={(text) => setNewEvent({ ...newEvent, city: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Type of Event"
                            value={newEvent.eventType}
                            onChangeText={(text) => setNewEvent({ ...newEvent, eventType: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Description"
                            value={newEvent.description}
                            onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                            style={styles.input}
                            multiline
                        />
                        <TouchableOpacity onPress={() => setStartDatePickerVisible(true)} style={styles.input}>
                            <Text>{newEvent.startTime ? newEvent.startTime : "Pick Start Date & Time"}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={startDatePickerVisible}
                            mode="datetime"
                            onConfirm={(datetime) => {
                                // Converting to UTC format before sending to API
                                setNewEvent({ ...newEvent, startTime: datetime.toISOString() });
                                setStartDatePickerVisible(false);
                            }}
                            onCancel={() => setStartDatePickerVisible(false)}
                        />

                        <TouchableOpacity onPress={() => setEndDatePickerVisible(true)} style={styles.input}>
                            <Text>{newEvent.endTime ? newEvent.endTime : "Pick End Date & Time"}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={endDatePickerVisible}
                            mode="datetime"
                            onConfirm={(datetime) => {
                                // Converting to UTC format before sending to API
                                setNewEvent({ ...newEvent, endTime: datetime.toISOString() });
                                setEndDatePickerVisible(false);
                            }}
                            onCancel={() => setEndDatePickerVisible(false)}
                        />
                        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
                            <Text style={styles.imageButtonText}>
                                {newEvent.image ? "Change Image" : "Select Image"}
                            </Text>
                        </TouchableOpacity>
                        {newEvent.image && (
                            <Image source={{ uri: newEvent.image }} style={styles.previewImage} />
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

const styles = ScaledSheet.create({
    fullscreenModalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
    },
    fullscreenModalContent: {
        flex: 0,
        backgroundColor: "white",
        borderRadius: '10@s', // Scaled border radius
        margin: '20@s', // Scaled margin
        padding: '20@s', // Scaled padding
    },
    modalTitle: {
        fontSize: '22@s', // Scaled font size
        fontWeight: "bold",
        marginBottom: '15@vs', // Scaled vertical margin
        textAlign: "center",
    },
    scrollContent: {
        flexGrow: 1
    },
    modalButton: {
        flex: 1,
        paddingVertical: '12@vs', // Scaled vertical padding
        marginHorizontal: '5@s', // Scaled horizontal margin
        borderRadius: '5@s', // Scaled border radius
        alignItems: "center",
    },
    addButtonInModal: {
        backgroundColor: "#32CD32"
    },
    modalButtonText: {
        color: "white",
        fontSize: '16@s', // Scaled font size
        fontWeight: "bold"
    },
    cancelButton: {
        backgroundColor: "#FF6347"
    },
    input: {
        width: "100%",
        height: '45@vs', // Scaled height
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: '5@s', // Scaled border radius
        padding: '10@s', // Scaled padding
        marginBottom: '15@vs', // Scaled vertical margin
    },
    fullscreenModalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    previewImage: {
        width: "100%",
        height: '150@vs', // Scaled height
        borderRadius: '5@s', // Scaled border radius
        marginBottom: '20@vs', // Scaled vertical margin
    },
    imageButton: {
        backgroundColor: "#007BFF",
        paddingVertical: '12@vs', // Scaled vertical padding
        borderRadius: '5@s', // Scaled border radius
        marginBottom: '20@vs', // Scaled vertical margin
        alignItems: "center",
    },
    imageButtonText: {
        color: "white",
        fontSize: '16@s', // Scaled font size
    },
});
