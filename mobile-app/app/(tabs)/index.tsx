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

function App() {
    const [events, setEvents] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const popupAnim = useRef(new Animated.Value(300)).current; // Slide from bottom

    useEffect(() => {
        EventService.getAllEvents()
            .then((eventsData) => setEvents(eventsData))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

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

    return (
        <View style={styles.container}>
            <MapComponent events={events} onMarkerPress={handleMarkerPress} />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>ADD EVENT</Text>
            </TouchableOpacity>

            {popupVisible && selectedMarker && (
                <EventDetailsComponent
                    selectedMarker={selectedMarker}
                    popupAnim={popupAnim}
                    setEvents={setEvents}
                    setSelectedMarker={setSelectedMarker}
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
    tagContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
});

