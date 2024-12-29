import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Create a Query Client instance
const queryClient = new QueryClient();

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [showEventDetails, setShowEventDetails] = useState(false); // Manage event details visibility

    const handleEventClick = () => {
        router.push("/"); // Navigate to /
        setShowEventDetails(false); // Ensure event details popup is hidden
    };

    const handleCloseDetails = () => {
        setShowEventDetails(false); // Hide event details
    };

    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                {/* Dynamic Tab Rendering */}
                <Tabs
                    screenOptions={{
                        tabBarStyle: {
                            display: "none", // Hide default tab bar
                        },
                        headerShown: false,
                    }}
                />

                {/* Custom Navigation Bar */}
                <View style={styles.customNavBar}>
                    {/* Home Tab */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => router.push("/landing")}
                    >
                        <FontAwesome
                            name="home"
                            size={28}
                            color={router.pathname === "/landing" ? Colors[colorScheme].tint : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: router.pathname === "/landing" ? Colors[colorScheme].tint : "#ccc" },
                            ]}
                        >
                            Home
                        </Text>
                    </TouchableOpacity>

                    {/* Map Tab */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={handleEventClick} // Navigate directly to /
                    >
                        <FontAwesome
                            name="map-marker"
                            size={28}
                            color={router.pathname === "/" ? Colors[colorScheme].tint : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: router.pathname === "/" ? Colors[colorScheme].tint : "#ccc" },
                            ]}
                        >
                            Map
                        </Text>
                    </TouchableOpacity>

                    {/* Central Add Event Button */}
                    <TouchableOpacity
                        style={styles.centralButton}
                        onPress={() => router.push("/add-event")}
                    >
                        <FontAwesome name="plus" size={28} color="#fff" />
                    </TouchableOpacity>

                    {/* Explore Tab */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => router.push("/explore")}
                    >
                        <FontAwesome
                            name="paper-plane"
                            size={28}
                            color={router.pathname === "/explore" ? Colors[colorScheme].tint : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: router.pathname === "/explore" ? Colors[colorScheme].tint : "#ccc" },
                            ]}
                        >
                            Explore
                        </Text>
                    </TouchableOpacity>

                    {/* Billing Tab */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => router.push("/billing")}
                    >
                        <FontAwesome
                            name="money"
                            size={28}
                            color={router.pathname === "/billing" ? Colors[colorScheme].tint : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: router.pathname === "/billing" ? Colors[colorScheme].tint : "#ccc" },
                            ]}
                        >
                            Billing
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent", // Transparent background for the container
    },
    customNavBar: {
        position: "absolute",
        bottom: 3, // Adjust the position
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Darker semi-transparent background
        borderRadius: 50, // Fully round container
        height: 80,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10, // Shadow for Android
    },
    navItem: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    navText: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "bold",
    },
    centralButton: {
        backgroundColor: Colors["light"].tint,
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -35, // Floating effect
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
