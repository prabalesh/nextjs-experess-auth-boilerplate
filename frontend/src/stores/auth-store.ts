import { create } from "zustand";

import { getCurrentUser } from "@/services/auth-service";
import { AuthState } from "@/types/stores/auth-store";

export const useAuthStore = create<AuthState>((set) => ({
    isLoading: false,
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
            set({ isLoading: true });
            const user = await getCurrentUser();
            set({
                user,
                isLoading: false,
                isAuthenticated: !!user,
            });
        } catch {
            set({
                user: null,
                isAuthenticated: false,
            });
        }
    },
}));
