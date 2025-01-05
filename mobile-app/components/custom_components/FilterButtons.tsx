// FilterButtonsComponent.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getEventTypeDetails } from "@/util/eventTypes";
import {ScaledSheet} from "react-native-size-matters";

const FilterButtonsComponent = ({ onFilterSelect, activeFilter }) => {
    // Event Types
    const eventTypes = ["Party", "Culture", "Meeting", "Work", "Dinner", "Exercise"];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            {eventTypes.map((eventType) => {
                const { icon, color } = getEventTypeDetails(eventType.toLowerCase());
                return (
                    <TouchableOpacity
                        key={eventType}
                        style={[
                            styles.button,
                            { backgroundColor: color },
                            activeFilter === eventType && styles.activeButton,
                        ]}
                        onPress={() => onFilterSelect(eventType)}
                    >
                        <FontAwesome name={icon} size={18} color="#FFF" />
                        <Text style={styles.buttonText}>{eventType}</Text>
                    </TouchableOpacity>
                );
            })}
            {/* "All" Filter Button */}
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: "#6c757d" },
                    activeFilter === null && styles.activeButton,
                ]}
                onPress={() => onFilterSelect(null)}
            >
                <FontAwesome name="sliders" size={18} color="#FFF" />
                <Text style={styles.buttonText}>All</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = ScaledSheet.create({
    container: {
        position: "absolute",
        top: 100,
        left: 0,
        right: 0,
        flexDirection: "row",
        paddingVertical: 10,
        zIndex: 1,
        marginLeft: '5@s',
        marginRight: '5@s',
        marginTop: '8@s'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Android shadow
    },
    activeButton: {
        borderWidth: 2,
        borderColor: "#FFF",
    },
    buttonText: {
        color: "#FFF",
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default FilterButtonsComponent;
