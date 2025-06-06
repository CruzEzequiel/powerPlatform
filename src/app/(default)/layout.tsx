import "../globals.css";
import type { Metadata } from "next";
import AppLogo from "@/app/(default)/layout/components/AppLogo";
import FooterInfo from "@/app/(default)/layout/components/FooterInfo";
import {AuthProvider} from "@/app/context/authContext/AuthProvider";

export const metadata: Metadata = {
    title: "Power",
    description: "Sistema de monitoreo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
        <AuthProvider>
            <header className="p-4 flex items-center gap-2">
                <AppLogo />
            </header>

            <main className="flex-grow">
                <div className=" w-full">
                    {children}
                </div>
            </main>

            <FooterInfo />
        </AuthProvider>
        </body>
        </html>
    );
}
