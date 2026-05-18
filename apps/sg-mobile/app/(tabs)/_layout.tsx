import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/lib/theme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Rules",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="switch.programmable" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="dollarsign.bank.building" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="person.2.shield" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
