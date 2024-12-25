import {Event} from "@/model/event";
import {getEventTypeDetails} from "@/util/eventTypes";
import {Marker as MapMarker} from "react-native-maps";
import {Animated, StyleSheet, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import React, {useEffect, useRef} from "react";
import { ScaledSheet } from 'react-native-size-matters';

export default function CustomMarker ({ event, onPress }: { event: Event; onPress: () => void }){
    const { icon, tags, color } = getEventTypeDetails(event.eventType as string);

    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.5,
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

const styles = ScaledSheet.create({
    markerContainer: {
        marginLeft: "auto",
        width: '20@s', // Scaled width
        height: '20@s',
        borderRadius: '3@s',
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
        borderLeftWidth: '6@s',
        borderRightWidth: '6@s',
        borderTopWidth: '10@s',
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        alignSelf: "center",
        bottom: '2@s',
    },
    pulse: {
        bottom: 0,
        position: "absolute",
        width: '10@s',
        height: '10@s',
        borderRadius: '50@s',
        opacity: 0.5,
        paddingBottom: '10@s',
    },
    markerWrapper: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
})
