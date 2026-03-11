import axios from "axios";
import type { SigninResponse } from "@/Interface/SigninInterface";

export const SigninService = {
    Signin: async (username: string, password: string): Promise<SigninResponse> => {
        const payload = {
            username,
            password,
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/v1/authentication/login`,
                payload
            );

            // The backend returns { data: { status, message, token, ... } }
            return res.data.data;
        } catch (error: any) {
            console.error("Signin error:", error);
            if (error.response?.data?.data) {
                return error.response.data.data;
            }
            return {
                status: false,
                message: "An unexpected error occurred during sign-in.",
            };
        }
    },
};
