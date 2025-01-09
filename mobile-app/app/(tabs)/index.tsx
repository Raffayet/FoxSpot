import React, { useState, useRef, useEffect } from "react";
import {
    Animated,
    TouchableOpacity,
    View,
    TextInput,
    Text, FlatList,
    Easing
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
import Icon from "react-native-vector-icons/FontAwesome";
import { useDebounce } from "@/hooks/useDebounce";
import { Point } from "@/model/point"
import MapService from "@/service/map.service";
import {useMap} from "@/hooks/MapContext";

export default function App() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const popupAnim = useRef(new Animated.Value(300)).current; // Initial position (offscreen)
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity
    const [activeFilter, setActiveFilter] = useState(null);

    // Search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Event[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce for 500ms

    const { mapRef } = useMap();

    const { refetch, isLoading, isError, data } = useQuery({
        queryKey: ["events"],
        queryFn: EventService.getAllEvents,
        refetchInterval: 5000, // Automatically fetch data every 5 seconds
    });

    const applyFilter = (eventType: string | null, eventsList: Event[]) => {
        if (!eventType) {
            return eventsList; // Return all events if no filter is applied
        }
        return eventsList.filter((event) => event.eventType === eventType);
    };

    useEffect(() => {
        if (data) {
            setEvents(data as Event[]);
            setFilteredEvents(data as Event[]);
        }
    }, [data]);

    useEffect(() => {
        const filteredData = applyFilter(activeFilter, events);
        setFilteredEvents(filteredData);
    }, [events, activeFilter, searchQuery]);

    useEffect(() => {
        if (debouncedSearchQuery.trim()) {
            handleSearch(debouncedSearchQuery);
        } else {
            setSearchResults([]); // Clear results if query is empty
        }
    }, [debouncedSearchQuery]);

    const handleFilterSelect = (eventType: string | null) => {
        setActiveFilter(eventType);
    };

    const handleMarkerPress = (event: Event) => {
        setSelectedEvent({
            ...event,
            tags: event.tags || [],
        });
        setPopupVisible(true);

        Animated.parallel([
            Animated.timing(popupAnim, {
                toValue: 0, // Slide to fully visible
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1, // Fade in
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleSearch = async (query: string) => {
        setIsSearching(true);
        try {
            const results = await EventService.searchEvents(query);
            setSearchResults(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleClosePopup = () => {
        Animated.parallel([
            Animated.timing(popupAnim, {
                toValue:200, // Slide back offscreen
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0, // Fade out
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setPopupVisible(false); // Ensure popup is hidden
        });
    };

    const zoomLocation = (lat: string, long: string) => {
        mapRef?.current?.animateToRegion({
            latitude: parseFloat(lat),
            longitude: parseFloat(long),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        setSearchResults([]); // Close search results
    }

    const renderSearchResult = ({ item }: { item: Event }) => (
        <TouchableOpacity style={styles.resultItem} onPress={() => zoomLocation(item.location?.lat.toString() as string, item.location?.long.toString() as string)}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultDescription}>{item.address}</Text>
            <Text style={styles.resultDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Map Component */}
            <MapComponent
                events={filteredEvents}
                onMarkerPress={handleMarkerPress}
                mapRef={mapRef}
            />

            {/* Search Bar with Location-Arrow Button */}
            <View style={styles.searchContainer}>
                <Icon name="map-marker" size={20} color="#888" style={styles.mapIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search events..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.arrowButton} onPress={handleSearch}>
                    <Icon name="search" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Search Results List */}
            {searchResults.length > 0 && (
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id.toString()} // Assuming events have an 'id' field
                        renderItem={renderSearchResult}
                    />
                </View>
            )}

            {/* Filter Buttons */}
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
                <Animated.View
                    style={[
                        styles.eventDetailsOverlay,
                        { opacity: fadeAnim, transform: [{ translateY: popupAnim }] },
                    ]}
                >
                    <EventDetailsComponent
                        selectedEvent={selectedEvent}
                        popupAnim={popupAnim}
                        setEvents={setEvents}
                        setSelectedEvent={setSelectedEvent}
                        setPopupVisible={setPopupVisible}
                        handleClosePopup={handleClosePopup}
                    />
                </Animated.View>
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    searchContainer: {
        position: "absolute",
        top: "40@s",
        left: "10@s",
        right: "10@s",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "20@s",
        paddingHorizontal: "10@s",
        paddingVertical: "5@s",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: "5@s",
        zIndex: 1000, // Ensure it appears above the map
    },
    mapIcon: {
        marginRight: "10@s",
    },
    searchInput: {
        flex: 1,
        fontSize: "14@s",
        color: "#333",
        paddingHorizontal: "10@s",
    },
    arrowButton: {
        backgroundColor: "#FFA000",
        borderRadius: "50@s",
        width: "36@s",
        height: "36@s",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10@s",
    },
    addButton: {
        position: "absolute",
        bottom: "95@vs",
        backgroundColor: "#FFA000",
        padding: "15@s",
        borderRadius: "50@s",
        elevation: 5,
        alignSelf: "center",
        zIndex: 10, // Ensure it fully overlays everything else
    },
    addButtonText: {
        color: "white",
        fontSize: "16@s",
        fontWeight: "bold",
    },
    resultsContainer: {
        marginTop: '40@s',
        position: "absolute",
        top: 60,
        left: 10,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        zIndex: 2
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    resultName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    resultDescription: {
        fontSize: 14,
        color: "#555",
    },
});
