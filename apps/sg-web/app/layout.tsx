import Header from "@/components/Header";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

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
    description: "Programmable card rules for your Investec card",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-sans",
                roboto.variable
            )}
        >
            <body className="min-h-full flex flex-col">
                <ClientProviders>
                    <Header />
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
