import { getSession } from "@/lib/auth/dal";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const SignInForm = dynamic(() => import("@/components/auth/SignInForm"), { ssr: false });

export default async function SignInPage() {
    const session = await getSession();
    if (session) redirect("/dashboard");
    return (
        <main className="min-h-screen flex items-center justify-center">
            <SignInForm />
        </main>
    );
}
