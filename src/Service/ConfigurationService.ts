import axios from "axios";
import type { ConfigResponse, SingleConfigResponse, Configuration } from "../Interface/ConfigurationInterface";
import { decrypt } from "@/lib/Helper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ConfigurationService = {
    GetConfigs: async (): Promise<ConfigResponse> => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/v1/configuration/list`, {
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
                message: error.response?.data?.message || "Failed to fetch configurations",
                data: []
            };
        }
    },

    AddConfig: async (config: Partial<Configuration>): Promise<SingleConfigResponse> => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_BASE_URL}/v1/configuration/add`, config, {
                headers: { Authorization: token }
            });

            if (res.data.data) {
                if (res.data.token) localStorage.setItem("token", res.data.token);
                const decrypted = decrypt(res.data.data, res.data.token);
                return decrypted;
            }
            return res.data;
        } catch (error: any) {
            const errorData = error.response?.data;
            if (errorData?.data && errorData?.token) {
                try {
                    const decrypted = decrypt(errorData.data, errorData.token);
                    return {
                        status: false,
                        message: decrypted.message || "Failed to add configuration",
                        data: {} as Configuration
                    };
                } catch (e) {
                    // Fallback
                }
            }
            return {
                status: false,
                message: error.response?.data?.message || "Failed to add configuration",
                data: {} as Configuration
            };
        }
    },

    UpdateConfig: async (config: Configuration): Promise<SingleConfigResponse> => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_BASE_URL}/v1/configuration/update`, config, {
                headers: { Authorization: token }
            });

            if (res.data.data) {
                if (res.data.token) localStorage.setItem("token", res.data.token);
                const decrypted = decrypt(res.data.data, res.data.token);
                return decrypted;
            }
            return res.data;
        } catch (error: any) {
            const errorData = error.response?.data;
            if (errorData?.data && errorData?.token) {
                try {
                    const decrypted = decrypt(errorData.data, errorData.token);
                    return {
                        status: false,
                        message: decrypted.message || "Failed to update configuration",
                        data: {} as Configuration
                    };
                } catch (e) {
                    // Fallback
                }
            }
            return {
                status: false,
                message: error.response?.data?.message || "Failed to update configuration",
                data: {} as Configuration
            };
        }
    },

    DeleteConfig: async (configId: number): Promise<SingleConfigResponse> => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_BASE_URL}/v1/configuration/delete`, { id: configId }, {
                headers: { Authorization: token }
            });

            if (res.data.data) {
                if (res.data.token) localStorage.setItem("token", res.data.token);
                const decrypted = decrypt(res.data.data, res.data.token);
                return decrypted;
            }
            return res.data;
        } catch (error: any) {
            const errorData = error.response?.data;
            if (errorData?.data && errorData?.token) {
                try {
                    const decrypted = decrypt(errorData.data, errorData.token);
                    return {
                        status: false,
                        message: decrypted.message || "Failed to delete configuration",
                        data: {} as Configuration
                    };
                } catch (e) {
                    // Fallback
                }
            }
            return {
                status: false,
                message: error.response?.data?.message || "Failed to delete configuration",
                data: {} as Configuration
            };
        }
    }
};
