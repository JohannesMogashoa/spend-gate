import dynamic from "next/dynamic";

const OnboardingForm = dynamic(() => import("@/components/onboarding/OnboardingForm"), {
    ssr: false,
});

export default function OnboardingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Welcome to SG Web</h1>
                <OnboardingForm />
            </div>
        </div>
    );
}
