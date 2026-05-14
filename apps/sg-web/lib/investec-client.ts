/**
 * Investec Open API client for authentication and API calls.
 * Handles OAuth2 token management and request wrapping.
 *
 * References:
 * - OAuth2: POST https://identity.investec.com/am/oauth2/za/token
 * - Card API: GET /za/v1/cards
 * - Transaction API: GET /za/pb/v1/accounts/:accountId/transactions
 */

import type { InvestecCredentials } from "@spendgate/investec";
import { getAccessToken } from "./investec/get-token";
import { getBaseUrl } from "./investec/url";
/**
 * Make authenticated request to Investec API.
 * Automatically includes bearer token and API key.
 */
export async function investecFetch(
    path: string,
    creds: InvestecCredentials,
    options: { method?: string; body?: unknown; sandbox?: boolean } = {}
): Promise<Response> {
    const { method = "GET", body, sandbox = false } = options;
    const token = await getAccessToken(creds, sandbox);
    const baseUrl = getBaseUrl(sandbox);

    return fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-api-key": creds.apiKey,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });
}
