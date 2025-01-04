import MapView, { Marker as MapMarker, MapViewProps } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Event } from "@/model/event";
import CustomMarker from "@/components/custom_components/CustomMarker";
import { ScaledSheet } from "react-native-size-matters";

export interface Props {
    events: Event[];
    onMarkerPress: (event: Event) => void;
    mapRef: React.RefObject<MapView>;
}

export default function MapComponent({ events, onMarkerPress, mapRef }: Props) {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18; // Day: 6 AM to 6 PM

    if (events?.length === 0) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (



        <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={isDayTime ? dayMapStyle : nightMapStyle}
            initialRegion={{
                latitude: 45.2671,
                longitude: 19.8335,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {events?.map((event) => (
                <CustomMarker
                    key={event.id}
                    event={event}
                    onPress={() => onMarkerPress(event)}
                />
            ))}
        </MapView>
    );
}

const styles = ScaledSheet.create({
    map: { flex: 1 },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
});

// Example map style JSON (replace with your own from Google Maps Styling Wizard)
const dayMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            { "color": "#ebe3cd" }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#523735" }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#f5f1e6" }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            { "color": "#dfd2ae" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f5f5f5" }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#c9c0b1" }
        ]
    }
];

const nightMapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
]

