import "react-native-reanimated";
import "../global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/auth";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
    anchor: "(tabs)",
};

const queryClient = new QueryClient();

function OnboardingGuard() {
    const { getConnection } = useAuthStore();
    const segments = useSegments();
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function bootstrap() {
            const connection = await getConnection();
            if (!mounted) return;

            const inOnboarding = segments[0] === "credentials";

            if (!connection && !inOnboarding) {
                router.replace("/credentials");
            } else if (connection && inOnboarding) {
                router.replace("/(tabs)");
            }

            setReady(true);
        }

        bootstrap();

        return () => {
            mounted = false;
        };
    }, [getConnection, router, segments]);

    if (!ready) return null;

    return <Slot />;
}

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <QueryClientProvider client={queryClient}>
                <OnboardingGuard />
                <StatusBar style="auto" />
                <PortalHost />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
