import Dexie, { type EntityTable } from "dexie";

export interface Rule {
    id: string; // cuid — generated client-side
    label: string;
    active: boolean;
    priority: number;
    conditions: string; // JSON: RuleCondition[]
    actions: string; // 'block' | 'notify' | 'allow'
    notifyChannel: string; // 'push' | 'none'
    triggerCount: number;
    savedCents: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TransactionEvent {
    id: string;
    ruleId?: string;
    outcome: string;
    centsAmount: number;
    merchantName?: string;
    merchantCategory?: string;
    occurredAt: Date;
}

export interface CachedTransaction {
    id: string; // postingDate + amount as composite key
    type: string; // 'DEBIT' | 'CREDIT'
    description: string;
    amount: number; // in rands
    postingDate: string;
    runningBalance?: number;
    cachedAt: Date;
}

export interface Setting {
    key: string;
    value: string;
}

class SpendGateDB extends Dexie {
    rules!: EntityTable<Rule, "id">;
    transactionEvents!: EntityTable<TransactionEvent, "id">;
    cachedTransactions!: EntityTable<CachedTransaction, "id">;
    settings!: EntityTable<Setting, "key">;

    constructor() {
        super("SpendGateDB");
        this.version(1).stores({
            rules: "id, active, priority, createdAt",
            transactionEvents: "id, ruleId, occurredAt",
            cachedTransactions: "id, postingDate, type",
            settings: "key",
        });
    }
}

export const db = new SpendGateDB();
