import {Animated, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {getEventTypeDetails} from "@/util/eventTypes";
import {FontAwesome} from "@expo/vector-icons";
import React, {useRef} from "react";
import {EventService} from "@/service/event.service";
import { Event } from "@/model/event";

interface Props {
    selectedEvent: Event
    popupAnim: Animated.Value
    setEvents: (update: Event[] | ((prevEvents: Event[]) => Event[])) => void;
    setPopupVisible: (visible: boolean) => void
    setSelectedEvent: (event: Event) => void
    handleClosePopup: () => void
}

export default function EventDetailsComponent(props: Props) {
    const handleDeleteEvent = async () => {
        if (!props.selectedEvent) return;

        try {
            await EventService.deleteEvent(props.selectedEvent.id); // Assuming `id` is the unique identifier
            props.setEvents((prevEvents: Event[]) => prevEvents.filter((event: Event) => event.id !== props.selectedEvent.id));
            alert("Event deleted successfully!");
            props.setPopupVisible(false);
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event. Please try again.");
        }
    };

    const handleSaveChanges = async () => {
        if (!props.selectedEvent) return;

        try {
            // Perform PUT request with the updated `selectedMarker`
            await EventService.updateEvent(props.selectedEvent.id, props.selectedEvent);

            // Update the state to reflect changes without creating new objects
            props.setEvents((prevEvents: Event[]) =>
                prevEvents.map((event) =>
                    event.id === props.selectedEvent.id ? { ...event, ...props.selectedEvent } : event
                )
            );

            alert("Event updated successfully!");
            props.setPopupVisible(false);

        } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update event. Please try again.");
        }
    };

    return(
        <Animated.View style={[styles.popup, { transform: [{ translateY: props.popupAnim }] }]}>
            <ImageBackground source={{ uri: props.selectedEvent.image }} style={styles.popupImage}>
                <View style={styles.overlay}>
                    <TextInput
                        style={styles.popupTitle}
                        value={props.selectedEvent.name || ""}
                        onChangeText={(text) => props.setSelectedEvent({ ...props.selectedEvent, name: text })}
                        placeholder="Event Name"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                    <TextInput
                        style={styles.popupDescription}
                        value={props.selectedEvent.description}
                        onChangeText={(text) => props.setSelectedEvent({ ...props.selectedEvent, description: text })}
                        placeholder="Event Description"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        multiline
                    />

                    <TextInput
                        style={styles.popupDetails}
                        value={props.selectedEvent.city}
                        onChangeText={(text) => props.setSelectedEvent({ ...props.selectedEvent, city: text })}
                        placeholder="City"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                    {(() => {
                        const { icon, tags, color } = getEventTypeDetails(props.selectedEvent?.eventType || "");
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
                {Array.isArray(props.selectedEvent?.tags) &&
                    props.selectedEvent.tags.map((tag: string, index: number) => (
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
                <TouchableOpacity style={styles.closeButton} onPress={props.handleClosePopup}>
                    <Text style={styles.closeButtonText}>CLOSE</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
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
    popupButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
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
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 15,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
})
