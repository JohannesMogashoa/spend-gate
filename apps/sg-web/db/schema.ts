import { createId } from "@paralleldrive/cuid2";
import type { RuleCondition } from "@spendgate/rules";
import { boolean, index, integer, json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

export * from "./auth-schema";

export const rules = pgTable(
    "rules",
    {
        id: text("id").primaryKey().$defaultFn(createId),
        userId: text("user_id").notNull(), // references user.id (Better Auth)
        label: text("label").notNull(),
        active: boolean("active").notNull().default(true),
        priority: integer("priority").notNull().default(0),
        conditions: json("conditions").notNull().$type<RuleCondition[]>(),
        action: text("action").notNull(), // 'block' | 'notify' | 'allow'
        notifyChannel: text("notify_channel").notNull().default("push"),
        triggerCount: integer("trigger_count").notNull().default(0),
        savedCents: integer("saved_cents").notNull().default(0),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
        userIdIdx: index("rules_user_id_idx").on(table.userId),
    })
);

export type Rule = typeof rules.$inferSelect;
export type CreateRule = Omit<typeof rules.$inferInsert, "userId">;
export const selectRuleSchema = createSelectSchema(rules);
export const insertRuleSchema = createInsertSchema(rules);
export const updateRuleSchema = createUpdateSchema(rules);

export const transactionEvents = pgTable(
    "transaction_events",
    {
        id: text("id").primaryKey().$defaultFn(createId),
        userId: text("user_id").notNull(),
        ruleId: text("rule_id"),
        outcome: text("outcome").notNull(), // 'blocked' | 'notified' | 'allowed'
        centsAmount: integer("cents_amount").notNull(),
        merchantName: text("merchant_name"),
        merchantCategory: text("merchant_category"),
        occurredAt: timestamp("occurred_at").notNull().defaultNow(),
    },
    (table) => ({
        userIdIdx: index("tx_events_user_id_idx").on(table.userId),
        occurredIdx: index("tx_events_occurred_idx").on(table.occurredAt),
    })
);

// Investec credentials — AES-256-GCM encrypted at rest (see Phase W4)
export const userCredentials = pgTable(
    "user_credentials",
    {
        id: text("id").primaryKey().$defaultFn(createId),
        userId: text("user_id").notNull().unique(), // one set per user
        clientId: text("client_id").notNull(), // encrypted
        clientSecret: text("client_secret").notNull(), // encrypted
        apiKey: text("api_key").notNull(), // encrypted
        cardKey: text("card_key").notNull(), // encrypted
        sandbox: boolean("sandbox").notNull().default(false),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
        userIdIdx: index("user_creds_user_id_idx").on(table.userId),
    })
);

export const pushTokens = pgTable("push_tokens", {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id").notNull().unique(),
    token: text("token").notNull(),
    platform: text("platform").notNull().default("web"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
