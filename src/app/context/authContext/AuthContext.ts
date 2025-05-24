"use client"

import { createContext } from 'react';

/**
 * Representa el contexto de autenticación de la aplicación.
 * Proporciona información sobre el estado de autenticación del usuario
 * y funciones relacionadas con la gestión de la sesión.
 */
interface AuthContextType {

    isLoggedIn: boolean;

    logout: () => void;

    isLogging: boolean;

    conectionError: boolean;


    user: {
        /**
         * Identificador único del usuario en Firebase.
         */
        uid: string | null;

        /**
         * Nombre visible del usuario.
         */
        displayName: string | null;

        /**
         * Correo electrónico del usuario.
         */
        email: string | null;

        /**
         * URL de la foto de perfil del usuario.
         */
        photoURL: string | null;

        /**
         * Token JWT proporcionado por Firebase para la sesión activa.
         */
        idToken: string | null;

        /**
         * Indica si el usuario tiene permisos de administrador.
         */
        isAdmin: boolean;

    } | null;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
