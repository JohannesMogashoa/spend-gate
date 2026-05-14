import { Rule } from "@/db/schema";
import { getSession } from "@/lib/auth/dal";
import { deployRulesToCard } from "@/lib/cardDeployer";
import { ruleService } from "@/lib/services/rule.service";
import { RuleCondition, SpendRule } from "@/lib/types";
import { compileRules } from "@spendgate/rules";
import { NextRequest, NextResponse } from "next/server";

function toSpendRule(row: Rule): SpendRule {
    return {
        id: row.id,
        label: row.label,
        active: row.active,
        priority: row.priority,
        conditions: row.conditions as RuleCondition[],
        actions: [],
    };
}

/**
 * Deploy all active rules for a given card key.
 * Used as the central redeploy trigger on all rule mutations.
 * POST body: { cardKey: string }
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = (await req.json().catch(() => ({}))) as {
            cardKey?: string;
        };

        const cardKey = body.cardKey?.trim();
        if (!cardKey) {
            return NextResponse.json({ error: "cardKey is required" }, { status: 400 });
        }

        // Load all active rules from DB, sorted by priority
        const rules = (await ruleService.getAll(session.user.id)).map(toSpendRule);

        const compiledCode = compileRules(process.env.NEXT_PUBLIC_APP_URL as string, rules);
        const result = await deployRulesToCard(cardKey, compiledCode);

        return NextResponse.json(
            { ...result, compiledCode },
            { status: result.success ? 200 : 502 }
        );
    } catch {
        return NextResponse.json({ error: "Deployment failed" }, { status: 500 });
    }
}
