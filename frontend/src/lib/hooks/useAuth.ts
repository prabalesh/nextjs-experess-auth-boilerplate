import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/stores/authStore";
import * as authService from "@/services/authService";

export function useAuth() {
    const router = useRouter();
    const { setUser, logout: logoutStore } = useAuthStore();

    const getUserMutation = useMutation({
        mutationFn: authService.getCurrentUser,
        onSuccess: (userData) => {
            setUser(userData);
        },
    });

    const registerMutuation = useMutation({
        mutationFn: authService.register,
        onSuccess: (data) => {
            toast.success("Registeration Successful");
            router.push("/login");
        },
        onError: (error) => {
            toast.error("Failed to create user", {
                description: error.message,
            });
        },
    });

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (userData) => {
            setUser(userData);
            toast.success("Login Successful");
            router.push("/dashboard");
        },
        onError: (error) => {
            toast.error("Login Failed", { description: error.message });
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
        getUserMutation.mutate();
    };

    const registerWithEmail = (
        name: string,
        email: string,
        password: string
    ) => {
        registerMutuation.mutate({ name, email, password, type: "email" });
    };

    const loginWithEmail = (email: string, password: string) => {
        loginMutation.mutate({ email, password, type: "email" });
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
        isLoading:
            loginMutation.isPending ||
            logoutMutation.isPending ||
            registerMutuation.isPending,
    };
}
