"use client";

import { db } from "@/db/dexie";
import { proxyFetch } from "@/lib/api";
import { InvestecTransaction } from "@spendgate/rules";
import { useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";

export function useCachedTransactions() {
    return useLiveQuery(
        () => db.cachedTransactions.orderBy("postingDate").reverse().toArray(),
        [],
        []
    );
}

export function useFetchTransactions() {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const { data } = await proxyFetch<{ data: { transactions: InvestecTransaction[] } }>(
                "/txns"
            );
            const transactions = data?.transactions ?? [];

            await db.transaction("rw", db.cachedTransactions, async () => {
                for (const tx of transactions) {
                    const id = `${tx.postingDate}-${tx.amount}-${tx.description}`.replace(
                        /\s/g,
                        "_"
                    );
                    await db.cachedTransactions.put({
                        id,
                        type: tx.type,
                        description: tx.description,
                        amount: tx.amount,
                        postingDate: tx.postingDate,
                        runningBalance: tx.runningBalance,
                        cachedAt: new Date(),
                    });
                }
            });
            return transactions;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
}
