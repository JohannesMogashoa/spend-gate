"use server";

export async function deployRules(userId: string) {
    // const [userRules, pushToken] = await Promise.all([
    //     db.query.rules.findMany({
    //         where: eq(rules.userId, userId),
    //         orderBy: (r) => r.priority,
    //     }),
    //     db.query.pushTokens.findFirst({
    //         where: eq(pushTokens.userId, userId),
    //     }),
    // ]);
    // const webhookBase = process.env.BETTER_AUTH_URL!; // web app URL for webhook
    // const compiled = compileRules(userRules, webhookBase, pushToken?.token ?? "");
    // return investecProxy(userId, "/deploy", {
    //     method: "POST",
    //     body: JSON.stringify({ compiledCode: compiled }),
    // });
}
