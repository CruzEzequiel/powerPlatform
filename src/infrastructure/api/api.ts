"use client"

import {ChargerData} from "@/app/(default)/dashboard/utils/mockData";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchChargers(token?: string): Promise<ChargerData[]> {
    try {
        const response = await axios.get<ChargerData[]>(`${API_BASE_URL}/data/chargers`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los cargadores:", error);
        return [];
    }
}
