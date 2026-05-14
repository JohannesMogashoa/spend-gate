import { Rule } from "@/db/schema";
import { getSession } from "@/lib/auth/dal";
import { ruleService } from "@/lib/services/rule.service";
import { NextRequest, NextResponse } from "next/server";

const DEPLOY_RETRY_MAX = 2;

async function triggerRedeploy(
    cardKey: string,
    attempt: number = 1
): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(
            new URL("/api/rules/deploy", process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cardKey }),
            }
        );

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
            return triggerRedeploy(cardKey, attempt + 1);
        }

        return { success: false, error: message };
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        const body: Rule = await req.json();

        if (id !== body.id) {
            return NextResponse.json({ error: "ID mismatch" }, { status: 400 });
        }

        if (!(await ruleService.isOwner(session.user.id, id))) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await ruleService.update(body);

        const cardKey = req.headers.get("x-card-key");

        // Trigger redeploy if card key provided
        if (cardKey?.trim()) {
            await triggerRedeploy(cardKey.trim());
        }

        return NextResponse.json({ status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to update rule" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        const cardKey = _req.headers.get("x-card-key");

        if (!(await ruleService.isOwner(session.user.id, id))) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await ruleService.delete(id);

        // Trigger redeploy if card key provided
        if (cardKey?.trim()) {
            await triggerRedeploy(cardKey.trim());
        }

        return new NextResponse(null, { status: 204 });
    } catch {
        return NextResponse.json({ error: "Failed to delete rule" }, { status: 500 });
    }
}
