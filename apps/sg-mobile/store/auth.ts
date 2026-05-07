import { StoredConnection, secureStorage } from "@/lib/secure-storage";

import { create } from "zustand";

type AuthStore = {
	token: string | null;
	clientId: string | null;
	clientSecret: string | null;
	apiKey: string | null;
	setToken: (token: string) => void;
	setInvestecCreds: (
		clientId: string,
		clientSecret: string,
		apiKey: string,
	) => void;
	clearStore: () => void;
	getConnection: () => Promise<StoredConnection | null>;
};

export const useAuthStore = create<AuthStore>((set) => ({
	token: null,
	clientId: null,
	clientSecret: null,
	apiKey: null,
	setInvestecCreds: async (clientId, clientSecret, apiKey) => {
		await Promise.all([
			secureStorage.setClientId(clientId),
			secureStorage.setClientSecret(clientSecret),
			secureStorage.setApiKey(apiKey),
		]);
		set({ clientId, clientSecret, apiKey });
	},
	setToken: async (token) => {
		await secureStorage.setJwt(token);
		set({ token });
	},
	clearStore: async () => {
		await Promise.all([
			secureStorage.clearJwt(),
			secureStorage.clearClientId(),
			secureStorage.clearClientSecret(),
			secureStorage.clearApiKey(),
		]);
		set({ token: null, clientId: null, clientSecret: null, apiKey: null });
	},
	getConnection: () => secureStorage.getConnection(),
}));
