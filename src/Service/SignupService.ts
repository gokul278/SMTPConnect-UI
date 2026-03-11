import type { SignupResponse } from "@/Interface/SignupInterface";
import axios from "axios";

export const SignupService = {
    Signup: async (name: string, email: string, password: string) => {

        const payload = {
            name,
            email,
            password
        }

        let response: SignupResponse;

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/v1/authentication/signup`,
                payload
            );

            response = res.data.data;
        } catch (error: any) {
            response = error.response.data.data;
        }

        return response;
    },
}
