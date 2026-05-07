import { create } from "zustand";
import { secureStorage } from "@/lib/secure-storage";

type ApplicationStore = {
	cardKey: string | null;
	accountId: string | null;
	sandbox: boolean;
};

export const useApplicationStore = create<ApplicationStore>((set) => ({
	cardKey: null,
	accountId: null,
	sandbox: false,
	setCardKey: (cardKey: string) => {
		secureStorage.setCardKey(cardKey);
		set({ cardKey });
	},
	setAccountId: (accountId: string) => {
		secureStorage.setAccountId(accountId);
		set({ accountId });
	},
	setSandbox: (sandbox: boolean) => {
		secureStorage.setSandbox(sandbox);
		set({ sandbox });
	},
}));
