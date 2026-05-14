import type { Rule } from "@/db";
import { db } from "@/db";
import type { SpendRule } from "@spendgate/rules";

export const ruleService = {
    async create(rule: Omit<SpendRule, "id" | "triggerCount" | "savedCents">): Promise<string> {
        const id = crypto.randomUUID();
        await db.rules.add({
            id,
            label: rule.label,
            active: rule.active,
            priority: rule.priority,
            conditions: JSON.stringify(rule.conditions),
            actions: JSON.stringify(rule.actions),
            notifyChannel: "push",
            triggerCount: 0,
            savedCents: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return id;
    },

    async update(id: string, patch: Partial<Omit<Rule, "id">>): Promise<void> {
        await db.rules.update(id, { ...patch, updatedAt: new Date() });
    },

    async delete(id: string): Promise<void> {
        await db.rules.delete(id);
    },

    async getAll(): Promise<SpendRule[]> {
        const rows = await db.rules.orderBy("priority").toArray();
        return rows.map((r) => ({
            ...r,
            conditions: JSON.parse(r.conditions),
            actions: JSON.parse(r.actions),
        })) as SpendRule[];
    },
};
