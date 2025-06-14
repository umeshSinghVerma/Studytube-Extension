// CivicAuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { signInWithCivic, getCivicUserInfo, logoutCivic, isUserSignedIn } from "./auth";

interface CivicUser {
    name?: string;
    email?: string;
    picture?: string;
    [key: string]: unknown;
}

interface CivicAuthContextType {
    user: CivicUser | null;
    loading: boolean;
    error: string | null;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

const CivicAuthContext = createContext<CivicAuthContextType | undefined>(undefined);

export const CivicAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<CivicUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const signedIn = await isUserSignedIn();
            if (signedIn) {
                const userInfo = await getCivicUserInfo();
                setUser(userInfo as CivicUser);
            } else {
                setUser(null);
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? String((err as { message?: unknown }).message)
                    : "An unknown error occurred"
            );
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const signIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithCivic();
            await fetchUser();
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? String((err as { message?: unknown }).message)
                    : "An unknown error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);
        setError(null);
        try {
            await logoutCivic();
            setUser(null);
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? String((err as { message?: unknown }).message)
                    : "An unknown error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <CivicAuthContext.Provider value={{ user, loading, error, signIn, signOut }}>
            {children}
        </CivicAuthContext.Provider>
    );
};

export const useCivicAuth = () => {
    const ctx = useContext(CivicAuthContext);
    if (!ctx) throw new Error("useCivicAuth must be used inside CivicAuthProvider");
    return ctx;
};

export const useCivicUser = () => {
    const { user } = useCivicAuth();
    return user;
};