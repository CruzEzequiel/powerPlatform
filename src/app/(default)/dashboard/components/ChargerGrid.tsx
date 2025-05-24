"use client"

import { Battery, CheckCircle, WifiOff, Settings, Activity } from "lucide-react"
import { ChargerData } from "../utils/mockData"

const getStatusColor = (status: string) => {
    switch (status) {
        case "charging":
            return "text-green-600 bg-green-100"
        case "available":
            return "text-blue-600 bg-blue-100"
        case "offline":
            return "text-red-600 bg-red-100"
        case "maintenance":
            return "text-yellow-600 bg-yellow-100"
        default:
            return "text-gray-600 bg-gray-100"
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "charging":
            return <Battery className="w-4 h-4" />
        case "available":
            return <CheckCircle className="w-4 h-4" />
        case "offline":
            return <WifiOff className="w-4 h-4" />
        case "maintenance":
            return <Settings className="w-4 h-4" />
        default:
            return <Activity className="w-4 h-4" />
    }
}

export default function ChargerGrid({ chargers }: { chargers: ChargerData[] }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado de Unidades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {chargers.map((charger) => (
                    <div
                        key={charger.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{charger.id}</h4>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                                    charger.realtimeMonitoring.chargingSessionStatus
                                )}`}
                            >
                                {getStatusIcon(charger.realtimeMonitoring.chargingSessionStatus)}
                                {charger.realtimeMonitoring.chargingSessionStatus}
                            </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Potencia:</span>
                                <span className="font-medium">
                                    {charger.realtimeMonitoring.outputPower_kW.toFixed(1)} kW
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Temperatura:</span>
                                <span className="font-medium">
                                    {charger.realtimeMonitoring.internalTemperature_C.toFixed(1)}°C
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Red:</span>
                                <span
                                    className={`font-medium ${charger.realtimeMonitoring.networkStatus.connection === "online"
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {charger.realtimeMonitoring.networkStatus.connection}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
