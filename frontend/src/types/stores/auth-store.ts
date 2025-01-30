import { UserType } from "../user";

export type AuthState = {
    user: UserType | null;
    isAuthenticated: boolean;
    setUser: (user: UserType | null) => void;
    logout: () => void;
    initializeAuth: () => Promise<void>;
};
