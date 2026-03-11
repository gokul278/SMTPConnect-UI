export interface Configuration {
    id?: number;
    refUserId: number;
    mailType: string;
    mailId: string;
    mailPassword?: string; // Optional when receiving from backend for security
    mailHost: string;
    mailPort: number;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ConfigResponse {
    status: boolean;
    message: string;
    data: Configuration[];
}

export interface SingleConfigResponse {
    status: boolean;
    message: string;
    data: Configuration;
}
