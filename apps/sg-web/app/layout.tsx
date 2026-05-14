import Header from "@/components/Header";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SpendGate",
    description:
        "Programmable card rules for your Investec card - Take control of your spending with intelligent automation",
    keywords: ["Investec", "programmable banking", "card rules", "spending control", "fintech"],
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#fafafa" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full bg-background", geistSans.variable, geistMono.variable)}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col font-sans antialiased">
                <ClientProviders>
                    <Header />
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
