import { db } from "@/db/client";
import { userCredentials } from "@/db/schema";
import { Credentials } from "@spendgate/investec";
import { eq } from "drizzle-orm";
import { decrypt, encrypt } from "../crypto";

export const credentialService = {
    async save(userId: string, creds: Credentials): Promise<void> {
        const row = {
            userId,
            clientId: encrypt(creds.clientId),
            clientSecret: encrypt(creds.clientSecret),
            apiKey: encrypt(creds.apiKey),
            cardKey: encrypt(creds.cardKey),
            accountId: encrypt(creds.accountId),
            sandbox: creds.sandbox,
            updatedAt: new Date(),
        };
        await db.insert(userCredentials).values(row).onConflictDoUpdate({
            target: userCredentials.userId,
            set: row,
        });
    },

    async load(userId: string): Promise<Credentials | null> {
        const row = await db
            .select()
            .from(userCredentials)
            .where(eq(userCredentials.userId, userId)); // should be at most 1 row due to unique constraint
        if (!row.length) return null;
        const [cred] = row;
        return {
            clientId: decrypt(cred.clientId),
            clientSecret: decrypt(cred.clientSecret),
            apiKey: decrypt(cred.apiKey),
            cardKey: decrypt(cred.cardKey),
            accountId: decrypt(cred.accountId),
            sandbox: cred.sandbox,
        };
    },

    async delete(userId: string): Promise<void> {
        await db.delete(userCredentials).where(eq(userCredentials.userId, userId));
    },

    async exists(userId: string): Promise<boolean> {
        const row = await db
            .select()
            .from(userCredentials)
            .where(eq(userCredentials.userId, userId));
        return !!row.length;
    },
};
