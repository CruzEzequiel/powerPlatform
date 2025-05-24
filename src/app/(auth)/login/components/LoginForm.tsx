"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import handleLogin from "../usecases/handleLogin";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleLogin(email, password);
        if (success) router.push("/dashboard");
    };

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
