import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/infrastructure/services/firebase";

export default async function handleLogin(email: string, password: string): Promise<boolean> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const token = await result.user.getIdToken();

        // Guardar token en cookie (expira en 5 días)
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 5};`;

        return true;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return false;
    }
}
