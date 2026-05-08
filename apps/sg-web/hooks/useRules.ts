"use client";

import { db } from "@/db";
import type { SpendRule } from "@spendgate/rules";
import { useLiveQuery } from "dexie-react-hooks";

export function useRules(): SpendRule[] {
    return useLiveQuery(
        () =>
            db.rules
                .orderBy("priority")
                .toArray()
                .then((rows) =>
                    rows.map((r) => ({
                        ...r,
                        conditions: JSON.parse(r.conditions),
                        actions: JSON.parse(r.actions),
                    }))
                ),
        [],
        []
    ) as SpendRule[];
}
