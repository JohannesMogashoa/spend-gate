import { readErrorText } from "./error";
import { getAccessToken } from "./investec/get-token";

const BASE =
    process.env.USE_SANDBOX === "true"
        ? "https://openapisandbox.investec.com/za/v1"
        : "https://openapi.investec.com/za/v1";

export async function deployRulesToCard(
    cardKey: string,
    compiledCode: string
): Promise<{ success: boolean; codeId?: string; error?: string }> {
    if (!process.env.INVESTEC_API_KEY) {
        return { success: false, error: "Missing INVESTEC_API_KEY" };
    }

    let token: string;
    try {
        token = await getAccessToken(
            {
                clientId: process.env.INVESTEC_CLIENT_ID!,
                clientSecret: process.env.INVESTEC_CLIENT_SECRET!,
                apiKey: process.env.INVESTEC_API_KEY!,
                cardKey: cardKey,
            },
            process.env.USE_SANDBOX === "true"
        );
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch access token",
        };
    }

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-api-key": process.env.INVESTEC_API_KEY,
    };

    // Step 1: simulate first — fail fast before touching live card
    const simRes = await fetch(`${BASE}/cards/${cardKey}/code/execute`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            simulationcode: compiledCode,
            centsAmount: "10000", // R100 test transaction
            currencyCode: "zar",
            merchantCode: 5411, // grocery store
            merchantName: "Test Merchant",
            merchantCity: "Cape Town",
            countryCode: "ZA",
        }),
    });

    if (!simRes.ok) {
        return {
            success: false,
            error: `Simulation failed: ${await readErrorText(simRes)}`,
        };
    }

    // Step 2: save (not yet live)
    const saveRes = await fetch(`${BASE}/cards/${cardKey}/code`, {
        method: "POST",
        headers,
        body: JSON.stringify({ code: compiledCode }),
    });

    if (!saveRes.ok) {
        return {
            success: false,
            error: `Save failed: ${await readErrorText(saveRes)}`,
        };
    }

    const saveJson = (await saveRes.json()) as {
        data?: { result?: { codeId?: string } };
    };
    const codeId = saveJson.data?.result?.codeId;
    if (!codeId) {
        return {
            success: false,
            error: "Save failed: missing codeId in response",
        };
    }

    // Step 3: publish (now live)
    const publishRes = await fetch(`${BASE}/cards/${cardKey}/publish`, {
        method: "POST",
        headers,
        body: JSON.stringify({ codeid: codeId, code: "" }),
    });

    if (!publishRes.ok) {
        return {
            success: false,
            error: `Publish failed: ${await readErrorText(publishRes)}`,
        };
    }

    return { success: true, codeId };
}
