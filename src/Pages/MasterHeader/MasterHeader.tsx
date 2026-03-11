import React, { useEffect, useRef, useState, type JSX } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Cog, History, LayoutGrid, LogOut, Send } from "lucide-react";
import { useAuth } from "../MainRoutes/AuthContent";

interface MasterHeaderProps { }

const MasterHeader: React.FC<MasterHeaderProps> = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const [profileMenu, setProfileMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Check if click is outside menu AND profile image
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                imgRef.current &&
                !imgRef.current.contains(event.target as Node)
            ) {
                setProfileMenu(false);
            }
        }

        if (profileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenu]);

    const roleMenus: Record<
        string,
        { label: string; path: string; icon?: JSX.Element; ActivePath?: string[] }[]
    > = {
        user: [
            {
                label: "Dashboard",
                path: "/user/dashboard",
                icon: <LayoutGrid width={18} height={18} />,
                ActivePath: ["/user/dashboard"]
            },
            {
                label: "Configuration",
                path: "/user/configuration",
                icon: <Cog width={18} height={18} />,
                ActivePath: ["/user/configuration"]
            },
            {
                label: "Send Mail",
                path: "/user/send-mail",
                icon: <Send width={18} height={18} />,
                ActivePath: ["/user/send-mail"]
            },
            {
                label: "Mail History",
                path: "/user/mail-history",
                icon: <History width={18} height={18} />,
                ActivePath: ["/user/mail-history"]
            },
            {
                label: "Logout",
                path: "/logout",
                icon: <LogOut color="red" width={18} height={18} />,
                ActivePath: ["/logout"]
            },
        ],
    };
    const { role, logout } = useAuth();

    const menus = role?.type ? roleMenus[role.type] || [] : [];

    return (
        <div className="relative w-full h-screen overflow-auto px-4 lg:pl-25">
            {/* Main Content */}
            <Outlet />

            {/* Right Side Floating Tabs */}
            <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-6 z-50 flex-col gap-2">
                <div className="glass-effect border border-slate-200/50 flex flex-col shadow-2xl px-2 gap-3 py-3 justify-center items-center rounded-3xl">
                    {menus.map((menu) => (
                        <div
                            key={menu.label}
                            onClick={() => {
                                if (menu.path === "/logout") {
                                    logout();
                                } else {
                                    navigate(menu.path);
                                }
                            }}
                            className="relative group cursor-pointer"
                        >
                            {/* Icon */}
                            <div
                                className={`${menu.ActivePath?.includes(location.pathname)
                                    ? "bg-[#04387a] text-white shadow-lg shadow-blue-900/20 scale-110"
                                    : "hover:bg-slate-200/50 text-slate-600 hover:text-[#04387a]"
                                    } p-4 rounded-2xl transition-all duration-300 ease-out`}
                            >
                                {menu.icon}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap 
                        bg-[#04387a] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl
                        opacity-0 group-hover:opacity-100 -translate-x-2 
                        group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                                {menu.label}
                                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#04387a] rotate-45"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📱 Mobile Bottom Navbar */}
            <div className="flex lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
                <div className="glass-effect border border-slate-200/50 flex flex-row shadow-2xl px-2 gap-2 py-2 justify-around items-center rounded-3xl w-full translate-y-0 hover:-translate-y-1 transition-transform duration-300">
                    {menus.map((menu) => (
                        <div
                            key={menu.label}
                            onClick={() => {
                                if (menu.path === "/logout") {
                                    logout();
                                } else {
                                    navigate(menu.path);
                                }
                            }}
                            className={`${menu.ActivePath?.includes(location.pathname)
                                ? "bg-[#04387a] text-white shadow-lg shadow-blue-900/20 scale-105"
                                : "text-slate-500 active:bg-slate-200"
                                } p-4 rounded-2xl transition-all duration-300 flex-1 flex justify-center`}
                        >
                            {menu.icon}
                        </div>
                    ))}
                </div>
            </div>


        </div>

    );
};

export default MasterHeader;