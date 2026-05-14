"use client";

import { sessionCredentials, type Credentials } from "@/lib/services/credential.service";
import { create } from "zustand";

type CredentialsStore = {
    credentials: Credentials | null;
    setCredentials: (creds: Credentials) => void;
    clearCredentials: () => void;
    loadFromSession: () => void;
};

export const useCredentialsStore = create<CredentialsStore>((set) => ({
    credentials: null,
    setCredentials: (creds) => {
        sessionCredentials.save(creds);
        set({ credentials: creds });
    },
    clearCredentials: () => {
        sessionCredentials.clear();
        set({ credentials: null });
    },
    loadFromSession: () => {
        const creds = sessionCredentials.load();
        set({ credentials: creds });
    },
}));
