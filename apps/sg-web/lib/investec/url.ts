export function getBaseUrl(isSandbox: boolean): string {
    if (!process.env.INVESTEC_SANDBOX_BASE_URL || !process.env.INVESTEC_BASE_URL) {
        throw new Error("Base URL not configured in environment variables.");
    }

    return isSandbox ? process.env.INVESTEC_SANDBOX_BASE_URL : process.env.INVESTEC_BASE_URL;
}
