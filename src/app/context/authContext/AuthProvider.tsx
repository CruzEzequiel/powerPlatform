"use client"


import React, { useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../infrastructure/services/firebase';

import { jwtDecode } from 'jwt-decode';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

interface DecodedToken {
    admin?: boolean;
    [key: string]: unknown;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogging, setIsLogging] = useState(true);
    const [conectionError, setConectionError] = useState(true);
    const [user, setUser] = useState<{
        uid: string | null;
        displayName: string | null;
        email: string | null;
        photoURL: string | null;
        idToken: string | null;
        isAdmin: boolean;
    } | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const idToken = await currentUser.getIdToken(false);
                    const decodedToken: DecodedToken = jwtDecode(idToken);
                    const isAdmin = decodedToken?.admin || false;

                    setConectionError(false);

                    setUser({
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        photoURL: currentUser.photoURL,
                        idToken,
                        isAdmin,
                    });

                    setIsLoggedIn(true);
                } catch (error) {
                    console.error("Error al obtener el token de acceso:", error);
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }

            setIsLogging(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = () => {
        signOut(auth);
        setIsLoggedIn(false);
        document.cookie = "token=; path=/; max-age=0;";
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logout, isLogging, conectionError, user }}>
            {children}
        </AuthContext.Provider>
    );
};
