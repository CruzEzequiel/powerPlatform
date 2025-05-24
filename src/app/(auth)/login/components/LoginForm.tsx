"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import handleLogin from "../usecases/handleLogin";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "@/app/context/authContext/useAuth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { isLoggedIn, isLogging } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await handleLogin(email, password);
        setLoading(false);
        if (success) router.push("/dashboard");
    };

    if (loading || isLogging) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="email"
                placeholder="Correo"
                className="border px-4 py-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                className="border px-4 py-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Iniciar sesión
            </button>
        </form>
    );
}
