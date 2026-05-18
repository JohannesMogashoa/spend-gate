"use client";

import { proxyFetch } from "@/lib/api";
import { useCredentialsStore } from "@/store/credentials";
import { Credentials, SANDBOX_DEFAULTS } from "@spendgate/investec";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingForm() {
    const [form, setForm] = useState<Credentials>({
        clientId: "",
        clientSecret: "",
        apiKey: "",
        cardKey: "",
        accountId: "",
        sandbox: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSecrets, setShowSecrets] = useState(false);
    const { setCredentials } = useCredentialsStore();
    const router = useRouter();

    async function handleConnectAsync(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Temporarily set in store so proxyFetch can read them
            setCredentials(form);

            const sandboxParam = form.sandbox ? "?sandbox=true" : "";
            const result = await proxyFetch<{ data: { cards: Array<{ CardKey: string }> } }>(
                `/cards${sandboxParam}`
            );

            const cards = result.data?.cards ?? [];
            if (cards.length === 0) throw new Error("No cards found on this account");

            // Auto-fill cardKey if blank
            const resolvedCardKey = form.cardKey || cards[0].CardKey;
            setCredentials({ ...form, cardKey: resolvedCardKey });

            router.replace("/dashboard");
        } catch (error: unknown) {
            // Don't persist bad credentials
            useCredentialsStore.getState().clearCredentials();
            setError((error as Error).message ?? "Connection failed. Check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    function fillSandboxDefaults() {
        setForm((prev) => ({
            ...prev,
            ...SANDBOX_DEFAULTS,
            sandbox: true,
        }));
    }

    return (
        <form onSubmit={handleConnectAsync} className="w-full max-w-md space-y-4">
            {/* Logo + privacy note */}
            {/* Input fields */}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
                type="button"
                onClick={fillSandboxDefaults}
                className="text-sm text-blue-600 underline"
            >
                Use sandbox credentials
            </button>
            <button type="submit" disabled={loading} className="w-full ...">
                {loading ? "Connecting..." : "Connect →"}
            </button>
        </form>
    );
}
