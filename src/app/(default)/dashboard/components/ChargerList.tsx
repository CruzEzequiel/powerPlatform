"use client"

import { ChargerData } from "../utils/mockData"
import {
    MapPin,
    Zap,
    Thermometer,
    Activity,
    Wifi,
    WifiOff,
    Clock,
    AlertTriangle,
    CheckCircle,
    Battery,
    Settings
} from "lucide-react"

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

export default function ChargerList({ chargers }: { chargers: ChargerData[] }) {
    return (
        <div className="space-y-6 text-gray-900">
            {chargers.map((charger) => (
                <div key={charger.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Información básica */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{charger.id}</h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                                        charger.realtimeMonitoring.chargingSessionStatus
                                    )}`}
                                >
                                    {getStatusIcon(charger.realtimeMonitoring.chargingSessionStatus)}
                                    {charger.realtimeMonitoring.chargingSessionStatus}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Marca:</span>
                                    <span className="font-medium">{charger.staticData.identification.brand}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Modelo:</span>
                                    <span className="font-medium">{charger.staticData.identification.model}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tipo:</span>
                                    <span className="font-medium">{charger.staticData.identification.chargerType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Potencia Nominal:</span>
                                    <span className="font-medium">{charger.staticData.identification.nominalPower_kW} kW</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Ubicación:</span>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium">{charger.staticData.location.zone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Monitoreo en tiempo real */}
                        <div>
                            <h4 className="text-md font-semibold text-gray-900 mb-4">Monitoreo en Tiempo Real</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-green-600" />
                                        <span>Potencia de Salida</span>
                                    </div>
                                    <span className="font-medium">
                                        {charger.realtimeMonitoring.outputPower_kW.toFixed(1)} kW
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Thermometer className="w-4 h-4 text-orange-600" />
                                        <span>Temperatura Interna</span>
                                    </div>
                                    <span className="font-medium">
                                        {charger.realtimeMonitoring.internalTemperature_C.toFixed(1)}°C
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-blue-600" />
                                        <span>Voltaje de Salida</span>
                                    </div>
                                    <span className="font-medium">
                                        {charger.realtimeMonitoring.outputVoltage_V.toFixed(0)} V
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-purple-600" />
                                        <span>Corriente de Salida</span>
                                    </div>
                                    <span className="font-medium">
                                        {charger.realtimeMonitoring.outputCurrent_A.toFixed(1)} A
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        {charger.realtimeMonitoring.networkStatus.connection === "online" ? (
                                            <Wifi className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <WifiOff className="w-4 h-4 text-red-600" />
                                        )}
                                        <span>Estado de Red</span>
                                    </div>
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

                        {/* Información técnica y mantenimiento */}
                        <div>
                            <h4 className="text-md font-semibold text-gray-900 mb-4">Información Técnica</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Conectores:</span>
                                    <span className="font-medium">
                                        {charger.staticData.identification.supportedConnectors.join(", ")}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Voltaje Máximo:</span>
                                    <span className="font-medium">
                                        {charger.staticData.technicalSpecifications.maxVoltage_V} V
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Corriente Máxima:</span>
                                    <span className="font-medium">
                                        {charger.staticData.technicalSpecifications.maxCurrent_A} A
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Último Mantenimiento:</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium">
                                            {charger.staticData.maintenance.lastMaintenance}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Responsable:</span>
                                    <span className="font-medium">
                                        {charger.staticData.maintenance.maintenanceResponsible}
                                    </span>
                                </div>
                            </div>

                            {/* Alarmas activas */}
                            {charger.realtimeMonitoring.activeAlarms.length > 0 && (
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                        <span className="text-sm font-medium text-yellow-800">Alarmas Activas</span>
                                    </div>
                                    <ul className="text-sm text-yellow-700">
                                        {charger.realtimeMonitoring.activeAlarms.map((alarm, index) => (
                                            <li key={index}>• {alarm}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
