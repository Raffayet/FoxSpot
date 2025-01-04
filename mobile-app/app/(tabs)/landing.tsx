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
import { ScaledSheet } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LandingPage() {
    const navigation = useNavigation(); // Use navigation hook
    const [translateXAnim] = useState(new Animated.Value(0)); // Horizontal position for the icon
    const [rotateAnim] = useState(new Animated.Value(0)); // Rotation for the icon
    const [fadeAnim] = useState(new Animated.Value(1)); // Opacity for the icon

    useEffect(() => {
        // Reset animation values when the page loads
        translateXAnim.setValue(0);
        rotateAnim.setValue(0);
        fadeAnim.setValue(1);

        // Start looping animation for the arrow
        const loopAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateXAnim, {
                    toValue: 10, // Slight movement to the right
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateXAnim, {
                    toValue: 0, // Back to the original position
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );

        loopAnimation.start();

        // Stop the looping animation when the component unmounts
        return () => loopAnimation.stop();
    }, [translateXAnim, rotateAnim, fadeAnim]);

    const handleExplorePress = () => {
        // Play final animation before navigation
        Animated.parallel([
            Animated.timing(translateXAnim, {
                toValue: 200, // Slide out to the right
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1, // Rotate 45 degrees
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0, // Fully transparent
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.navigate("index"); // Navigate to the map after animation completes
        });
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"], // Rotate 45 degrees clockwise
    });

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri: "https://i.pinimg.com/736x/64/49/d4/6449d4f445e8cf392a79543fb9b85158.jpg",
                }}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
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
                            onPress={handleExplorePress} // Trigger animation and navigation
                        >
                            <Text style={styles.exploreButtonText}>Explore</Text>
                            <Animated.View
                                style={{
                                    transform: [
                                        { translateX: translateXAnim },
                                        { rotate: rotateInterpolate },
                                    ],
                                    opacity: fadeAnim,
                                    marginLeft: 5, // Spacing between text and icon
                                }}
                            >
                                <Icon name="location-arrow" size={18} color="#fff" />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
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
        paddingHorizontal: "20@s",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100@s",
    },
    title: {
        fontSize: "50@s",
        fontFamily: "Poppins-Bold,sans-serif",
        color: "#fff",
        textAlign: "center",
        marginBottom: "10@s",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: "19@s",
        fontFamily: "Aryzena-Regular",
        color: "#e0e0e0",
        textAlign: "center",
        marginTop: "10@s",
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
        marginBottom: "110@s",
        width: "100%",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        paddingVertical: "15@s",
        paddingHorizontal: "20@s",
        borderRadius: "50@s",
        width: "80%",
        marginBottom: "20@s",
        borderWidth: "1@s",
        borderColor: "#ccc",
    },
    googleButtonText: {
        color: "#000",
        fontSize: "16@s",
        fontWeight: "bold",
        marginLeft: "10@s",
    },
    exploreButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d5b43e",
        paddingVertical: "15@s",
        paddingHorizontal: "20@s",
        borderRadius: "50@s",
        width: "80%",
    },
    exploreButtonText: {
        color: "#fff",
        fontSize: "16@s",
        fontWeight: "bold",
        marginRight: "10@s",
    },
    iconImage: {
        width: "20@s",
        height: "20@s",
        marginRight: "10@s",
    },
});
