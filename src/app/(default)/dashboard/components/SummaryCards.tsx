"use client"

import { Battery, Zap, Thermometer, Wifi } from "lucide-react"

export default function SummaryCards({
    metrics,
}: {
    metrics: {
        occupied: number
        total: number
        occupancyRate: number
        averagePower: number
        averageTemp: number
        online: number
    }
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Tarjeta: Unidades Ocupadas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Unidades Ocupadas</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {metrics.occupied}/{metrics.total}
                        </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Battery className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <div className="mt-4 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${metrics.occupancyRate}%` }}
                        ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                        {metrics.occupancyRate.toFixed(1)}%
                    </span>
                </div>
            </div>

            {/* Tarjeta: Potencia Promedio */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Potencia Promedio</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {metrics.averagePower.toFixed(1)} kW
                        </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                        <Zap className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>

            {/* Tarjeta: Temperatura Promedio */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Temperatura Promedio</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {metrics.averageTemp.toFixed(1)}°C
                        </p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                        <Thermometer className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
            </div>

            {/* Tarjeta: Unidades En Línea */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Unidades En Línea</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {metrics.online}/{metrics.total}
                        </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                        <Wifi className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    )
}
