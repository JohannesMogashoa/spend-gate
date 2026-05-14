export async function readErrorText(res: Response): Promise<string> {
    try {
        const text = await res.text();
        return text || `${res.status} ${res.statusText}`;
    } catch {
        return `${res.status} ${res.statusText}`;
    }
}
