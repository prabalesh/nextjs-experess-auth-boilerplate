import { LoginType, RegisterType } from "@/types/auth";
import axios from "axios";

export const register = async (credentials: RegisterType) => {
    try {
        const response = await axios.post(`/api/auth/register`, credentials, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (credentials: LoginType) => {
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
            },
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
    } catch {
        return null;
    }
};
