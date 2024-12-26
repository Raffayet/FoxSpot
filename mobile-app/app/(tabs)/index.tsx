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
import MapView from "react-native-maps";
import { useQuery } from "@tanstack/react-query";

export default function App() {
    const [events, setEvents] = useState<Event[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const popupAnim = useRef(new Animated.Value(300)).current; // Slide from bottom

    const mapRef = useRef<MapView>(null);

    const { refetch, isLoading, isError, data } = useQuery({
        queryKey: ['events'], // Must be unique per query
        queryFn: EventService.getAllEvents, // Ensure this is a working function
        refetchInterval: 5000,
    });

    useEffect(() => {
        if (data) {
            setEvents(data as Event[]);
        }
    }, [data]);

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
            <MapComponent
                events={events}
                onMarkerPress={handleMarkerPress}
                mapRef={mapRef}
            />

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
                mapRef={mapRef}
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
        backgroundColor: "#007BFF",
        padding: '15@s',
        borderRadius: '50@s',
        elevation: 5,
        alignSelf: "center"
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

