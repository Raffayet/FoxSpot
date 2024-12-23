import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Image,
} from "react-native";

export default function LandingPage({ navigation }: any) {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity: 0
    const [translateYAnim] = useState(new Animated.Value(-30)); // Initial vertical offset: -50

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1, // Fade to opacity: 1
                duration: 1500, // Duration of fade animation
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0, // Move back to original position
                duration: 1000, // Match the duration of fade animation
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, translateYAnim]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri: "https://i.pinimg.com/736x/2a/9a/db/2a9adbd1c4c73cc40ce7dbfb5e0cd3cc.jpg",
                }}
                style={styles.backgroundImage}
            >
                <Animated.View
                    style={[
                        styles.overlay,
                        { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
                    ]}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Welcome to FoxSpot</Text>
                        <Text style={styles.subtitle}>
                            Let’s Get You Closer to <Text style={styles.highlight}>the Party!</Text>
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.googleButton}>
                            <Image
                                source={require("../../assets/images/search.png")}
                                style={styles.iconImage}
                            />
                            <Text style={styles.googleButtonText}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.exploreButton}
                            onPress={() => navigation.navigate("Explore")}
                        >
                            <Text style={styles.exploreButtonText}>Explore</Text>
                            <Text style={styles.arrow}>➔</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "space-between",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
        paddingHorizontal: 20,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    title: {
        fontSize: 50,
        fontFamily: "Poppins-Bold,sans-serif",
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Aryzena-Regular",
        color: "#e0e0e0",
        textAlign: "center",
        marginTop: 10,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    highlight: {
        fontFamily: "Poppins-Bold",
        color: "#1e90ff",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 50,
        width: "100%",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: "80%",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    googleButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    exploreButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1e90ff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: "80%",
    },
    exploreButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
    },
    iconImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    arrow: {
        fontSize: 18,
        color: "#fff",
        marginLeft: 5,
    },
});
