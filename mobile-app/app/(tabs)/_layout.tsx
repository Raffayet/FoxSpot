import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/expo/HapticTab';
import { IconSymbol } from '@/components/expo/IconSymbol';
import TabBarBackground from '@/components/expo/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {FontAwesome} from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a Query Client instance
const queryClient = new QueryClient();

export default function TabLayout() {
  const colorScheme = useColorScheme();

    return (
        <QueryClientProvider client={queryClient}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    headerShown: false,
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                        ios: {
                            // Use a transparent background on iOS to show the blur effect
                            position: "absolute",
                        },
                        default: {},
                    }),
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Map",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="map-marker" size={28} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="landing"
                    options={{
                        title: "Landing",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="home" size={28} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="billing"
                    options={{
                        title: "Billing",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="money" size={28} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: "Explore",
                        tabBarIcon: ({ color }) => (
                            <IconSymbol size={28} name="paperplane.fill" color={color} />
                        ),
                    }}
                />
            </Tabs>
        </QueryClientProvider>
    );
}
