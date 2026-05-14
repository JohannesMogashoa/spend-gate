"use client";

import { proxyFetch } from "@/lib/api";
import { ruleService } from "@/lib/services/rule.service";
import { compileRules } from "@spendgate/rules";

export type DeployResult = {
    success: boolean;
    codeId?: string;
    error?: string;
};

export async function deployCurrentRules(
    webhookUrl: string,
    pushToken: string
): Promise<DeployResult> {
    const rules = await ruleService.getAll();
    const compiled = compileRules(webhookUrl, rules);

    return proxyFetch<DeployResult>("/deploy", {
        method: "POST",
        body: JSON.stringify({
            compiledRules: compiled,
            pushToken,
        }),
    });
}
