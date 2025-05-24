import "../globals.css";
import type { Metadata } from "next";
import AppLogo from "@/app/(default)/layout/components/AppLogo";
import FooterInfo from "@/app/(default)/layout/components/FooterInfo";

export const metadata: Metadata = {
    title: "Power",
    description: "Sistema de monitoreo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
                <header className="p-4  flex items-center gap-2">
                    <AppLogo />
                </header>

                <main className="flex-grow">
                    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                        {children}
                    </div>
                </main>

                <FooterInfo />
            </body>
        </html>
    );
}
