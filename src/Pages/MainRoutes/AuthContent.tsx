import { decrypt } from "@/lib/Helper";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RoleList = [
    { type: "user", id: 1 },
] as const;

export type Role = (typeof RoleList)[number] | null;

export type UserRole = (typeof RoleList)[number]["type"];

// ✅ API Response interface
export interface UserProfile {
    refUserId: number;
    refUserName: string;
    refRTId: number;
    refUserCustId: string;
}

// ✅ Context Type
interface AuthContextType {
    role: Role;
    setRole: (role: Role) => void;
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    loading: boolean;
    refreshToken: () => Promise<void>;
    logout: () => void; // ✅ Add logout function
}

// ✅ Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [role, setRoleState] = useState<Role>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const setRole = (newRole: Role) => {
        setRoleState(newRole);
    };

    const refreshToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setRole(null);
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/v1/profile/user`,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(res);

            if (
                res.data.status === false ||
                res.data.error === "Invalid token" ||
                res.data.error === "Missing token" ||
                res.data.message === "Invalid token" ||
                res.data.message === "Token expired"
            ) {
                localStorage.clear();
                setUser(null);
                setRole(null);
                navigate("/");
            } else {
                const decryptData = decrypt(res.data.data, res.data.token);
                if (res.data.token) localStorage.setItem("token", res.data.token);
                console.log(decryptData);
                const profile: UserProfile = decryptData.data;
                setUser(profile);
                localStorage.setItem("token", res.data.token);

                const matchedRole =
                    RoleList.find((r) => r.id === profile.refRTId) || null;
                setRole(matchedRole);

                if (["/signin", "/signup", "/login"].includes(location.pathname)) {
                    navigate(`/${String(matchedRole?.type)}/`);
                }
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setUser(null);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.clear();
        setRole(null);
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        refreshToken();
    }, []);

    useEffect(() => {
        if (role && ["/signin", "/signup", "/login"].includes(location.pathname)) {
            navigate(`/${String(role.type)}/`);
        }
    }, [location.pathname, role]);

    return (
        <AuthContext.Provider
            value={{ role, setRole, user, setUser, loading, refreshToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Custom hook to consume context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};