import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";

const queryClient = new QueryClient();

export default function TabLayout() {
    const router = useRouter();
    const [tabAnimation] = useState(new Animated.Value(0));
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabPress = (index, route) => {
        setActiveIndex(index);

        Animated.sequence([
            Animated.timing(tabAnimation, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(tabAnimation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();

        router.push(route);
    };

    const getTabBubbleStyle = (index) => ({
        transform: [
            { scale: activeIndex === index ? 1.2 : 1 },
            { translateY: activeIndex === index ? -10 : 0 },
        ],
        opacity: activeIndex === index ? 1 : 0.5,
    });

    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                <Tabs screenOptions={{ tabBarStyle: { display: "none" }, headerShown: false }} />
                <View style={styles.customNavBar}>
                    {[
                        { route: "/landing", icon: "home", label: "Home" },
                        { route: "/", icon: "map-marker", label: "Map" },
                        { route: "/explore", icon: "paper-plane", label: "Explore" },
                        { route: "/billing", icon: "money", label: "Billing" },
                    ].map((tab, index) => (
                        <TouchableOpacity
                            key={tab.label}
                            style={styles.navItem}
                            onPress={() => handleTabPress(index, tab.route)}
                        >
                            <Animated.View style={[styles.bubble, getTabBubbleStyle(index)]}>
                                <FontAwesome name={tab.icon} size={25} color="#ffffff" />
                            </Animated.View>
                            <Text
                                style={[
                                    styles.navText,
                                    activeIndex === index && styles.activeText,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
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
        backgroundColor: "rgba(30, 30, 30, 0.9)",
        borderRadius: 40,
        height: 80,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    navItem: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    navText: {
        marginTop: 5,
        fontSize: 12,
        color: "#ccc",
        fontWeight: "500",
    },
    activeText: {
        fontSize: 14,
        color: "#ffffff",
        fontWeight: "700",
    },
    bubble: {
        backgroundColor: "#575757",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#007BFF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
});
