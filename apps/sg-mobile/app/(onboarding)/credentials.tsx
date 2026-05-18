import { Text } from "@/components/ui/text";
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
        <ScrollView contentContainerClassName="p-6 native:pb-safe">
            <Text>SpendGate Programmable card rules</Text>
            <Text>Your credentials stay on your device. We do not store on a server.</Text>
        </ScrollView>
    );
};

export default CredentialsScreen;

const styles = StyleSheet.create({});
