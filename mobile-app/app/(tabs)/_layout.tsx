import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";
import { useSegments } from "expo-router";

const queryClient = new QueryClient();

export default function TabLayout() {
    const router = useRouter();
    const segments = useSegments();
    const [activeIndex, setActiveIndex] = useState(0);
    const bubbleAnim = useRef(new Animated.Value(0)).current; // Smooth bubble transition
    const iconScaleAnim = useRef([]).current; // Icon scaling animations
    const translateYAnim = useRef([]).current; // Vertical movement animations for space

    const tabs = [
        { route: "/landing", icon: "home", label: "Home" },
        { route: "/", icon: "map-marker", label: "Map" },
        { route: "/explore", icon: "paper-plane", label: "Explore" },
        { route: "/billing", icon: "money", label: "Billing" },
        { route: "/listing", icon: "list", label: "Events" },
    ];

    // Initialize animations for each tab
    useEffect(() => {
        for (let i = 0; i < tabs.length; i++) {
            iconScaleAnim[i] = new Animated.Value(1);
            translateYAnim[i] = new Animated.Value(0);
        }
    }, []);

    useEffect(() => {
        const routeIndex = tabs.findIndex((tab) => tab.route === `/${segments[1] || ""}`);
        if (routeIndex !== -1) {
            setActiveIndex(routeIndex);
        }

        // Trigger animations whenever the activeIndex changes
        for (let i = 0; i < 5; i++) {
            iconScaleAnim[i].setValue(1);
            translateYAnim[i].setValue(0);
        }

        if (routeIndex !== -1) {
            Animated.parallel([
                Animated.timing(iconScaleAnim[routeIndex], {
                    toValue: 1.4, // Pop out effect
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim[routeIndex], {
                    toValue: -10, // Move upwards
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [activeIndex, segments]);



    useEffect(() => {
        Animated.timing(bubbleAnim, {
            toValue: activeIndex,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [activeIndex]);

    const handleTabPress = (index, route) => {
        if (index !== activeIndex) {
            // Reset animations for all icons
            for (let i = 0; i < tabs.length; i++) {
                iconScaleAnim[i].setValue(1);
                translateYAnim[i].setValue(0);
            }

            // Animate the selected tab's icon and space
            Animated.parallel([
                Animated.timing(iconScaleAnim[index], {
                    toValue: 1.4, // Larger scale
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim[index], {
                    toValue: -10, // Move upwards
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            setActiveIndex(index);
            router.push(route);
        }
    };

    const getTabBubbleStyle = () => ({
        transform: [
            {
                translateX: bubbleAnim.interpolate({
                    inputRange: tabs.map((_, i) => i),
                    outputRange: tabs.map((_, i) => i * 80), // Adjust for tab positions
                }),
            },
        ],
    });

    const getIconStyle = (index) => ({
        transform: [
            { scale: iconScaleAnim[index] || 1 },
            { translateY: translateYAnim[index] || 0 },
        ],
    });

    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                <Tabs screenOptions={{ tabBarStyle: { display: "none" }, headerShown: false }} />
                <View style={styles.customNavBar}>
                    {/* Floating Circle for Active Tab */}
                    <Animated.View style={[styles.activeBubble, getTabBubbleStyle()]} />

                    {/* Tabs */}
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={tab.label}
                            style={styles.navItem}
                            onPress={() => handleTabPress(index, tab.route)}
                        >
                            <Animated.View style={getIconStyle(index)}>
                                <View
                                    style={[
                                        styles.iconContainer,
                                        activeIndex === index && styles.activeIconContainer,
                                    ]}
                                >
                                    <FontAwesome
                                        name={tab.icon}
                                        size={25}
                                        color={activeIndex === index ? "#fff" : "#aaa"}
                                    />
                                </View>
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
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 75,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    // activeBubble: {
    //     position: "absolute",
    //     width: 70,
    //     height: 70,
    //     backgroundColor: "#007AFF",
    //     borderRadius: 35,
    //     bottom: 0,
    //     zIndex: -1,
    //     transform: [{ translateY: -20 }],
    // },
    navItem: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
    },
    activeIconContainer: {
        backgroundColor: "#FFA000",
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
});
