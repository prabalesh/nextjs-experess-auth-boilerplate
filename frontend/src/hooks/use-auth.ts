"use client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth-store";
import * as authService from "@/services/auth-service";
import { UserType } from "@/types/user";

export function useAuth() {
    const router = useRouter();
    const { setUser, logout: logoutStore } = useAuthStore();

    const getUserDataMutation = useMutation({
        mutationFn: authService.getCurrentUser,
        onSuccess: (userData: UserType) => {
            setUser(userData);
        },
    });

    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            toast.success("Registration Successful");
            router.push("/login");
        },
        onError: (error) => {
            toast.error(
                "Registraion failed: " + error.message ||
                    "Something went wrong",
            );
        },
    });

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: () => {
            toast.success("Login successful");
            router.push("/");
        },
        onError: (error) => {
            toast.error(
                "Login failed: " + error.message || "Something went wrong",
            );
        },
    });

    const logoutMutation = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            logoutStore();
            toast.success("Logged out successfully");
            router.push("/login");
        },
        onError: (error) => {
            toast.error("Logout Failed", { description: error.message });
        },
    });

    const getUser = () => {
        getUserDataMutation.mutate();
    };

    const registerWithEmail = (
        name: string,
        email: string,
        password: string,
    ) => {
        registerMutation.mutate({ name, email, password });
    };

    const loginWithEmail = (email: string, password: string) => {
        loginMutation.mutate({ email, password });
    };

    const loginWithGoogle = () => {
        window.location.href = `/api/auth/google`;
    };

    const loginWithGithub = () => {
        window.location.href = `/api/auth/github`;
    };

    const logout = () => {
        logoutMutation.mutate();
    };

    return {
        getUser,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        loginWithGithub,
        logout,
    };
}
