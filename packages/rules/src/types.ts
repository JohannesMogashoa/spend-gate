export type RuleCondition = {
    field: "amount" | "merchant" | "hour";
    op: "gt" | "lt" | "gte" | "lte" | "eq" | "contains";
    value: string | number;
};

export type RuleAction = {
    type: "block" | "notify";
    channel?: "push" | "whatsapp";
};

export type SpendRule = {
    id: string;
    label: string;
    active: boolean;
    priority: number;
    stopProcessing?: boolean;
    conditions: RuleCondition[];
    actions: RuleAction[];
};

export type InvestecTransaction = {
    accountId: string;
    type: "DEBIT" | "CREDIT";
    transactionType: string;
    status: "POSTED" | "PENDING";
    description: string;
    cardNumber: string;
    postingDate: string;
    valueDate: string;
    transactionDate: string;
    amount: number; // in rands (positive for debits, negative for credits)
    runningBalance: number;
};
