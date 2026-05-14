import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "./auth/auth";

// Returns session or null — does not redirect
export const getSession = cache(async () => {
    return auth.api.getSession({ headers: await headers() });
});

// Returns session or redirects to /sign-in — never returns null
export const requireSession = cache(async () => {
    const session = await getSession();
    if (!session) redirect("/sign-in");
    return session;
});
