"use client"

// Importa el hook useContext de React
import { useContext } from 'react';
// Importa el contexto de autenticación
import { AuthContext } from './AuthContext';

/**
 * Hook personalizado que facilita el acceso al contexto de autenticación.
 * 
 * @returns {AuthContextType} Retorna el valor del contexto de autenticación actual.
 * @throws {Error} Si el hook se utiliza fuera de un AuthProvider, lanza un error para prevenir uso incorrecto.
 */
export const useAuth = () => {
    const context = useContext(AuthContext); // Obtiene el contexto de autenticación

    if (!context) {
        // Si no existe un contexto válido, se lanza un error
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }

    return context; // Retorna el contexto
};
