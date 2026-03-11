import axios from "axios";
import { decrypt } from "@/lib/Helper";
import type { DashboardResponse } from "../Interface/DashboardInterface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const DashboardService = {
    GetStats: async (): Promise<DashboardResponse> => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/v1/dashboard/stats`, {
                headers: { Authorization: token }
            });

            if (res.data.data) {
                if (res.data.token) localStorage.setItem("token", res.data.token);
                const decrypted = decrypt(res.data.data, res.data.token);
                return decrypted;
            }
            return res.data;
        } catch (error: any) {
            return {
                status: false,
                message: error.response?.data?.message || "Failed to fetch dashboard stats",
                data: {} as any
            };
        }
    }
};
