import React, { useState, useRef, useEffect } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { EventService } from "@/service/event.service";
import MapComponent from "@/components/custom_components/MapComponent";
import EventDetailsComponent from "@/components/custom_components/EventDetailsComponent";
import AddEventComponent from "@/components/custom_components/AddEventComponent";
import { Event } from "@/model/event";
import {Marker} from "@/model/marker";
import {ScaledSheet} from "react-native-size-matters";

export default function App() {
    const [events, setEvents] = useState<Event[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const popupAnim = useRef(new Animated.Value(300)).current; // Slide from bottom

    useEffect(() => {
        EventService.getAllEvents()
            .then((eventsData) => setEvents(eventsData))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    const handleMarkerPress = (event: Event) => {
        setSelectedEvent({
            ...event,
            tags: event.tags || [],
        });
        setPopupVisible(true);
        Animated.timing(popupAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    };

    const handleClosePopup = () => {
        Animated.timing(popupAnim, { toValue: 300, duration: 300, useNativeDriver: true }).start(() =>
            setPopupVisible(false)
        );
    };

    return (
        <View style={styles.container}>
            <MapComponent events={events} onMarkerPress={handleMarkerPress} />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>ADD EVENT</Text>
            </TouchableOpacity>

            {popupVisible && selectedEvent && (
                <EventDetailsComponent
                    selectedEvent={selectedEvent}
                    popupAnim={popupAnim}
                    setEvents={setEvents}
                    setSelectedEvent={setSelectedEvent}
                    setPopupVisible={setPopupVisible}
                    handleClosePopup={handleClosePopup}
                />
            )}
            <AddEventComponent
                modalVisible={modalVisible}
                setEvents={setEvents}
                setModalVisible={setModalVisible}
            />
        </View>
    );
}


const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        position: "absolute",
        bottom: '20@vs',
        right: '20@s',
        backgroundColor: "#007BFF",
        padding: '15@s',
        borderRadius: '50@s',
        elevation: 5,
    },
    addButtonText: {
        color: "white",
        fontSize: '16@s',
        fontWeight: "bold"
    },
    tagContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: '10@vs',
    },
});

