export interface ChargerData {
    id: string
    staticData: {
        identification: {
            brand: string
            model: string
            serialNumber: string
            chargerType: string
            supportedConnectors: string[]
            nominalPower_kW: number
        }
        technicalSpecifications: {
            maxVoltage_V: number
            maxCurrent_A: number
            communicationProtocols: string[]
        }
        maintenance: {
            installationDate: string
            lastMaintenance: string
            nextScheduledMaintenance: string
            maintenanceResponsible: string
        }
        location: {
            address: string
            gpsCoordinates: {
                latitude: number
                longitude: number
            }
            zone: string
        }
        legalAndCertifications: {
            certifications: string[]
            warrantyStatus: {
                isValid: boolean
                expiresOn: string
            }
        }
    }
    realtimeMonitoring: {
        internalTemperature_C: number
        outputPower_kW: number
        powerFactor: number
        relayStatus: string
        chargingSessionStatus: string
        outputVoltage_V: number
        outputCurrent_A: number
        networkStatus: {
            connection: string
            latency_ms: number
            interface: string
        }
        activeAlarms: string[]
    }
}

export const generateMockData = (): ChargerData[] => {
    const statuses = ["charging", "available", "offline", "maintenance"]
    const brands = ["ABB", "Tesla", "ChargePoint", "EVBox"]
    const models = ["Terra 54", "Supercharger V3", "Express 250", "Troniq 50"]

    return Array.from({ length: 12 }, (_, i) => ({
        id: `charger-${String(i + 1).padStart(3, "0")}`,
        staticData: {
            identification: {
                brand: brands[i % brands.length],
                model: models[i % models.length],
                serialNumber: `SN${Math.random().toString(36).substr(2, 10).toUpperCase()}`,
                chargerType: i % 3 === 0 ? "DC Fast" : "AC Level 2",
                supportedConnectors: i % 2 === 0 ? ["CCS", "CHAdeMO"] : ["Type 2", "CCS"],
                nominalPower_kW: [22, 50, 150, 250][i % 4],
            },
            technicalSpecifications: {
                maxVoltage_V: [400, 500, 800][i % 3],
                maxCurrent_A: [32, 125, 200][i % 3],
                communicationProtocols: ["OCPP 1.6", "Modbus", "Ethernet", "WiFi"],
            },
            maintenance: {
                installationDate: "2023-04-15",
                lastMaintenance: "2024-12-01",
                nextScheduledMaintenance: "2025-06-01",
                maintenanceResponsible: "Ing. Laura Gómez",
            },
            location: {
                address: `Estación ${i + 1}, Zona Industrial`,
                gpsCoordinates: {
                    latitude: 19.432608 + (Math.random() - 0.5) * 0.1,
                    longitude: -99.133209 + (Math.random() - 0.5) * 0.1,
                },
                zone: `Zona ${String.fromCharCode(65 + (i % 4))}`,
            },
            legalAndCertifications: {
                certifications: ["NOM-EM-005", "CE", "UL"],
                warrantyStatus: {
                    isValid: true,
                    expiresOn: "2026-04-15",
                },
            },
        },
        realtimeMonitoring: {
            internalTemperature_C: 25 + Math.random() * 30,
            outputPower_kW: statuses[i % statuses.length] === "charging" ? Math.random() * 50 : 0,
            powerFactor: 0.95 + Math.random() * 0.05,
            relayStatus: statuses[i % statuses.length] === "offline" ? "OFF" : "ON",
            chargingSessionStatus: statuses[i % statuses.length],
            outputVoltage_V: 380 + Math.random() * 40,
            outputCurrent_A: statuses[i % statuses.length] === "charging" ? Math.random() * 125 : 0,
            networkStatus: {
                connection: statuses[i % statuses.length] === "offline" ? "offline" : "online",
                latency_ms: 80 + Math.random() * 100,
                interface: i % 2 === 0 ? "Ethernet" : "WiFi",
            },
            activeAlarms: statuses[i % statuses.length] === "maintenance" ? ["Temperatura alta"] : [],
        },
    }))
}
