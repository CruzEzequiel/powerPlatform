export default function LoadingSpinner() {
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center">
            <div
                className="animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
                style={{ width: "60px", height: "60px" }}
            />
            <p className="mt-4 text-lg font-semibold text-gray-700">Iniciando sesión…</p>
        </div>
    );
}
