import React, { useState, useRef, useEffect } from "react";
import {
    Animated,
    TouchableOpacity,
    View,
    TextInput,
    Text, FlatList,
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

export default function App() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const popupAnim = useRef(new Animated.Value(300)).current;
    const [activeFilter, setActiveFilter] = useState(null);

    // Search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Event[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce for 500ms

    const mapRef = useRef<MapView>(null);

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
        Animated.timing(popupAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
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
        Animated.timing(popupAnim, { toValue: 300, duration: 300, useNativeDriver: true }).start(() =>
            setPopupVisible(false)
        );
    };

    const zoomLocation = (lat: string, long: string) => {
        mapRef?.current?.animateToRegion({
            latitude: parseFloat(lat),
            longitude: parseFloat(long),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
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
        backgroundColor: "#0066ff",
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
        backgroundColor: "#007BFF",
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
    eventDetailsOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        zIndex: 10, // Ensure it fully overlays everything else
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
