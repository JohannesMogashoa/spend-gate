export type InvestecCredentials = {
    clientId: string;
    clientSecret: string;
    apiKey: string;
    cardKey?: string;
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
