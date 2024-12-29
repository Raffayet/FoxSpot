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
import FilterButtonsComponent from "@/components/custom_components/FilterButtons";
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
    const popupAnim = useRef(new Animated.Value(300)).current;
    const [activeFilter, setActiveFilter] = useState(null);

    const mapRef = useRef<MapView>(null);

    const { refetch, isLoading, isError, data } = useQuery({
        queryKey: ['events'],
        queryFn: EventService.getAllEvents,
        refetchInterval: 5000,
    });

    const applyFilter = (eventType: null, eventsList: any[]) => {
        if (!eventType) {
            return eventsList;
        }
        return eventsList.filter((event: { eventType: any; }) => event.eventType === eventType);
    };

    useEffect(() => {
        if (data) {
            setEvents(data as Event[]);
            setFilteredEvents(data as Event[]);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            setEvents(data as Event[]);
            const filteredData = applyFilter(activeFilter, data as Event[]);
            setFilteredEvents(filteredData);
        }
    }, [data, activeFilter]);

    const handleFilterSelect = (eventType: React.SetStateAction<null>) => {
        setActiveFilter(eventType);
    };

    const handleMarkerPress = (event: React.SetStateAction<Event | null>) => {
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

            {/* Add Event Button */}
            {!popupVisible && (
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>ADD EVENT</Text>
                </TouchableOpacity>
            )}

            {/* Add Event Modal */}
            {!popupVisible && (
                <AddEventComponent
                    modalVisible={modalVisible}
                    setEvents={setEvents}
                    setModalVisible={setModalVisible}
                    mapRef={mapRef}
                />
            )}

            {/* Event Details Popup */}
            {popupVisible && selectedEvent && (
                <View style={styles.eventDetailsOverlay}>
                    <EventDetailsComponent
                        selectedEvent={selectedEvent}
                        popupAnim={popupAnim}
                        setEvents={setEvents}
                        setSelectedEvent={setSelectedEvent}
                        setPopupVisible={setPopupVisible}
                        handleClosePopup={handleClosePopup}
                    />
                </View>
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        position: "relative",

    },
    addButton: {
        position: "absolute",
        bottom: '95@vs',
        backgroundColor: "#007BFF",
        padding: '15@s',
        borderRadius: '50@s',
        elevation: 5,
        alignSelf: "center",
        zIndex: 10, // Ensure it fully overlays everything else
    },
    addButtonText: {
        color: "white",
        fontSize: '16@s',
        fontWeight: "bold",
    },
    eventDetailsOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        zIndex: 10, // Ensure it fully overlays everything else
    },
});
