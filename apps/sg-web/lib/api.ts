"use client";

import { useCredentialsStore } from "@/store/credentials";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function proxyFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const creds = useCredentialsStore.getState().credentials;
    if (!creds) throw new Error("No credentials in session");

    const res = await fetch(`${BASE}/api/proxy${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "x-investec-client-id": creds.clientId,
            "x-investec-client-secret": creds.clientSecret,
            "x-investec-api-key": creds.apiKey,
            "x-investec-card-key": creds.cardKey,
            ...(options.headers ?? {}),
        },
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
    }

    return res.json();
}
