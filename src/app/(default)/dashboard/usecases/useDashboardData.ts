"use client"

import { useEffect, useState } from "react"
import { generateMockData, ChargerData } from "../utils/mockData"

export function useDashboardData() {
    const [chargers, setChargers] = useState<ChargerData[]>([])
    const [selectedView, setSelectedView] = useState<"dashboard" | "list">("dashboard")

    useEffect(() => {
        setChargers(generateMockData())

        const interval = setInterval(() => {
            setChargers(prev =>
                prev.map(charger => ({
                    ...charger,
                    realtimeMonitoring: {
                        ...charger.realtimeMonitoring,
                        internalTemperature_C: 25 + Math.random() * 30,
                        outputPower_kW:
                            charger.realtimeMonitoring.chargingSessionStatus === "charging"
                                ? Math.random() * charger.staticData.identification.nominalPower_kW
                                : 0,
                        outputCurrent_A:
                            charger.realtimeMonitoring.chargingSessionStatus === "charging"
                                ? Math.random() * charger.staticData.technicalSpecifications.maxCurrent_A
                                : 0,
                    },
                }))
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const total = chargers.length
    const occupied = chargers.filter(c => c.realtimeMonitoring.chargingSessionStatus === "charging").length
    const online = chargers.filter(c => c.realtimeMonitoring.networkStatus.connection === "online").length

    const metrics = {
        occupied,
        total,
        occupancyRate: total ? (occupied / total) * 100 : 0,
        averagePower: chargers.reduce((sum, c) => sum + c.realtimeMonitoring.outputPower_kW, 0) / total,
        averageTemp: chargers.reduce((sum, c) => sum + c.realtimeMonitoring.internalTemperature_C, 0) / total,
        online,
    }

    const chartData = [
        { label: "Ocupación %", value: metrics.occupancyRate, color: "bg-blue-500" },
        { label: "Potencia Prom. (kW)", value: metrics.averagePower, color: "bg-green-500" },
        { label: "Temp. Prom. (°C)", value: metrics.averageTemp, color: "bg-orange-500" },
        { label: "En Línea %", value: (online / total) * 100, color: "bg-purple-500" },
    ]

    return {
        chargers,
        selectedView,
        setSelectedView,
        metrics,
        chartData,
    }
}
