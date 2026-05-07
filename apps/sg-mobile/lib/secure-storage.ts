// lib/secure-storage.ts

import * as SecureStore from "expo-secure-store";

const KEYS = {
	JWT: "spendgate_jwt",
	CLIENT_ID: "spendgate_client_id",
	CLIENT_SECRET: "spendgate_client_secret",
	API_KEY: "spendgate_api_key",
	CARD_KEY: "spendgate_card_key",
	ACCOUNT_ID: "spendgate_account_id",
	SANDBOX: "spendgate_sandbox",
} as const;

export type StoredConnection = {
	clientId: string;
	clientSecret: string;
	apiKey: string;
};

export type SecureStorage = {
	// JWT methods
	getJwt: () => Promise<string | null>;
	setJwt: (token: string) => Promise<void>;
	clearJwt: () => Promise<void>;
	// Client ID methods
	getClientId: () => Promise<string | null>;
	setClientId: (clientId: string) => Promise<void>;
	clearClientId: () => Promise<void>;
	// Client Secret methods
	getClientSecret: () => Promise<string | null>;
	setClientSecret: (clientSecret: string) => Promise<void>;
	clearClientSecret: () => Promise<void>;
	// API Key methods
	getApiKey: () => Promise<string | null>;
	setApiKey: (apiKey: string) => Promise<void>;
	clearApiKey: () => Promise<void>;
	// Card Key methods
	getCardKey: () => Promise<string | null>;
	setCardKey: (cardKey: string) => Promise<void>;
	clearCardKey: () => Promise<void>;
	// Account ID methods
	getAccountId: () => Promise<string | null>;
	setAccountId: (accountId: string) => Promise<void>;
	clearAccountId: () => Promise<void>;
	// Sandbox mode methods
	getSandbox: () => Promise<string | null>;
	setSandbox: (sandbox: boolean) => Promise<void>;
	clearSandbox: () => Promise<void>;
	// Connection methods
	getConnection: () => Promise<StoredConnection | null>;
};

export const secureStorage: SecureStorage = {
	// JWT methods
	getJwt: () => SecureStore.getItemAsync(KEYS.JWT),
	setJwt: (token: string) => SecureStore.setItemAsync(KEYS.JWT, token),
	clearJwt: () => SecureStore.deleteItemAsync(KEYS.JWT),

	// Client ID methods
	getClientId: () => SecureStore.getItemAsync(KEYS.CLIENT_ID),
	setClientId: (clientId: string) =>
		SecureStore.setItemAsync(KEYS.CLIENT_ID, clientId),
	clearClientId: () => SecureStore.deleteItemAsync(KEYS.CLIENT_ID),

	// Client Secret methods
	getClientSecret: () => SecureStore.getItemAsync(KEYS.CLIENT_SECRET),
	setClientSecret: (clientSecret: string) =>
		SecureStore.setItemAsync(KEYS.CLIENT_SECRET, clientSecret),
	clearClientSecret: () => SecureStore.deleteItemAsync(KEYS.CLIENT_SECRET),

	// API Key methods
	getApiKey: () => SecureStore.getItemAsync(KEYS.API_KEY),
	setApiKey: (apiKey: string) =>
		SecureStore.setItemAsync(KEYS.API_KEY, apiKey),
	clearApiKey: () => SecureStore.deleteItemAsync(KEYS.API_KEY),

	// Card Key methods
	getCardKey: () => SecureStore.getItemAsync(KEYS.CARD_KEY),
	setCardKey: (cardKey: string) =>
		SecureStore.setItemAsync(KEYS.CARD_KEY, cardKey),
	clearCardKey: () => SecureStore.deleteItemAsync(KEYS.CARD_KEY),

	// Account ID methods
	getAccountId: () => SecureStore.getItemAsync(KEYS.ACCOUNT_ID),
	setAccountId: (accountId: string) =>
		SecureStore.setItemAsync(KEYS.ACCOUNT_ID, accountId),
	clearAccountId: () => SecureStore.deleteItemAsync(KEYS.ACCOUNT_ID),

	// Sandbox mode methods
	getSandbox: () => SecureStore.getItemAsync(KEYS.SANDBOX),
	setSandbox: (sandbox: boolean) =>
		SecureStore.setItemAsync(KEYS.SANDBOX, sandbox.toString()),
	clearSandbox: () => SecureStore.deleteItemAsync(KEYS.SANDBOX),

	// Connection methods
	async getConnection(): Promise<StoredConnection | null> {
		const [clientId, clientSecret, apiKey] = await Promise.all([
			SecureStore.getItemAsync(KEYS.CLIENT_ID),
			SecureStore.getItemAsync(KEYS.CLIENT_SECRET),
			SecureStore.getItemAsync(KEYS.API_KEY),
		]);

		if (!clientId || !clientSecret || !apiKey) {
			return null;
		}

		return {
			clientId,
			clientSecret,
			apiKey,
		};
	},
};
