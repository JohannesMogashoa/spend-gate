import { SignInFormClientWrapper } from "@/components/ClientOnlyWrapper";
import { getSession } from "@/lib/auth/dal";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await getSession();
    if (session) redirect("/dashboard");
    return (
        <main className="min-h-screen flex items-center justify-center">
            <SignInFormClientWrapper />
        </main>
    );
}
