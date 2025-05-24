"use client"

import { useDashboardData } from "../usecases/useDashboardData"
import SummaryCards from "../components/SummaryCards"
import ChargerStatusChart from "../components/ChargerStatusChart"
import ChargerGrid from "../components/ChargerGrid"
import ChargerList from "../components/ChargerList"

const TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "list", label: "Lista de Unidades" },
]

export default function DashboardView() {
    const {
        chargers,
        selectedView,
        setSelectedView,
        metrics,
        chartData,
    } = useDashboardData()

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">

                {/* Tabs */}
                <div className="mb-6 border-b border-blue-300 dark:border-blue-600">
                    <nav className="flex space-x-6" aria-label="Tabs">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedView(tab.id as "dashboard" | "list")}
                                className={`pb-2 border-b-4 text-lg font-semibold transition-colors ${selectedView === tab.id
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-blue-600"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>


                {/* Content */}
                {selectedView === "dashboard" ? (
                    <>
                        <SummaryCards metrics={metrics} />
                        <ChargerStatusChart chartData={chartData} />
                        <ChargerGrid chargers={chargers} />
                    </>
                ) : (
                    <ChargerList chargers={chargers} />
                )}
            </div>
        </div>
    )
}
