import axios from "axios";

interface LoginCredentials {
    email: string;
    password: string;
    type: "email" | "google" | "github";
}

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    type: "email" | "google" | "github";
}

export const register = async (credentials: RegisterCredentials) => {
    try {
        const response = await axios.post(`/api/auth/register`, credentials, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (credentials: LoginCredentials) => {
    try {
        const response = await axios.post(`/api/auth/login`, credentials, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await axios.post(
            `/api/auth/logout`,
            {},
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`/api/auth/me`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return null;
    }
};
