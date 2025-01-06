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
import { useNavigation } from "@react-navigation/native";
import {ScaledSheet} from "react-native-size-matters";

export default function LandingPage() {
    const navigation = useNavigation(); // Use navigation hook
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
                    uri: "https://i.pinimg.com/736x/64/49/d4/6449d4f445e8cf392a79543fb9b85158.jpg",
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
                            Let’s Get You Closer to <Text style={styles.highlight}>the Party</Text>
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
                            onPress={() => navigation.navigate("index")} // Navigate to index
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

const styles = ScaledSheet.create({
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
        paddingHorizontal: '20@s',
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '100@s',
    },
    title: {
        fontSize: '50@s',
        fontFamily: "Poppins-Bold,sans-serif",
        color: "#fff",
        textAlign: "center",
        marginBottom: '10@s',
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: '19@s',
        fontFamily: "Aryzena-Regular",
        color: "#e0e0e0",
        textAlign: "center",
        marginTop: '10@s',
        fontStyle: "italic",
        fontWeight: "bold",
    },
    highlight: {
        fontFamily: "Poppins-Bold",
        color: "#d5b43e",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: '100@s',
        width: "100%",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        paddingVertical: '15@s',
        paddingHorizontal: '20@s',
        borderRadius: '50@s',
        width: "80%",
        marginBottom: '20@s',
        borderWidth: '1@s',
        borderColor: "#ccc",
    },
    googleButtonText: {
        color: "#000",
        fontSize: '16@s',
        fontWeight: "bold",
        marginLeft: '10@s',
    },
    exploreButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d5b43e",
        paddingVertical: '15@s',
        paddingHorizontal: '20@s',
        borderRadius: '50@s',
        width: "80%",
    },
    exploreButtonText: {
        color: "#fff",
        fontSize: '16@s',
        fontWeight: "bold",
        marginRight: '10@s',
    },
    iconImage: {
        width: '20@s',
        height: '20@s',
        marginRight: '10@s',
    },
    arrow: {
        fontSize: '18@s',
        color: "#fff",
        marginLeft: '5@s',
    },
});