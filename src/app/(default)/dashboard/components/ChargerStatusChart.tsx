"use client"

export default function ChargerStatusChart({
    chartData,
}: {
    chartData: { label: string; value: number; color: string }[]
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Estadísticas Generales</h3>
            <div className="space-y-4">
                {chartData.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-32 text-sm font-medium text-gray-700">{item.label}</div>
                        <div className="flex-1 mx-4">
                            <div className="w-full bg-gray-200 rounded-full h-6">
                                <div
                                    className={`h-6 rounded-full transition-all duration-1000 ${item.color}`}
                                    style={{ width: `${Math.min(item.value, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="w-16 text-sm font-semibold text-gray-900 text-right">
                            {item.value.toFixed(1)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
