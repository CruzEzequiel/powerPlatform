import {useAuth} from "@/app/context/authContext/useAuth";

export default function ProfileCard() {
    const { user, logout } = useAuth();

    // Obtener las iniciales del nombre del usuario
    const initials = user?.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'U';

    const handleSignOut = async () => {
        await logout(); // Usar la función de logout del contexto
        window.location.reload()
        console.log("exit");
    };

    return (
        <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-500 text-xl font-semibold">{initials}</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{user?.displayName || 'User'}</h2>
                        <p className="text-gray-500 text-sm">{user?.email || 'user@example.com'}</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 p-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Idioma</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Español</span>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="w-full text-red-500 text-sm font-medium py-2 hover:bg-red-50 rounded transition duration-150 ease-in-out"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
