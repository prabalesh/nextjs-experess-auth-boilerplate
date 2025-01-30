import { create } from "zustand";

import { getCurrentUser } from "@/services/auth-service";
import { AuthState } from "@/types/stores/auth-store";

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
        } catch {
            set({
                user: null,
                isAuthenticated: false,
            });
        }
    },
}));
