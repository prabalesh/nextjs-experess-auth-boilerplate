import { getCurrentUser } from "@/services/authService";
import { create } from "zustand";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
    initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) =>
        set({
            user,
            isAuthenticated: !!user,
        }),
    logout: () =>
        set({
            user: null,
            isAuthenticated: false,
        }),
    initializeAuth: async () => {
        try {
            const user = await getCurrentUser();
            set({
                user,
                isAuthenticated: !!user,
            });
        } catch (error) {
            console.error("Failed to fetch current user:", error);
            set({
                user: null,
                isAuthenticated: false,
            });
        }
    },
}));
