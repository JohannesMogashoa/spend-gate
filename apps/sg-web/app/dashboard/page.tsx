import { StatCard } from "@/components/StatCard";
import { db } from "@/db/client";
import { rules, transactionEvents } from "@/db/schema";
import { requireSession } from "@/lib/auth/dal";
import { eq, sum } from "drizzle-orm";

export default async function DashboardPage() {
    const session = await requireSession();
    const userId = session.user.userId;

    const [userRules, [savedResult]] = await Promise.all([
        db
            .select()
            .from(rules)
            .where(eq(rules.userId, userId))
            .orderBy((r) => r.priority),
        db
            .select({ total: sum(transactionEvents.centsAmount) })
            .from(transactionEvents)
            .where(eq(transactionEvents.userId, userId)),
    ]);

    const activeCount = userRules.filter((r) => r.active).length;
    const totalSavedRands = ((Number(savedResult?.total) || 0) / 100).toFixed(2);

    return (
        <main className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard label="Active Rules" value={activeCount.toString()} />
                <StatCard label="Saved this month" value={`R ${totalSavedRands}`} />
            </div>
        </main>
    );
}
