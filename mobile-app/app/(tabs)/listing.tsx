import React, { useEffect, useRef, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/service/event.service";
import { FontAwesome } from "@expo/vector-icons";
import { getEventTypeDetails } from "@/util/eventTypes";
import { useMap } from "@/hooks/MapContext";
import { useRouter } from "expo-router";
import SearchBar from "@/components/custom_components/SearchBar";
import {useDebounce} from "@/hooks/useDebounce";

export default function ListingPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();
    const { mapRef } = useMap();

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce for 500ms

    const { refetch: refetchEvents, isLoading: isLoadingEvents, isError: isErrorEvents, data: eventData } = useQuery<Event[]>({
        queryKey: ["event-listing"],
        queryFn: EventService.searchEvents(debouncedSearchQuery),
        refetchInterval: 5000,
    });

    useEffect(() => {
        if (eventData) {
            setEvents(eventData);
        }
    }, [eventData]);

    useEffect(() => {
        handleSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    const handleSearch = async (query: string) => {
        try {
            const results = await EventService.searchEvents(query);
            setEvents(results as Event[]);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const zoomLocation = (lat: string, long: string) => {
        router.push("/(tabs)/");
        setTimeout(() => {
            if (mapRef?.current) {
                mapRef.current.animateToRegion({
                    latitude: parseFloat(lat),
                    longitude: parseFloat(long),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } else {
                console.error("mapRef is not available");
            }
        }, 500);
    };

    const renderEvent = ({ item }) => (
        <ImageBackground
            source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/033/350/925/small_2x/wallpaper-dark-urban-surface-background-ai-generated-photo.jpg" }}
            style={styles.backgroundImage}
            resizeMode="cover"
            imageStyle={{ borderRadius: 12 }}
        >
            <View style={styles.eventItem}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.eventTitle}>{item.name}</Text>
                        <Text style={styles.eventText}>{item.address}</Text>
                        <View style={styles.eventRow}>
                            <Text style={styles.eventText}>{item.eventType}</Text>
                            {(() => {
                                const { icon, color } = getEventTypeDetails(item.eventType || "");
                                return <FontAwesome name={icon} style={{ color, marginTop: 3, fontSize: 18 }} />;
                            })()}
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => zoomLocation(item.location?.lat.toString() as string, item.location?.long.toString() as string)}
                        >
                            <FontAwesome name="map-marker" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.buttonText}>Open</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Events</Text>

            {/* Search Bar */}
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
            />

            {events && events.length > 0 ? (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    renderItem={renderEvent}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noTransactions}>No events</Text>
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    backgroundImage: {
        flex: 1,
        marginVertical: 8,
        borderRadius: 12, // Ensures rounded corners for the image background
        overflow: 'hidden', // Required for borderRadius to apply to children
    },
    container: {
        flex: 1,
        backgroundColor: '#1e1e2f', // Dark background for a sleek look
        paddingHorizontal: '20@s',
        paddingTop: '20@s',
    },
    title: {
        fontSize: '24@s',
        fontFamily: 'Poppins-Bold, sans-serif',
        color: '#fff',
        textAlign: 'center',
        marginTop: '20@s',
        marginBottom: '20@s',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: '20@s',
    },
    noTransactions: {
        fontSize: '16@s',
        color: '#888',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventItem: {
        // backgroundColor: '#2a2a40',
        borderRadius: '10@s',
        padding: '15@s',
        marginBottom: '10@s',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: '5@s',
        shadowOffset: { width: 0, height: '2@s' },
        elevation: 3, // For Android shadow
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eventRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    eventTitle: {
        fontSize: '16@s',
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Poppins-Medium, sans-serif',
    },
    eventText: {
        marginRight: '5@s',
        fontSize: '12@s',
        color: 'white',
        fontFamily: 'Poppins-Bold, sans-serif',
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#2a2a40',
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        marginRight: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    markerContainer: {
        marginLeft: "auto",
        width: '20@s', // Scaled width
        height: '20@s',
        borderRadius: '3@s',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        color: '#333',
        fontSize: 14,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 16,
        marginRight: 8,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
});
