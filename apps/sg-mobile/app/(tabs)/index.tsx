import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
    const name = "Johannes";
    return (
        <ScrollView>
            <ThemedView>
                <ThemedText>SpendGate</ThemedText>
                {/* Add Button */}
            </ThemedView>
            {/* Stat Cards */}
            {/* Active Rules */}
            {/* Paused Rules */}
            {/* Deploy Status */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
