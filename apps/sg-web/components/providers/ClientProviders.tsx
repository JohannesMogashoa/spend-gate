"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { CredentialGuard } from "./CredentialGuard";
import { RulesStoreProvider } from "./RulesStoreProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <CredentialGuard>
                <RulesStoreProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                </RulesStoreProvider>
            </CredentialGuard>
        </QueryClientProvider>
    );
}
