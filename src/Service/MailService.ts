import axios from "axios";
import type { SendMailReq, SendMailResponse, MailHistoryResponse } from "../Interface/MailInterface";
import { decrypt } from "@/lib/Helper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MailService = {
    SendMail: async (mailData: SendMailReq): Promise<SendMailResponse> => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_BASE_URL}/v1/mail/send`, mailData, {
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
                        message: decrypted.message || "Failed to send mail",
                        data: {} as any
                    };
                } catch (e) {
                    // Fallback
                }
            }
            return {
                status: false,
                message: error.response?.data?.message || "Failed to send mail",
                data: {} as any
            };
        }
    },

    GetHistory: async (): Promise<MailHistoryResponse> => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/v1/mail/history`, {
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
                        message: decrypted.message || "Failed to fetch history",
                        data: []
                    };
                } catch (e) {
                    // Fallback
                }
            }
            return {
                status: false,
                message: error.response?.data?.message || "Failed to fetch history",
                data: []
            };
        }
    }
};
