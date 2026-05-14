import { db } from "@/db/client";
import { CreateRule, Rule, rules } from "@/db/schema";
import { eq } from "drizzle-orm";

export const ruleService = {
    async create(rule: CreateRule & { userId: string }): Promise<void> {
        await db.insert(rules).values(rule).onConflictDoUpdate({
            target: rules.id,
            set: rule,
        });
    },

    async update(rule: Rule): Promise<void> {
        await db.update(rules).set(rule).where(eq(rules.id, rule.id));
    },

    async delete(id: string): Promise<void> {
        await db.delete(rules).where(eq(rules.id, id));
    },

    async getAll(userId: string): Promise<Rule[]> {
        return await db.select().from(rules).where(eq(rules.userId, userId));
    },

    async isOwner(userId: string, ruleId: string): Promise<boolean> {
        const row = await db.select().from(rules).where(eq(rules.id, ruleId));
        return !!row.length && row[0].userId === userId;
    },
};
