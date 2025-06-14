import { useState, useRef, useEffect } from "react";
import { useCivicAuth } from "../../hooks/civic-auth-context";
import { LoginButton } from "./login";
import { Loader2 } from "lucide-react";

export const UserButton = () => {
    const { user, loading, signOut } = useCivicAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return <div className="text-sm text-gray-500">
        <div className="flex gap-1 items-center justify-center">
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Loading...</span>
        </div>
    </div>;

    if (!user) return <LoginButton />;

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
                <img
                    src={user.picture}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
                />
            </button>

            {menuOpen && (
                <div className="absolute -left-[78px] mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                            {user.name || "No Name"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button
                        onClick={signOut}
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-b-xl"
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};
