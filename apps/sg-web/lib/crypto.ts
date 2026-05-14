import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";

function getKey(): Buffer {
    const key = process.env.CREDENTIAL_ENCRYPTION_KEY;
    if (!key || key.length < 32) {
        throw new Error("CREDENTIAL_ENCRYPTION_KEY must be at least 32 characters");
    }
    // Use first 32 bytes — ensure it is a different value from BETTER_AUTH_SECRET
    return Buffer.from(key.slice(0, 32), "utf-8");
}

export function encrypt(plaintext: string): string {
    const key = getKey();
    const iv = randomBytes(12); // 96-bit IV for GCM
    const cipher = createCipheriv(ALGORITHM, key, iv);
    const enc = Buffer.concat([cipher.update(plaintext, "utf-8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return [iv, tag, enc].map((b) => b.toString("hex")).join(":");
}

export function decrypt(stored: string): string {
    const key = getKey();
    const [ivHex, tagHex, encHex] = stored.split(":");
    const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, "hex"));
    decipher.setAuthTag(Buffer.from(tagHex, "hex"));
    return (
        decipher.update(Buffer.from(encHex, "hex"), undefined, "utf-8") + decipher.final("utf-8")
    );
}
