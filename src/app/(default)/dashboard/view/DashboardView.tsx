"use client"

import { useState, useRef, useEffect } from "react"
import { useDashboardData } from "../usecases/useDashboardData"
import SummaryCards from "../components/SummaryCards"
import ChargerStatusChart from "../components/ChargerStatusChart"
import ChargerGrid from "../components/ChargerGrid"
import ChargerList from "../components/ChargerList"
import { useAuth } from "@/app/context/authContext/useAuth"
import ProfileCard from "@/app/(default)/dashboard/components/ProfilePopover";

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

    const { user } = useAuth()
    const [showProfile, setShowProfile] = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)

    const initials = user?.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'U'

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="min-h-screen max-h-7xl p-6 relative">
            {/* Botón de usuario esquina superior derecha */}
            <div   className="absolute top-4 right-10 sm:right-10 md:right-[5%] z-50"
                   ref={profileRef}>
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(prev => !prev)}
                        className="w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center"
                    >
                        {initials}
                    </button>
                    {showProfile && (
                        <div className="absolute right-0 mt-2">
                            <ProfileCard />
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Tabs */}
                <div className="mb-6 border-b border-blue-300 dark:border-blue-600">
                    <nav className="flex space-x-6" aria-label="Tabs">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedView(tab.id as "dashboard" | "list")}
                                className={`pb-2 border-b-4 text-lg font-semibold transition-colors ${
                                    selectedView === tab.id
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-blue-600"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Contenido */}
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
