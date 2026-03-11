export interface DailyStats {
    date: string;
    sent: number;
    fixed: number;
}

export interface DashboardStats {
    totalEmails: number;
    sentEmails: number;
    failedEmails: number;
    successRate: number;
    activeConfigs: number;
    recentActivity: DailyStats[];
}

export interface DashboardResponse {
    status: boolean;
    message: string;
    data: DashboardStats;
}
