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
import FilterButtonsComponent from "@/components/custom_components/FilterButtons"; // Import the filter buttons
import { Event } from "@/model/event";
import MapView from "react-native-maps";
import { useQuery } from "@tanstack/react-query";
import { ScaledSheet } from "react-native-size-matters";

export default function App() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const popupAnim = useRef(new Animated.Value(300)).current; // Slide from bottom
    const [activeFilter, setActiveFilter] = useState(null);

    const mapRef = useRef<MapView>(null);

    const { refetch, isLoading, isError, data } = useQuery({
        queryKey: ['events'], // Must be unique per query
        queryFn: EventService.getAllEvents, // Ensure this is a working function
        refetchInterval: 5000,

    });

    const applyFilter = (eventType, eventsList) => {
        if (!eventType) {
            return eventsList;
        }
        return eventsList.filter(event => event.eventType === eventType);
    };

    useEffect(() => {
        if (data) {
            setEvents(data as Event[]);
            setFilteredEvents(data as Event[]); // Initialize filtered events
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            setEvents(data as Event[]);
            // Apply current filter to new data
            const filteredData = applyFilter(activeFilter, data as Event[]);
            setFilteredEvents(filteredData);
        }
    }, [data, activeFilter]);

    const handleFilterSelect = (eventType) => {
        setActiveFilter(eventType);
        // No need to manually filter here as the useEffect will handle it
    };


    const handleMarkerPress = (event) => {
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
                events={filteredEvents}
                onMarkerPress={handleMarkerPress}
                mapRef={mapRef}
            />

            <FilterButtonsComponent
                onFilterSelect={handleFilterSelect}
                activeFilter={activeFilter}
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
});
