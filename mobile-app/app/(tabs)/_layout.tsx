import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSegments } from "expo-router";

// Create a Query Client instance
const queryClient = new QueryClient();

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const segments = useSegments();
    const [showEventDetails, setShowEventDetails] = useState(false);

    const currentPath = segments[1];

    const handleEventClick = () => {
        router.push("/"); // Navigate to /
        setShowEventDetails(false);
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
                            size={currentPath === "landing" ? 30 : 25}
                            color={currentPath === "landing" ? "#ffffff" : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: currentPath === "landing" ? "#ffffff" : "#ccc" },
                            ]}
                        >
                            Home
                        </Text>
                    </TouchableOpacity>

                    {/* Map Tab */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={handleEventClick}
                    >
                        <FontAwesome
                            name="map-marker"
                            size={currentPath === undefined ? 30 : 25}
                            color={currentPath === undefined ? "#ffffff" : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: currentPath === "/" ? "#ffffff" : "#ccc" },
                            ]}
                        >
                            Map
                        </Text>
                    </TouchableOpacity>

                    {/* Central Floating Button */}
                    {/*<TouchableOpacity*/}
                    {/*    style={styles.centralButton}*/}
                    {/*    onPress={() => router.push("/add-event")}*/}
                    {/*>*/}
                    {/*    <FontAwesome name="plus" size={28} color="#fff" />*/}
                    {/*</TouchableOpacity>*/}

                    {/* Explore Tab */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => router.push("/explore")}
                    >
                        <FontAwesome
                            name="paper-plane"
                            size={currentPath === "explore" ? 30 : 25}
                            color={currentPath === "explore" ? "#ffffff" : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: currentPath === "explore" ? "#ffffff" : "#ccc" },
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
                            size={currentPath === "billing" ? 30 : 25}
                            color={currentPath === "billing" ? "#ffffff" : "#ccc"}
                        />
                        <Text
                            style={[
                                styles.navText,
                                { color: currentPath === "billing" ? "#ffffff" : "#ccc" },
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
        backgroundColor: "transparent",
    },
    customNavBar: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        borderRadius: 40,
        height: 70,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    navItem: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    navText: {
        marginTop: 3,
        fontSize: 12,
        fontWeight: "500",
    },
    centralButton: {
        backgroundColor: Colors["light"].tint,
        width: 65,
        height: 65,
        borderRadius: 32.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
});
