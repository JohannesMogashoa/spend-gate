import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
	const router = useRouter();
	const { setInvestecCreds, setToken } = useAuthStore();

	const [clientId, setClientId] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [apiKey, setApiKey] = useState("");
	const [accountId, setAccountId] = useState("");
	const [sandbox, setSandbox] = useState(true);
	const [showAccountDetails, setShowAccountDetails] = useState(false);

	async function handleConnect() {}

	function saveConnection() {
		try {
			setInvestecCreds(clientId, clientSecret, apiKey);
		} catch {
			Alert.alert(
				"Error",
				"Failed to save connection. Please try again.",
			);
		}
	}
	return (
		<ThemedView>
			<ThemedText type="title">Hi there!</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({});
