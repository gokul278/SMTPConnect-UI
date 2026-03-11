export interface SigninResponse {
    status: boolean;
    message: string;
    roleId?: number;
    token?: string;
    passChangeStatus?: boolean;
}
