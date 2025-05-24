"use client";

import { useEffect, useState } from "react";
import { ChargerData } from "../utils/mockData";
import { useAuth } from "@/app/context/authContext/useAuth";
import { fetchChargers } from "@/infrastructure/api/api";

export function useDashboardData() {
    const [chargers, setChargers] = useState<ChargerData[]>([]);
    const [selectedView, setSelectedView] = useState<"dashboard" | "list">("dashboard");
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.idToken) return;

        const cargarDatos = async () => {
            try {
                const data = await fetchChargers(user.idToken ?? "");
                setChargers(data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        cargarDatos();

        // recargar datos periódicamente desde la API
        const interval = setInterval(cargarDatos, 10000); // cada 10 segundos
        return () => clearInterval(interval);
    }, [user?.idToken]);

    const total = chargers.length;
    const occupied = chargers.filter(c => c.realtimeMonitoring.chargingSessionStatus === "charging").length;
    const online = chargers.filter(c => c.realtimeMonitoring.networkStatus.connection === "online").length;

    const metrics = {
        occupied,
        total,
        occupancyRate: total ? (occupied / total) * 100 : 0,
        averagePower: total ? chargers.reduce((sum, c) => sum + c.realtimeMonitoring.outputPower_kW, 0) / total : 0,
        averageTemp: total ? chargers.reduce((sum, c) => sum + c.realtimeMonitoring.internalTemperature_C, 0) / total : 0,
        online,
    };

    const chartData = [
        { label: "Ocupación %", value: metrics.occupancyRate, color: "bg-blue-500" },
        { label: "Potencia Prom. (kW)", value: metrics.averagePower, color: "bg-green-500" },
        { label: "Temp. Prom. (°C)", value: metrics.averageTemp, color: "bg-orange-500" },
        { label: "En Línea %", value: (online / total) * 100, color: "bg-purple-500" },
    ];

    return {
        chargers,
        selectedView,
        setSelectedView,
        metrics,
        chartData,
    };
}
