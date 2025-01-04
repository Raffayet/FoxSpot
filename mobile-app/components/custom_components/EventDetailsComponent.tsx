import {Animated, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {getEventTypeDetails} from "@/util/eventTypes";
import {FontAwesome} from "@expo/vector-icons";
import React, {useRef} from "react";
import {EventService} from "@/service/event.service";
import { Event } from "@/model/event";
import {ScaledSheet} from "react-native-size-matters";

interface Props {
    selectedEvent: Event
    popupAnim: Animated.Value;
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
    const openPopup = () => {
        Animated.timing(props.popupAnim, {
            toValue: 0, // Fully visible
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const closePopup = () => {
        Animated.timing(props.popupAnim, {
            toValue: 300, // Fully hidden
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            props.handleClosePopup();
        });
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

const styles = ScaledSheet.create({
    popup: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopLeftRadius: '25@s',
        borderTopRightRadius: '25@s',
        paddingHorizontal: '20@s',
        paddingVertical: '20@vs',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: '4@vs' },
        shadowOpacity: 0.25,
        shadowRadius: '4@s',
        elevation: 5,
    },
    popupImage: {
        height: '250@vs',
        borderTopLeftRadius: '25@s',
        borderTopRightRadius: '25@s',
        overflow: "hidden",
        marginBottom: '100@vs',
    },
    popupButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: '20@s',
        marginTop: '10@vs',
        bottom: '90@vs',
    },
    popupTitle: {
        fontSize: '19@s',
        fontWeight: "bold",
        color: "#ffffff",
        marginTop: '12@vs',
    },
    popupDescription: {
        fontSize: '16@s',
        color: "#ffffff",
        marginBottom: '10@vs',
    },
    popupDetails: {
        fontSize: '14@s',
        color: "#ffffff",
        marginBottom: '35@vs',
    },
    saveButton: {
        backgroundColor: "#32CD32",
        borderRadius: '15@s',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        alignSelf: "center",
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#FF6347",
        borderRadius: '15@s',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "#007BFF",
        borderRadius: '15@s',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: '10@vs',
        justifyContent: "center",

    },
    tag: {
        backgroundColor: "#007BFF",
        borderRadius: '15@s',
        paddingHorizontal: '10@s',
        paddingVertical: '5@vs',
        margin: '5@s',
        alignItems: "center",

    },
    tagText: {
        color: "white",
        fontSize: '12@s'
    },
    tagWithIcon: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: '20@s',
        paddingHorizontal: '12@s',
        paddingVertical: '6@vs',
        marginHorizontal: '5@s',
        backgroundColor: "#FF5733",
        elevation: 3,
        marginRight: "auto",
        bottom : '20@vs',
    },
    tagIcon: {
        marginRight: '8@s',
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        padding: '15@s',
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
});