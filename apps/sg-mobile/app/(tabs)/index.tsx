import { Text } from "@/components/ui/text";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
    const name = "Johannes";
    return (
        <ScrollView contentContainerClassName="p-6 native:pb-safe">
            <View>
                <Text variant={"h2"}>SpendGate</Text>
                {/* Add Button */}
            </View>
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
