import React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have installed @expo/vector-icons
import { useFonts } from "expo-font"; // Ensure you have installed expo-font

export default function HomePage({ navigation }: any) {
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    });



    if (!fontsLoaded) {
        return null; // Optionally, you can show a loading screen
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/home-bg.jpg")}

                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Explore.</Text>
                        <Text style={styles.title}>Travel.</Text>
                        <Text style={styles.title}>Inspire.</Text>
                        <Text style={styles.subtitle}>
                            Life is all about the journey. Find yours.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Map")}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                </View>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Stronger overlay for cooler look
        paddingHorizontal: 20,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    title: {
        fontSize: 50, // Larger text
        fontFamily: "Poppins-Bold", // Stylish font
        color: "#ffffff",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.3)", // Subtle shadow
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: "#e0e0e0",
        textAlign: "center",
        marginTop: 15,
        lineHeight: 25,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e90ff", // Vibrant blue
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 50,
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Poppins-Bold",
    },
    icon: {
        marginLeft: 10,
    },
});
