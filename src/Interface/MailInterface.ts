export interface MailHistory {
    id: number;
    userId: number;
    configId: number;
    senderEmail: string;
    recipient: string;
    subject: string;
    content: string;
    status: 'sent' | 'failed';
    errorMessage?: string;
    sentAt: string;
}

export interface SendMailReq {
    configId: number;
    recipient: string;
    subject: string;
    content: string;
}

export interface SendMailResponse {
    status: boolean;
    message: string;
    data: MailHistory;
}

export interface MailHistoryResponse {
    status: boolean;
    message: string;
    data: MailHistory[];
}
