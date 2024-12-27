// FilterButtonsComponent.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getEventTypeDetails } from "@/util/eventTypes";

const FilterButtonsComponent = ({ onFilterSelect, activeFilter }) => {
    // Updated to match the exact eventType values from your data
    const eventTypes = [
        "Party",
        "Culture",
        "Meeting",
        "Work",
        "Dinner",
        "Exercise"
    ];

    const renderIcon = (iconName) => (
        <Text>
            <FontAwesome name={iconName} size={16} color="#FFF" />
        </Text>
    );

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {eventTypes.map((eventType) => {
                const { icon, color } = getEventTypeDetails(eventType.toLowerCase());
                return (
                    <TouchableOpacity
                        key={eventType}
                        style={[
                            styles.button,
                            { backgroundColor: color },
                            activeFilter === eventType && styles.activeButton
                        ]}
                        onPress={() => onFilterSelect(eventType)}
                    >
                        {renderIcon(icon)}
                        <Text style={styles.buttonText}>{eventType}</Text>
                    </TouchableOpacity>
                );
            })}
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: '#6c757d' },
                    activeFilter === null && styles.activeButton
                ]}
                onPress={() => onFilterSelect(null)}
            >
                {renderIcon("filter")}
                <Text style={styles.buttonText}>All</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingVertical: 10,
        zIndex: 1,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeButton: {
        borderWidth: 2,
        borderColor: '#FFF',
    },
    buttonText: {
        color: '#FFF',
        marginLeft: 10,
    },
});

export default FilterButtonsComponent;