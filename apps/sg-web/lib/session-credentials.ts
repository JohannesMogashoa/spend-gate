export type Credentials = {
    clientId: string;
    clientSecret: string;
    apiKey: string;
    cardKey: string;
    sandbox: boolean;
};

const KEYS = {
    CREDS: "spendgate_credentials",
} as const;

export const sessionCredentials = {
    save(creds: Credentials): void {
        sessionStorage.setItem(KEYS.CREDS, JSON.stringify(creds));
    },

    load(): Credentials | null {
        if (typeof window === "undefined") return null; // SSR guard
        const raw = sessionStorage.getItem(KEYS.CREDS);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as Credentials;
        } catch {
            return null;
        }
    },

    clear(): void {
        sessionStorage.removeItem(KEYS.CREDS);
    },

    exists(): boolean {
        if (typeof window === "undefined") return false; // SSR guard
        return !!sessionStorage.getItem(KEYS.CREDS);
    },
};
