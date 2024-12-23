import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/HomePage";
import MapPage from "./screens/Map";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Map"
                    component={MapPage}
                    options={{ title: "Map" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
