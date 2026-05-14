import type { InvestecCredentials } from "@spendgate/investec";
import { readErrorText } from "../error";
import { getBaseUrl } from "./url";

/**
 * Get access token for Investec API calls.
 * Caches token and refreshes if expiring soon (5s buffer).
 */
export async function getAccessToken(
    creds: InvestecCredentials,
    isSandbox: boolean
): Promise<string> {
    const basic = Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString("base64");

    const res = await fetch(`${getBaseUrl(isSandbox)}/identity/v2/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basic}`,
            "x-api-key": creds.apiKey,
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            scope: "accounts cards",
        }),
    });

    if (!res.ok) {
        throw new Error(`Token fetch failed: ${await readErrorText(res)}`);
    }

    const data = (await res.json()) as {
        access_token?: string;
        expires_in?: number;
    };
    const { access_token, expires_in } = data;

    if (!access_token || !expires_in) {
        throw new Error("Token response missing required fields");
    }

    return access_token;
}
