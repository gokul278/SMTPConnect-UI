import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { MailService } from "@/Service/MailService";
import type { SendMailReq } from "@/Interface/MailInterface";

export interface QueueState {
    isActive: boolean;
    total: number;
    sent: number;
    failed: number;
    currentRecipient: string;
    authError: boolean;
}

interface MailQueueContextType {
    queue: QueueState;
    startQueue: (jobs: SendMailReq[], onAuthError?: () => void) => void;
}

const defaultQueue: QueueState = {
    isActive: false,
    total: 0,
    sent: 0,
    failed: 0,
    currentRecipient: "",
    authError: false,
};

const MailQueueContext = createContext<MailQueueContextType>({
    queue: defaultQueue,
    startQueue: () => {},
});

export const useMailQueue = () => useContext(MailQueueContext);

export const MailQueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [queue, setQueue] = useState<QueueState>(defaultQueue);
    const isRunning = useRef(false);

    const startQueue = useCallback((jobs: SendMailReq[], onAuthError?: () => void) => {
        if (isRunning.current) return;
        isRunning.current = true;

        setQueue({
            isActive: true,
            total: jobs.length,
            sent: 0,
            failed: 0,
            currentRecipient: jobs[0]?.recipient || "",
            authError: false,
        });

        (async () => {
            let sent = 0;
            let failed = 0;

            for (let i = 0; i < jobs.length; i++) {
                const job = jobs[i];

                setQueue(prev => ({
                    ...prev,
                    currentRecipient: job.recipient,
                }));

                try {
                    const res = await MailService.SendMail(job);
                    if (res.status) {
                        sent++;
                    } else {
                        failed++;
                        // Stop queue on credential/auth errors
                        const msg = (res.message || "").toLowerCase();
                        if (msg.includes("auth") || msg.includes("credential") || msg.includes("535") || msg.includes("534") || msg.includes("login")) {
                            setQueue(prev => ({
                                ...prev,
                                sent,
                                failed: failed + (jobs.length - i - 1),
                                isActive: false,
                                authError: true,
                            }));
                            isRunning.current = false;
                            if (onAuthError) onAuthError();
                            return;
                        }
                    }
                } catch {
                    failed++;
                }

                setQueue(prev => ({
                    ...prev,
                    sent,
                    failed,
                }));
            }

            setQueue(prev => ({
                ...prev,
                isActive: false,
            }));
            isRunning.current = false;
        })();
    }, []);

    return (
        <MailQueueContext.Provider value={{ queue, startQueue }}>
            {children}
        </MailQueueContext.Provider>
    );
};

export default MailQueueContext;
