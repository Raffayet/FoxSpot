import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";

const queryClient = new QueryClient();

export default function TabLayout() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const bubbleAnim = useRef(new Animated.Value(0)).current; // Smooth bubble transition
    const iconScaleAnim = useRef([]).current; // Icon scaling animations
    const iconTranslateYAnim = useRef([]).current; // Icon vertical movement animations

    // Initialize animations for each tab
    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            iconScaleAnim[i] = new Animated.Value(1);
            iconTranslateYAnim[i] = new Animated.Value(0);
        }
    }, []);

    useEffect(() => {
        Animated.timing(bubbleAnim, {
            toValue: activeIndex,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [activeIndex]);

    const handleTabPress = (index, route) => {
        // Reset animations for all icons
        for (let i = 0; i < 4; i++) {
            iconScaleAnim[i].setValue(1);
            iconTranslateYAnim[i].setValue(0);
        }

        // Animate the selected tab's icon
        Animated.parallel([
            Animated.timing(iconScaleAnim[index], {
                toValue: 1.4, // Larger scale
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(iconTranslateYAnim[index], {
                toValue: -10, // Pop-out effect
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        setActiveIndex(index);
        router.push(route);
    };

    const getTabBubbleStyle = () => ({
        transform: [
            {
                translateX: bubbleAnim.interpolate({
                    inputRange: [0, 1, 2, 3],
                    outputRange: [0, 80, 160, 240], // Adjust for tab positions
                }),
            },
        ],
    });

    const getIconStyle = (index) => ({
        transform: [
            { scale: iconScaleAnim[index] || 1 },
            { translateY: iconTranslateYAnim[index] || 0 },
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
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        borderRadius: 40,
        height: 80,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    // activeBubble: {
    //     position: "absolute",
    //     width: 50,
    //     height: 50,
    //     backgroundColor: "#007AFF",
    //     borderRadius: 25,
    //     top: 15, // Slightly above the nav bar
    //     left: 25, // Initial position
    //     zIndex: -1,
    //     shadowColor: "#007AFF",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.4,
    //     shadowRadius: 6,
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
        backgroundColor: "#635f5f",
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
