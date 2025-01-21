import Icon from "react-native-vector-icons/FontAwesome";
import {TextInput, TouchableOpacity, View} from "react-native";
import React, {Dispatch, SetStateAction} from "react";
import {ScaledSheet} from "react-native-size-matters";

interface Props {
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>;
    handleSearch: (query: string) => Promise<void>;
}

export default function SearchBar(props: Props) {
    return(
        <View style={styles.searchContainer}>
            <Icon name="map-marker" size={20} color="#888" style={styles.mapIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search events..."
                value={props.searchQuery}
                onChangeText={props.setSearchQuery}
            />
            <TouchableOpacity style={styles.arrowButton} onPress={props.handleSearch}>
                <Icon name="search" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = ScaledSheet.create({
    searchContainer: {
        position: "absolute",
        top: "40@s",
        left: "10@s",
        right: "10@s",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "20@s",
        paddingHorizontal: "10@s",
        paddingVertical: "5@s",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: "5@s",
        zIndex: 1000, // Ensure it appears above the map
    },
    mapIcon: {
        marginRight: "10@s",
    },
    searchInput: {
        flex: 1,
        fontSize: "14@s",
        color: "#333",
        paddingHorizontal: "10@s",
    },
    arrowButton: {
        backgroundColor: "#0066ff",
        borderRadius: "50@s",
        width: "36@s",
        height: "36@s",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10@s",
    },
})
