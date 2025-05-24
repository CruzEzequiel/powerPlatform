import "../../globals.css"
import type { Metadata } from "next";
import {AuthProvider} from "@/app/context/authContext/AuthProvider";

export const metadata: Metadata = {
    title: "Power",
    description: "Login del sistema",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden text-gray-800">
        <AuthProvider>
            <main className="flex-grow">
                {children}
            </main>
        </AuthProvider>
        </body>
        </html>
    );
}

