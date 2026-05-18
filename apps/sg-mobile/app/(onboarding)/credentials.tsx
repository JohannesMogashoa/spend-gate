import { ThemedText } from "@/components/themed-text";
import { useAuthStore } from "@/store/auth";
import { Credentials } from "@spendgate/investec";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

const CredentialsScreen = () => {
    const router = useRouter();
    const { setInvestecCreds, setToken } = useAuthStore();

    const [form, setForm] = useState<Credentials>({
        clientId: "",
        clientSecret: "",
        apiKey: "",
        cardKey: "",
        accountId: "",
        sandbox: false,
    });
    const [showAccountDetails, setShowAccountDetails] = useState(false);

    async function handleConnect() {}

    function saveConnection() {
        try {
            setInvestecCreds(form.clientId, form.clientSecret, form.apiKey);
        } catch {
            Alert.alert("Error", "Failed to save connection. Please try again.");
        }
    }
    return (
        <ScrollView>
            <ThemedText>SpendGate Programmable card rules</ThemedText>
            <ThemedText>
                Your credentials stay on your device. We do not store on a server.
            </ThemedText>
        </ScrollView>
    );
};

export default CredentialsScreen;

const styles = StyleSheet.create({});
