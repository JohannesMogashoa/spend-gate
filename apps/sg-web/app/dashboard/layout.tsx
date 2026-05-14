import { requireSession } from "@/lib/auth/dal";
import { credentialService } from "@/lib/services/credential.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await requireSession();
    const hasCredentials = await credentialService.exists(session.user.id);

    if (!hasCredentials) redirect("/onboarding");

    return <>{children}</>;
}
