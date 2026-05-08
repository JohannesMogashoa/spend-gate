"use client";

import { useCredentialsStore } from "@/store/credentials";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

let isMounted = false;

export function CredentialGuard({ children }: { children: React.ReactNode }) {
    const { credentials, loadFromSession } = useCredentialsStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isMounted) {
            isMounted = true;
            loadFromSession();
        }
    }, [loadFromSession]);

    useEffect(() => {
        if (!isMounted) return;
        const onOnboarding = pathname === "/onboarding";
        if (!credentials && !onOnboarding) {
            router.replace("/onboarding");
        } else if (credentials && onOnboarding) {
            router.replace("/dashboard");
        }
    }, [credentials, pathname, router]);

    if (!isMounted) return null;
    return <>{children}</>;
}
