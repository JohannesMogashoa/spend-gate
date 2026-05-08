"use client";

import { InvestecTransaction } from "@spendgate/rules";
import { useState } from "react";

export function TransactionTable({ transactions }: { transactions: InvestecTransaction[] }) {
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        transaction: InvestecTransaction;
    } | null>(null);

    return (
        <>
            <table>
                <tbody>
                    {transactions.map((tx) => (
                        <tr
                            key={`${tx.postingDate}-${tx.amount}-${tx.description}`}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setContextMenu({
                                    x: e.clientX,
                                    y: e.clientY,
                                    transaction: tx,
                                });
                            }}
                        >
                            <td>{tx.postingDate}</td>
                            <td>{tx.description}</td>
                            <td style={{ color: tx.amount < 0 ? "red" : "green" }}>
                                R{Math.abs(tx.amount).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    suggestions={suggestRulesFromTransaction(contextMenu.tx as any)}
                    onClose={() => setContextMenu(null)}
                    onSelectSuggestion={(s) => {
                        // Navigate to /rules/new with suggestion as query params
                        router.push(
                            `/rules/new?suggestion=${encodeURIComponent(JSON.stringify(s))}`
                        );
                    }}
                />
            )} */}
        </>
    );
}
