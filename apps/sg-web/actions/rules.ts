"use server";

import { db } from "@/db/client";
import { rules } from "@/db/schema";
import { requireSession } from "@/lib/auth/dal";
import type { RuleCondition } from "@spendgate/rules";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RuleConditionSchema: z.ZodType<RuleCondition> = z.object({
    field: z.enum(["amount", "merchant", "hour"]),
    op: z.enum(["gt", "lt", "gte", "lte", "eq", "contains"]),
    value: z.union([z.string(), z.number()]),
});

const CreateRuleSchema = z.object({
    label: z.string().min(1).max(120),
    conditions: z.array(RuleConditionSchema).min(1).max(5),
    action: z.enum(["block", "notify", "allow"]),
    notifyChannel: z.enum(["push", "email", "none"]).default("push"),
    priority: z.number().int().min(0).default(0),
});

export async function createRule(input: z.infer<typeof CreateRuleSchema>) {
    const session = await requireSession();
    const parsed = CreateRuleSchema.parse(input);

    await db.insert(rules).values({
        userId: session.user.id,
        ...parsed,
    });

    // await deployRules(session.user.id);
    revalidatePath("/dashboard");
}

export async function toggleRule(ruleId: string, active: boolean) {
    const session = await requireSession();

    await db
        .update(rules)
        .set({ active, updatedAt: new Date() })
        // Always scope to the authenticated userId — never trust client-supplied userId
        .where(and(eq(rules.id, ruleId), eq(rules.userId, session.user.id)));

    // await deployRules(session.user.id);
    revalidatePath("/dashboard");
}

export async function deleteRule(ruleId: string) {
    const session = await requireSession();

    await db.delete(rules).where(and(eq(rules.id, ruleId), eq(rules.userId, session.user.id)));

    // await deployRules(session.user.id);
    revalidatePath("/dashboard");
}

export async function reorderRules(orderedIds: string[]) {
    const session = await requireSession();

    await db.transaction(async (tx) => {
        for (const [index, id] of orderedIds.entries()) {
            await tx
                .update(rules)
                .set({ priority: index })
                .where(and(eq(rules.id, id), eq(rules.userId, session.user.id)));
        }
    });

    // await deployRules(session.user.id);
    revalidatePath("/dashboard");
}
