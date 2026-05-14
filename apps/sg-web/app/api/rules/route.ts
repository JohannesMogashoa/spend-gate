import { NextRequest, NextResponse } from "next/server";

import { CreateRule, insertRuleSchema } from "@/db/schema";
import { getSession } from "@/lib/auth/dal";
import { ruleService } from "@/lib/services/rule.service";

const DEPLOY_RETRY_MAX = 2;

async function triggerRedeploy(
    cardKey: string,
    baseUrl: string,
    attempt: number = 1
): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(new URL("/api/rules/deploy", baseUrl), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cardKey }),
        });

        if (!res.ok) {
            const data = (await res.json().catch(() => ({}))) as {
                error?: string;
            };
            throw new Error(data.error ?? `Deploy failed: ${res.status}`);
        }

        return { success: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(`[Deploy attempt ${attempt}] ${message}`);

        if (attempt < DEPLOY_RETRY_MAX) {
            await new Promise((r) => setTimeout(r, 500 * attempt));
            return triggerRedeploy(cardKey, baseUrl, attempt + 1);
        }

        return { success: false, error: message };
    }
}

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const rules = await ruleService.getAll(session.user.id);
        return NextResponse.json(rules);
    } catch {
        return NextResponse.json({ error: "Failed to fetch rules" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body: CreateRule = await req.json();
        const cardKey = req.headers.get("x-card-key");

        const output = await insertRuleSchema.safeParseAsync({
            ...body,
            userId: session.user.id,
        });

        if (!output.success) {
            console.error("Validation error:", output.error);
            return NextResponse.json({ error: "Invalid rule payload" }, { status: 400 });
        }

        await ruleService.create(output.data);

        const baseUrl = req.nextUrl.origin;

        // Trigger redeploy if card key provided
        if (cardKey?.trim()) {
            await triggerRedeploy(cardKey.trim(), baseUrl);
        }

        return NextResponse.json({ status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create rule" }, { status: 500 });
    }
}
