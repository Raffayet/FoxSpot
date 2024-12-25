import {Event} from "@/model/event";
import {getEventTypeDetails} from "@/util/eventTypes";
import {Marker as MapMarker} from "react-native-maps";
import {Animated, StyleSheet, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import React, {useEffect, useRef} from "react";

export default function CustomMarker ({ event, onPress }: { event: Event; onPress: () => void }){
    const { icon, tags, color } = getEventTypeDetails(event.eventType as string);

    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 2.0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => pulse.stop(); // Cleanup animation on unmount
    }, [scale]);

    return (
        <MapMarker
            coordinate={{
                latitude: (event?.location?.lat) as number,
                longitude: (event?.location?.long) as number,
            }}
            onPress={onPress}
        >
            <View style={styles.markerWrapper}>
                {/* Pulsating Effect */}
                <View style={[styles.markerContainer, { backgroundColor: color }]}>
                    <FontAwesome name={icon} size={12} color="#FFF" />
                </View>
                {/* Pointer */}
                <View style={[styles.markerPointer, { borderTopColor: color }]} />
                { event.status === 'ACTIVE' &&
                    <Animated.View
                        style={[
                            styles.pulse,
                            {
                                backgroundColor: color,
                                transform: [{ scale }],
                            },
                        ]}
                    />
                }
            </View>
        </MapMarker>
    );
};

const styles = StyleSheet.create({
    markerContainer: {
        marginLeft: "auto",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    markerPointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        alignSelf: "center",
        bottom:2,
    },
    markerWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    pulse: {
        bottom: 0,
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 30,
        opacity: 0.5,
        paddingBottom: 10
    },
})
