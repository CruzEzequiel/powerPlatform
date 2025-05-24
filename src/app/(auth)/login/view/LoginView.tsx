import LoginForm from "../components/LoginForm";

export default function LoginView() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
                <LoginForm />
            </div>
        </div>
    );
}
